import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { storageService } from '../services/storage';
import {
  ReportItem,
  ProtectStageKey,
  RiskLevel,
  PROTECT_STAGES,
} from '../types/report';
import { ProtectVisualGuideModal } from '../components/ProtectVisualGuideModal';
import { ProtectQuickReferenceWidget } from '../components/ProtectQuickReferenceWidget';

export const PetugasDetail: React.FC = () => {
  const { path, navigate } = useRouter();

  const reportId = path.replace('/petugas/laporan/', '').trim();

  const [report, setReport] = useState<ReportItem | null>(null);
  const [isProtectGuideOpen, setIsProtectGuideOpen] = useState(false);

  // Verification Checklist State
  const [infoCukup, setInfoCukup] = useState(false);
  const [perluKlarifikasi, setPerluKlarifikasi] = useState(false);
  const [kategoriSesuai, setKategoriSesuai] = useState(true);

  // Risk Classification State
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel>('belum_ditentukan');
  const [riskReason, setRiskReason] = useState('');
  const [riskSavedToast, setRiskSavedToast] = useState(false);

  // Escalation State
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
  const [selectedEscalationSteps, setSelectedEscalationSteps] = useState<string[]>([
    '[Langkah SOP: Pemisahan fisik dan evakuasi perlindungan ke bilik aman pengasuhan]',
    '[Langkah SOP: Pengamanan lorong & patroli asatidz siaga malam ini]',
  ]);
  const [selectedEscalationParties, setSelectedEscalationParties] = useState<string[]>([
    '[Pihak SOP: Majelis Pengasuh / Dewan Masyayikh]',
  ]);
  const [escalationCustomNote, setEscalationCustomNote] = useState('');

  // Status Stage Update State
  const [selectedStage, setSelectedStage] = useState<ProtectStageKey>('P');
  const [stageNote, setStageNote] = useState('');

  // Messages States
  const [newPublicMessage, setNewPublicMessage] = useState('');
  const [newInternalNote, setNewInternalNote] = useState('');

  // Referral State
  const [referralType, setReferralType] = useState('Konseling Sebaya di Bilik Aman');
  const [referralNote, setReferralNote] = useState('');

  const loadReport = () => {
    const item = storageService.getReportById(reportId);
    if (item) {
      setReport(item);
      setInfoCukup(item.verification.infoCukup);
      setPerluKlarifikasi(item.verification.perluKlarifikasi);
      setKategoriSesuai(item.verification.kategoriSesuai);
      setSelectedRisk(item.riskLevel);
      setRiskReason(item.riskReason || '');
      setSelectedStage(item.currentStage);
    }
  };

  useEffect(() => {
    loadReport();
    window.addEventListener('storage_update', loadReport);
    return () => window.removeEventListener('storage_update', loadReport);
  }, [reportId]);

  if (!report) {
    return (
      <div className="w-full py-16 px-4 text-center max-w-xl mx-auto space-y-4">
        <span className="material-symbols-outlined text-[36px] text-slate-400">search_off</span>
        <h2 className="text-xl font-bold text-[#00152d]">Berkas Laporan Tidak Ditemukan</h2>
        <p className="text-xs text-[#44474d]">
          Tidak ditemukan laporan dengan kode "{reportId}".
        </p>
        <button
          onClick={() => navigate('/petugas')}
          className="px-4 py-2 rounded-xl bg-[#00152d] text-white text-xs font-semibold cursor-pointer"
        >
          Kembali ke Antrean
        </button>
      </div>
    );
  }

  const handleSaveChecklist = (newInfo: boolean, newKlarif: boolean, newKat: boolean) => {
    setInfoCukup(newInfo);
    setPerluKlarifikasi(newKlarif);
    setKategoriSesuai(newKat);

    storageService.updateReport(report.id, {
      verification: {
        infoCukup: newInfo,
        perluKlarifikasi: newKlarif,
        kategoriSesuai: newKat,
      },
    });

    storageService.addActivityLog(
      report.id,
      'Petugas Perlindungan',
      `Memperbarui verifikasi awal: Info Cukup (${newInfo ? 'Ya' : 'Tidak'}), Perlu Klarifikasi (${newKlarif ? 'Ya' : 'Tidak'}), Kategori Sesuai (${newKat ? 'Ya' : 'Tidak'}).`
    );
  };

  const handleDraftClarification = () => {
    handleSaveChecklist(false, true, kategoriSesuai);
    const draft = `Salam ananda pelapor. Berkas laporan ananda telah diterima dengan amanah. Agar tim satgas dapat melakukan langkah perlindungan yang tepat dan proporsional, mohon tambahkan rincian waktu atau perkiraan lokasi lorong yang lebih spesifik melalui menu 'Kirim Pesan Tambahan'. Kerahasiaan ananda tetap terjaga seutuhnya.`;
    setNewPublicMessage(draft);
    document.getElementById('public-message-input')?.focus();
  };

  const handleSaveRisk = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRisk === 'belum_ditentukan') {
      alert('Mohon pilih salah satu tingkat risiko manusiawi.');
      return;
    }
    if (!riskReason.trim()) {
      alert('Wajib mengisi alasan singkat penetapan risiko.');
      return;
    }

    storageService.updateReport(report.id, {
      riskLevel: selectedRisk,
      riskReason: riskReason.trim(),
      riskAssessedBy: 'Petugas Perlindungan (Manusia)',
      riskAssessedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
    });

    storageService.addActivityLog(
      report.id,
      'Petugas Perlindungan',
      `Menetapkan klasifikasi risiko manusiawi: ${selectedRisk.toUpperCase()} (Alasan: "${riskReason.trim()}")`
    );

    setRiskSavedToast(true);
    setTimeout(() => setRiskSavedToast(false), 2500);
  };

  const handleConfirmEscalation = () => {
    setIsEscalateModalOpen(false);

    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }) + ' • ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    const escalationData = {
      recordedAt: nowStr,
      recordedBy: 'Petugas Perlindungan',
      steps: selectedEscalationSteps,
      partiesContacted: selectedEscalationParties,
      notes: escalationCustomNote.trim() || 'Eskalasi darurat perlindungan pesantren dicatat sesuai SOP.',
    };

    storageService.updateReport(report.id, {
      escalation: escalationData,
    });

    storageService.addActivityLog(
      report.id,
      'Petugas Perlindungan',
      `Mencatat eskalasi resmi SOP Perlindungan Pesantren ke Majelis Pengasuh / Pihak Berwenang.`
    );

    storageService.addInternalNote(
      report.id,
      `[ESKALASI SOP DICATAT]: Langkah yang diambil: ${selectedEscalationSteps.join(', ')}. Pihak yang dihubungi: ${selectedEscalationParties.join(', ')}. Catatan: ${escalationCustomNote || 'Sesuai SOP'}`,
      'Petugas Perlindungan'
    );

    alert('Eskalasi SOP berhasil dicatat dan masuk ke riwayat aktivitas resmi.');
  };

  const handleUpdateStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stageNote.trim()) {
      alert('Mohon cantumkan catatan pembaruan tahap.');
      return;
    }

    const stageInfo = PROTECT_STAGES[selectedStage];

    storageService.updateReport(report.id, {
      currentStage: selectedStage,
    });

    storageService.addActivityLog(
      report.id,
      'Petugas Perlindungan',
      `Memperbarui tahap ke ${stageInfo.code} - ${stageInfo.name}. Catatan: "${stageNote.trim()}"`
    );

    setStageNote('');
    alert(`Tahap laporan berhasil diperbarui menjadi ${stageInfo.code} (${stageInfo.name}).`);
  };

  const handleSendPublicMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPublicMessage.trim()) return;

    storageService.addPublicMessage(report.id, newPublicMessage.trim(), 'Tim Petugas Perlindungan');
    setNewPublicMessage('');
    alert('Pesan publik berhasil dikirim! Pesan ini kini dapat dibaca oleh santri saat melacak kode tiketnya.');
  };

  const handleSaveInternalNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInternalNote.trim()) return;

    storageService.addInternalNote(report.id, newInternalNote.trim(), 'Petugas Perlindungan');
    setNewInternalNote('');
  };

  const handleAddReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralNote.trim()) {
      alert('Mohon cantumkan catatan pendampingan.');
      return;
    }

    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
    }) + ' • ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    const newRef = {
      id: 'ref-' + Date.now(),
      type: referralType,
      notes: referralNote.trim(),
      status: 'Berjalan' as const,
      timestamp: nowStr,
    };

    const updatedReferrals = [newRef, ...(report.referrals || [])];

    storageService.updateReport(report.id, {
      referrals: updatedReferrals,
    });

    storageService.addActivityLog(
      report.id,
      'Petugas Perlindungan',
      `Menambahkan rujukan simulasi: ${referralType} ("${referralNote.trim()}")`
    );

    setReferralNote('');
    alert('Rujukan pendampingan santri berhasil dicatat (simulasi).');
  };

  const isHighRisk = report.riskLevel === 'tinggi' || report.riskLevel === 'darurat';

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-8 max-w-7xl mx-auto flex-1 space-y-6">
      {/* Back and Breadcrumb */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2">
        <button
          onClick={() => navigate('/petugas')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#006970] hover:text-[#00152d] cursor-pointer self-start"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Kembali ke Antrean Laporan</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsProtectGuideOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-[#00152d] hover:bg-[#006970] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-[#94f1fa]">account_tree</span>
            <span>Rujukan Cepat SOP PROTECT</span>
          </button>

          <span className="text-[11px] text-slate-500 hidden sm:inline">KODE TIKET:</span>
          <span className="font-mono text-xs sm:text-sm font-bold text-[#00152d] bg-[#eff4ff] px-2 py-0.5 rounded-lg border border-slate-200 truncate">
            {report.id}
          </span>
        </div>
      </div>

      {/* TOP SUMMARY CARD */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#122a46] text-[#94f1fa]">
                {PROTECT_STAGES[report.currentStage]?.code} - {PROTECT_STAGES[report.currentStage]?.name}
              </span>

              {report.isUrgentFromReporter && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">priority_high</span>
                  Darurat Pelapor
                </span>
              )}

              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                Risiko: <strong className="uppercase">{report.riskLevel.replace('_', ' ')}</strong>
              </span>
            </div>

            <h1 className="text-lg sm:text-2xl font-bold text-[#00152d] break-words">
              {report.category}
            </h1>
          </div>

          <div className="text-left sm:text-right text-[11px] sm:text-xs text-slate-500 space-y-0.5 shrink-0">
            <p>Registrasi: <span className="font-mono text-[#00152d]">{report.createdAt}</span></p>
            <p>Pembaruan: <span className="font-mono text-[#00152d]">{report.updatedAt}</span></p>
          </div>
        </div>

        {/* Macro location & timing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Lokasi Makro:</span>
            <span className="font-bold text-[#00152d]">{report.macroLocation}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Perkiraan Waktu:</span>
            <span className="font-bold text-[#00152d]">{report.timeEstimate}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 block text-[11px]">Lampiran Bukti:</span>
            <span className="font-bold text-[#00152d] truncate block">
              {report.attachmentName ? `Ada (${report.attachmentName})` : 'Tanpa Berkas'}
            </span>
          </div>
        </div>

        {/* NARRATIVE AS WRITTEN BY REPORTER */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#eff4ff] border border-slate-200 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00152d] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#006970]">format_quote</span>
            Isi Uraian Kronologi (Seperti Ditulis Oleh Pelapor)
          </span>
          <p className="text-xs sm:text-sm text-[#00152d] whitespace-pre-line leading-relaxed italic bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 break-words">
            "{report.description}"
          </p>
          <p className="text-[10px] sm:text-[11px] text-slate-500">
            *Catatan: Sistem tidak merekam alamat IP atau data akun pelapor demi menjamin perlindungan syar'i.
          </p>
        </div>
      </div>

      {/* 2-COLUMN OPERATIONAL WORKFLOW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: Verifikasi Awal, Klasifikasi Risiko, Eskalasi SOP (7 Cols) */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {/* PANEL 1: VERIFIKASI AWAL */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#006970]">checklist</span>
                <h3 className="text-xs sm:text-sm font-bold text-[#00152d] uppercase tracking-wider">
                  Panel Verifikasi Awal
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-semibold">Triase Awal</span>
            </div>

            <p className="text-xs text-[#44474d] leading-relaxed">
              Periksa kelengkapan awal kronologi sebelum melangkah ke tindakan intervensi asrama:
            </p>

            <div className="space-y-2.5">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={infoCukup}
                  onChange={(e) => handleSaveChecklist(e.target.checked, perluKlarifikasi, kategoriSesuai)}
                  className="w-4 h-4 rounded text-[#006970] focus:ring-0 cursor-pointer shrink-0"
                />
                <span className="text-xs font-semibold text-[#00152d]">
                  1. Informasi kronologi awal cukup & logis
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={perluKlarifikasi}
                  onChange={(e) => handleSaveChecklist(infoCukup, e.target.checked, kategoriSesuai)}
                  className="w-4 h-4 rounded text-[#006970] focus:ring-0 cursor-pointer shrink-0"
                />
                <span className="text-xs font-semibold text-[#00152d]">
                  2. Perlu klarifikasi tambahan dari pelapor
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={kategoriSesuai}
                  onChange={(e) => handleSaveChecklist(infoCukup, perluKlarifikasi, e.target.checked)}
                  className="w-4 h-4 rounded text-[#006970] focus:ring-0 cursor-pointer shrink-0"
                />
                <span className="text-xs font-semibold text-[#00152d]">
                  3. Kategori aduan sesuai dengan peristiwa
                </span>
              </label>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={handleDraftClarification}
                className="w-full py-2.5 px-4 rounded-xl bg-[#eff4ff] hover:bg-[#d3e4fe] text-[#006970] border border-[#006970]/30 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">edit_note</span>
                <span>Susun Pesan Klarifikasi ke Pelapor (Publik)</span>
              </button>
            </div>
          </div>

          {/* PANEL 2: KLASIFIKASI RISIKO (DIPILIH MANUSIA) */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#006970]">psychology</span>
                <h3 className="text-xs sm:text-sm font-bold text-[#00152d] uppercase tracking-wider">
                  Klasifikasi Risiko (Dipilih Manusia)
                </h3>
              </div>
              <span className="text-[10px] sm:text-xs text-[#006970] font-semibold bg-[#eff4ff] px-2 py-0.5 rounded-full shrink-0">
                Non-Otomatis
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#eff4ff] border border-slate-200 text-xs text-[#44474d] leading-relaxed">
              <strong className="text-[#00152d]">Prinsip Keadilan:</strong> Sistem tidak menentukan risiko secara otomatis. Penetapan risiko merupakan pertimbangan moral asatidz/satgas dengan kewajiban mencantumkan alasan tertulis.
            </div>

            <form onSubmit={handleSaveRisk} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-[#00152d] block mb-1.5">
                  Pilih Tingkat Risiko <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'ringan', label: 'Ringan', color: 'border-emerald-300 text-emerald-800' },
                    { key: 'sedang', label: 'Sedang', color: 'border-sky-300 text-sky-800' },
                    { key: 'tinggi', label: 'Tinggi', color: 'border-amber-300 text-amber-800' },
                    { key: 'darurat', label: 'Darurat', color: 'border-red-300 text-red-800' },
                  ].map((r) => {
                    const isSelected = selectedRisk === r.key;
                    return (
                      <button
                        key={r.key}
                        type="button"
                        onClick={() => setSelectedRisk(r.key as RiskLevel)}
                        className={`py-2 px-2.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-[#00152d] text-white border-[#00152d] shadow-xs'
                            : `bg-slate-50 ${r.color}`
                        }`}
                      >
                        {r.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#00152d] block mb-1">
                  Alasan Singkat Penetapan <span className="text-red-500">* (Wajib diisi manusia)</span>
                </label>
                <textarea
                  rows={2}
                  value={riskReason}
                  onChange={(e) => setRiskReason(e.target.value)}
                  placeholder="Jelaskan alasan objektif mengapa tingkat risiko dipilih..."
                  className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#00152d] focus:bg-white focus:outline-none focus:border-[#006970]"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                <span className="text-[10px] sm:text-[11px] text-slate-400">
                  {report.riskAssessedBy ? `Dinilai oleh: ${report.riskAssessedBy}` : 'Belum dinilai'}
                </span>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00152d] text-white text-xs font-bold hover:bg-[#006970] transition-colors cursor-pointer flex items-center justify-center gap-1.5 self-end sm:self-auto"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>{riskSavedToast ? 'Tersimpan!' : 'Simpan Klasifikasi'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* PANEL 3: ESKALASI SESUAI SOP PERLINDUNGAN PESANTREN */}
          {isHighRisk && (
            <div className="bg-red-50/70 rounded-3xl p-5 sm:p-7 border-2 border-red-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-red-200/60 pb-2.5">
                <div className="flex items-center gap-2 text-red-900">
                  <span className="material-symbols-outlined text-[20px] text-red-600">emergency</span>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                    Eskalasi Sesuai SOP Perlindungan
                  </h3>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-red-800 bg-red-100 px-2.5 py-0.5 rounded-full shrink-0">
                  Protokol Khusus
                </span>
              </div>

              <p className="text-xs text-red-900 leading-relaxed">
                Karena risiko berstatus <strong className="uppercase">{report.riskLevel}</strong>, sistem memicu panel eskalasi berbasis placeholder SOP pesantren.
              </p>

              {report.escalation && (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-red-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-red-800">
                    <span>Eskalasi Telah Tercatat Resmi</span>
                    <span className="font-mono text-[10px] sm:text-[11px]">{report.escalation.recordedAt}</span>
                  </div>
                  <div className="space-y-1 text-slate-700">
                    <p className="font-semibold text-slate-900">Langkah:</p>
                    <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                      {report.escalation.steps.map((st, i) => (
                        <li key={i}>{st}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-1 text-slate-700 pt-1">
                    <p className="font-semibold text-slate-900">Pihak Dihubungi:</p>
                    <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                      {report.escalation.partiesContacted.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1 italic">
                    Catatan: "{report.escalation.notes}"
                  </p>
                </div>
              )}

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsEscalateModalOpen(true)}
                  className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#ba1a1a] hover:bg-red-800 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">crisis_alert</span>
                  <span>{report.escalation ? 'Perbarui Catatan Eskalasi SOP' : 'Catat Eskalasi Sesuai SOP Pesantren'}</span>
                </button>
              </div>
            </div>
          )}

          {/* KOMPONEN PANDUAN VISUAL INTERAKTIF: RUJUKAN CEPAT PROTOKOL PROTECT */}
          <ProtectQuickReferenceWidget
            currentReportStage={report.currentStage}
            onApplyStage={(stageKey) => {
              setSelectedStage(stageKey);
            }}
            onApplyMessageDraft={(draft) => {
              setNewPublicMessage(draft);
              const messageBox = document.getElementById('public-message-input');
              if (messageBox) {
                messageBox.scrollIntoView({ behavior: 'smooth' });
                messageBox.focus();
              }
            }}
            defaultExpanded={true}
          />

          {/* PANEL 4: PEMBARUAN STATUS (TAHAP PROTECT) */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#006970]">published_with_changes</span>
                <h3 className="text-xs sm:text-sm font-bold text-[#00152d] uppercase tracking-wider">
                  Pembaruan Status (Tahap PROTECT)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsProtectGuideOpen(true)}
                className="text-xs font-bold text-[#006970] hover:text-[#00152d] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">menu_book</span>
                <span>Panduan Visual</span>
              </button>
            </div>

            <form onSubmit={handleUpdateStage} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-[#00152d] block mb-1">
                  Pilih Tahap Penanganan
                </label>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value as ProtectStageKey)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#00152d] focus:bg-white focus:outline-none focus:border-[#006970]"
                >
                  {Object.entries(PROTECT_STAGES).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.code}: {v.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#00152d] block mb-1">
                  Catatan Pembaruan Tahap <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={stageNote}
                  onChange={(e) => setStageNote(e.target.value)}
                  placeholder="Tuliskan catatan progres atau tindakan pada tahap ini..."
                  className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#00152d] focus:bg-white focus:outline-none focus:border-[#006970]"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#00152d] hover:bg-[#006970] text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Perbarui Tahap PROTECT</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Pesan Publik vs Catatan Internal, Rujukan, Log Aktivitas (5 Cols) */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          {/* AREA 1: PESAN UNTUK PELAPOR (PUBLIK DI SISI SANTRI) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#006970]/30 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2 text-[#006970]">
                <span className="material-symbols-outlined text-[18px]">public</span>
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Pesan Untuk Pelapor (Publik)
                </h3>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#006970] bg-[#eff4ff] px-2 py-0.5 rounded-full shrink-0">
                Tampil di /lacak
              </span>
            </div>

            <p className="text-xs text-[#44474d] leading-relaxed">
              Pesan di bawah ini akan dibaca santri ketika memasukkan kode tiket di <strong className="text-[#00152d]">/lacak</strong>:
            </p>

            <form onSubmit={handleSendPublicMessage} className="space-y-2.5">
              <textarea
                id="public-message-input"
                rows={3}
                value={newPublicMessage}
                onChange={(e) => setNewPublicMessage(e.target.value)}
                placeholder="Tuliskan pesan santun dan menenangkan untuk santri..."
                className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#00152d] focus:bg-white focus:outline-none focus:border-[#006970]"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#006970] hover:bg-[#00152d] text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Kirim Pesan ke Pelapor</span>
                </button>
              </div>
            </form>

            {/* List of Sent Public Messages */}
            <div className="space-y-2 pt-2 border-t border-slate-100 max-h-48 overflow-y-auto">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 block">Riwayat Pesan Publik:</span>
              {report.publicMessages && report.publicMessages.length > 0 ? (
                report.publicMessages.map((msg) => (
                  <div key={msg.id} className="p-2.5 rounded-xl bg-[#eff4ff] text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 font-semibold">
                      <span>{msg.senderRole}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="text-[#00152d] italic break-words">"{msg.message}"</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">Belum ada pesan publik.</p>
              )}
            </div>
          </div>

          {/* AREA 2: CATATAN INTERNAL (HANYA PETUGAS - TIDAK PERNAH TAMPIL DI SANTRI) */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-sm space-y-3.5 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2 text-amber-300">
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Catatan Internal (Hanya Petugas)
                </h3>
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-red-300 bg-red-950/80 px-2 py-0.5 rounded-full uppercase border border-red-800/60 shrink-0">
                TIDAK TAMPIL DI PELAPOR
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Catatan telaah tertutup antar satgas. <strong>Dijamin tidak pernah bocor ke santri.</strong>
            </p>

            <form onSubmit={handleSaveInternalNote} className="space-y-2.5">
              <textarea
                rows={3}
                value={newInternalNote}
                onChange={(e) => setNewInternalNote(e.target.value)}
                placeholder="Tuliskan catatan internal rahasia antar satgas..."
                className="w-full p-2.5 sm:p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-300"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">lock_clock</span>
                  <span>Simpan Catatan Internal</span>
                </button>
              </div>
            </form>

            <div className="space-y-2 pt-2 border-t border-slate-800 max-h-48 overflow-y-auto">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 block">Riwayat Catatan Rahasia:</span>
              {report.internalNotes && report.internalNotes.length > 0 ? (
                report.internalNotes.map((note) => (
                  <div key={note.id} className="p-2.5 rounded-xl bg-slate-800 text-xs space-y-1 border border-slate-700">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-amber-200/80 font-semibold">
                      <span>{note.authorRole}</span>
                      <span>{note.timestamp}</span>
                    </div>
                    <p className="text-slate-200 break-words">{note.note}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">Belum ada catatan internal.</p>
              )}
            </div>
          </div>

          {/* PENDAMPINGAN / RUJUKAN (SIMULASI) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#006970]">support_agent</span>
                <h3 className="text-xs font-bold text-[#00152d] uppercase tracking-wider">
                  Pendampingan Santri (Simulasi)
                </h3>
              </div>
              <span className="text-[10px] text-[#006970] font-semibold bg-[#eff4ff] px-2 py-0.5 rounded-full shrink-0">
                Internal
              </span>
            </div>

            <form onSubmit={handleAddReferral} className="space-y-2.5">
              <div>
                <label className="text-[11px] font-semibold text-[#00152d] block mb-1">
                  Jenis Pendampingan
                </label>
                <select
                  value={referralType}
                  onChange={(e) => setReferralType(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#00152d]"
                >
                  <option value="Konseling Sebaya di Bilik Aman">Konseling Sebaya di Bilik Aman</option>
                  <option value="Pendampingan Emosional Khusus Bu Nyai / Ustadzah">Pendampingan Khusus Bu Nyai / Ustadzah</option>
                  <option value="Pemeriksaan Medis Fisik di Poskestren">Pemeriksaan Medis Fisik di Poskestren</option>
                  <option value="Mediasi Damai / Ishlah Tertutup oleh Lurah Pondok">Mediasi Ishlah Tertutup Lurah Pondok</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#00152d] block mb-1">
                  Catatan Rencana Pendampingan
                </label>
                <input
                  type="text"
                  value={referralNote}
                  onChange={(e) => setReferralNote(e.target.value)}
                  placeholder="Misal: Sesi temu tertutup setelah shalat Ashar..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#00152d]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-3 rounded-xl bg-[#00152d] hover:bg-[#006970] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Simpan Rencana Pendampingan
              </button>
            </form>

            {report.referrals && report.referrals.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 block">Riwayat Pendampingan:</span>
                {report.referrals.map((ref) => (
                  <div key={ref.id} className="p-2.5 rounded-xl bg-slate-50 text-xs border border-slate-200">
                    <div className="flex items-center justify-between font-bold text-[#00152d]">
                      <span>{ref.type}</span>
                      <span className="text-[10px] text-[#006970]">{ref.status}</span>
                    </div>
                    <p className="text-slate-600 mt-1 break-words">{ref.notes}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">{ref.timestamp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* LOG AKTIVITAS (AUDIT TRAIL SIMULASI) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#006970]">history</span>
                <h3 className="text-xs font-bold text-[#00152d] uppercase tracking-wider">
                  Log Aktivitas & Audit Berkas
                </h3>
              </div>
              <span className="text-[10px] text-slate-400">Kronologi</span>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {report.activityLogs && report.activityLogs.length > 0 ? (
                report.activityLogs.map((log) => (
                  <div key={log.id} className="text-xs border-l-2 border-[#006970] pl-2.5 py-0.5 space-y-0.5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-[#00152d]">{log.actorRole}</span>
                      <span className="text-slate-400 font-mono">{log.timestamp}</span>
                    </div>
                    <p className="text-[#44474d] leading-snug break-words">{log.action}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">Belum ada catatan aktivitas.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL ESKALASI SOP */}
      {isEscalateModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#00152d]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl shadow-xl p-5 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-2.5 text-red-800">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">crisis_alert</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#00152d]">Pencatatan Eskalasi SOP</h3>
                <p className="text-[11px] text-slate-500">SOP Himayatul Awlad Pesantren</p>
              </div>
            </div>

            <p className="text-xs text-[#44474d] leading-relaxed">
              Pastikan langkah eskalasi sesuai dengan koridor adab syar'i dan tidak menciptakan kepanikan di asrama santri.
            </p>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#00152d] block">Pilih Langkah SOP (Placeholder):</span>
              {[
                '[Langkah SOP: Pemisahan fisik dan evakuasi perlindungan ke bilik aman pengasuhan]',
                '[Langkah SOP: Pengamanan lorong & patroli asatidz siaga malam ini]',
                '[Langkah SOP: Laporan tertutup kepada Majelis Pengasuh/Kiai]',
                '[Langkah SOP: Koordinasi medis tertutup bersama tim dokter Poskestren]',
              ].map((step, idx) => {
                const checked = selectedEscalationSteps.includes(step);
                return (
                  <label key={idx} className="flex items-start gap-2 text-xs text-[#00152d] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEscalationSteps([...selectedEscalationSteps, step]);
                        } else {
                          setSelectedEscalationSteps(selectedEscalationSteps.filter((s) => s !== step));
                        }
                      }}
                      className="mt-0.5 rounded text-red-600 shrink-0"
                    />
                    <span className="break-words">{step}</span>
                  </label>
                );
              })}
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-[#00152d] block">Pihak yang Dihubungi (Placeholder):</span>
              {[
                '[Pihak SOP: Majelis Pengasuh / Dewan Masyayikh]',
                '[Pihak SOP: Tim Medis Poskestren]',
                '[Pihak SOP: Konselor Putri/Putra Berlisensi]',
                '[Pihak SOP: Tim Advokasi/Hukum Mitra Pesantren]',
              ].map((party, idx) => {
                const checked = selectedEscalationParties.includes(party);
                return (
                  <label key={idx} className="flex items-start gap-2 text-xs text-[#00152d] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEscalationParties([...selectedEscalationParties, party]);
                        } else {
                          setSelectedEscalationParties(selectedEscalationParties.filter((p) => p !== party));
                        }
                      }}
                      className="mt-0.5 rounded text-red-600 shrink-0"
                    />
                    <span className="break-words">{party}</span>
                  </label>
                );
              })}
            </div>

            <div>
              <label className="text-xs font-bold text-[#00152d] block mb-1">
                Catatan Tambahan:
              </label>
              <textarea
                rows={2}
                value={escalationCustomNote}
                onChange={(e) => setEscalationCustomNote(e.target.value)}
                placeholder="Rincian instruksi khusus pengasuh..."
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#00152d]"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsEscalateModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer hover:bg-slate-200"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmEscalation}
                className="px-5 py-2 rounded-xl bg-[#ba1a1a] hover:bg-red-800 text-white text-xs font-bold cursor-pointer"
              >
                Catat Eskalasi Resmi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PANDUAN VISUAL SOP PROTECT */}
      <ProtectVisualGuideModal
        isOpen={isProtectGuideOpen}
        onClose={() => setIsProtectGuideOpen(false)}
        currentStage={report.currentStage}
        onApplyStage={(stageKey) => {
          setSelectedStage(stageKey);
        }}
      />
    </div>
  );
};
