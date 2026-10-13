import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { storageService } from '../services/storage';
import { ReportItem, PROTECT_STAGES, ProtectStageKey } from '../types/report';

export const Lacak: React.FC = () => {
  const { queryParams, navigate } = useRouter();

  const [searchCode, setSearchCode] = useState(queryParams.kode || 'HN-2026-8942-AMN');
  const [activeReport, setActiveReport] = useState<ReportItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [isMsgPanelOpen, setIsMsgPanelOpen] = useState(false);
  const [sentFollowUp, setSentFollowUp] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const code = queryParams.kode || searchCode;
    if (code) {
      loadReport(code);
    }
  }, [queryParams.kode]);

  useEffect(() => {
    const handleStorageUpdate = () => {
      if (activeReport) {
        loadReport(activeReport.id);
      }
    };
    window.addEventListener('storage_update', handleStorageUpdate);
    return () => window.removeEventListener('storage_update', handleStorageUpdate);
  }, [activeReport]);

  const loadReport = (codeToSearch: string) => {
    const report = storageService.getReportById(codeToSearch);
    if (report) {
      setActiveReport(report);
      setNotFound(false);
    } else {
      setActiveReport(null);
      setNotFound(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCode.trim()) {
      navigate(`/lacak?kode=${encodeURIComponent(searchCode.trim().toUpperCase())}`);
      loadReport(searchCode.trim().toUpperCase());
    }
  };

  const handleCopyCode = () => {
    if (!activeReport) return;
    navigator.clipboard.writeText(activeReport.id).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSendFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReport || !additionalMessage.trim()) return;

    storageService.addActivityLog(
      activeReport.id,
      'Pelapor (Santri)',
      `Menambahkan keterangan tambahan santri: "${additionalMessage.trim().substring(0, 50)}..."`
    );

    storageService.addPublicMessage(
      activeReport.id,
      `[Keterangan Tambahan Santri]: ${additionalMessage.trim()}`,
      'Pelapor (Santri)'
    );

    setAdditionalMessage('');
    setSentFollowUp(true);
    setTimeout(() => {
      setSentFollowUp(false);
      setIsMsgPanelOpen(false);
    }, 1500);

    loadReport(activeReport.id);
  };

  const stageKeys: ProtectStageKey[] = ['P', 'R', 'O', 'T', 'E', 'C', 'T_FINAL'];

  const getStageIndex = (key: ProtectStageKey): number => {
    return stageKeys.indexOf(key);
  };

  const activeStageIndex = activeReport ? getStageIndex(activeReport.currentStage) : 0;

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-8 max-w-7xl mx-auto flex-1 space-y-6">
      {/* Top Banner */}
      <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#94f1fa]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="material-symbols-outlined text-[#006970] text-[18px] shrink-0">verified_user</span>
          <span className="font-bold text-[#00152d]">PELACAKAN STATUS LAPORAN</span>
          <span className="text-[#44474d] hidden xs:inline">•</span>
          <span className="text-[#44474d] hidden xs:inline">SantriVision 2026</span>
        </div>
        <div className="flex items-center gap-2 text-[#006970] font-semibold text-[11px] sm:text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
          <span>Zero-Identity • Akses Bebas Log</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: Search & Guidance (5 Cols) */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          {/* SEARCH CARD */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-slate-200">
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#00152d] shrink-0">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">manage_search</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#00152d]">Lacak Berkas Pelaporan</h2>
            </div>
            <p className="text-xs text-[#44474d] mb-3.5 leading-relaxed">
              Periksa perkembangan verifikasi, respons tim pendamping, dan pembaruan alur perlindungan tanpa perlu login akun.
            </p>

            <form onSubmit={handleSearch} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-[#00152d] block mb-1">
                  Masukkan Kode Tiket Anonim
                </label>
                <input
                  type="text"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Contoh: HN-2026-8942-AMN"
                  className="w-full bg-[#eff4ff] text-[#00152d] font-mono font-bold text-xs sm:text-sm rounded-xl px-3 py-2.5 border border-slate-300 focus:bg-white focus:outline-none focus:border-[#006970] uppercase truncate"
                />
              </div>

              {/* Demo presets */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#44474d] mb-1 font-semibold">
                  <span>Preset Demo:</span>
                  <span className="text-[#006970]">Klik untuk memuat</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                  {['HN-2026-8942-AMN', 'HN-2026-9011-URG', 'HN-2026-4102-RHM'].map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        setSearchCode(code);
                        navigate(`/lacak?kode=${code}`);
                        loadReport(code);
                      }}
                      className={`px-2 py-1.5 rounded-lg border text-left font-mono text-[11px] font-semibold transition-all cursor-pointer truncate ${
                        activeReport?.id === code
                          ? 'border-[#006970] bg-[#eff4ff] text-[#006970]'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#00152d] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#122a46] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Periksa Status Tiket</span>
              </button>
            </form>
          </div>

          {/* ACTIVE TICKET REASSURANCE CARD */}
          {activeReport && (
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-slate-200 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#00152d] uppercase tracking-wider">
                  Kunci Berkas Aktif
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#006970] bg-[#eff4ff] px-2.5 py-0.5 rounded-full">
                  Tersimpan Sesi
                </span>
              </div>

              <div className="p-3 bg-[#eff4ff] rounded-xl flex items-center justify-between gap-2 border border-slate-200">
                <span className="font-mono text-xs sm:text-sm font-bold text-[#00152d] select-all truncate">
                  {activeReport.id}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 sm:px-3 bg-[#006970] text-white rounded-lg text-xs font-semibold hover:bg-[#00152d] transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>

              {/* WASIAT HIFDZ */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#e5eeff] space-y-1 border-l-4 border-l-[#006970]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#00152d]">
                  <span className="material-symbols-outlined text-[17px] text-[#006970]">shield_lock</span>
                  Wasiat Penjagaan (Hifdz)
                </div>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Simpan kode ini dengan cermat. <strong>Jangan tinggalkan catatan kode di lemari kamar</strong> yang mudah terbaca santri lain. Satgas tidak pernah meminta kode Anda di depan umum.
                </p>
              </div>
            </div>
          )}

          {/* EMERGENCY HELPLINE */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2 text-[#00152d]">
              <span className="material-symbols-outlined text-[#006970] text-[18px] sm:text-[20px]">contact_emergency</span>
              <h4 className="text-xs font-bold uppercase tracking-wider">Butuh Bantuan Segera di Kompleks?</h4>
            </div>
            <p className="text-xs text-[#44474d] leading-relaxed">
              Jika Anda merasa terancam secara fisik detik ini, segera datangi pos aman terdekat:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006970] text-[18px] shrink-0">meeting_room</span>
                <div className="min-w-0">
                  <p className="font-bold text-[#00152d] truncate">Bilik Konseling Masjid</p>
                  <p className="text-[11px] text-[#44474d] truncate">Konselor Sebaya</p>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006970] text-[18px] shrink-0">call</span>
                <div className="min-w-0">
                  <p className="font-bold text-[#00152d] truncate">Posko Asatidz (24 Jam)</p>
                  <p className="text-[11px] text-[#44474d] truncate">0800-1-SANTRI</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Case Detail & PROTECT Stepper (7 Cols) */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {notFound ? (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[28px]">search_off</span>
              </div>
              <h3 className="text-base font-bold text-[#00152d]">Kode Tiket Tidak Ditemukan</h3>
              <p className="text-xs sm:text-sm text-[#44474d] max-w-md mx-auto leading-relaxed">
                Kode tiket <span className="font-mono font-bold text-[#00152d]">"{searchCode}"</span> belum terdaftar di pangkalan data perlindungan. Pastikan kode yang Anda masukkan tepat.
              </p>
            </div>
          ) : activeReport ? (
            <>
              {/* CASE HEADER BANNER */}
              <div className="bg-[#00152d] text-white rounded-2xl p-4 sm:p-6 shadow-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#94f1fa] tracking-wider">
                      {activeReport.id}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-[#122a46] text-[#94f1fa] font-semibold border border-[#94f1fa]/30">
                      Tahap: {PROTECT_STAGES[activeReport.currentStage]?.code}
                    </span>
                    {activeReport.isUrgentFromReporter && (
                      <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white font-bold">
                        Darurat Pelapor
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-300">
                    {activeReport.createdAt}
                  </span>
                </div>

                <h3 className="text-base sm:text-xl font-bold leading-snug break-words">
                  {activeReport.category}
                </h3>

                <div className="pt-2 border-t border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] sm:text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#94f1fa] shrink-0">location_on</span>
                    <span className="truncate">{activeReport.macroLocation}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#94f1fa] shrink-0">update</span>
                    <span>Diperbarui: {activeReport.updatedAt}</span>
                  </div>
                </div>
              </div>

              {/* TIMELINE ALUR PROTOKOL P-R-O-T-E-C-T */}
              <div className="bg-white rounded-2xl p-4 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#00152d] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-[#006970]">timeline</span>
                      Alur Protokol P-R-O-T-E-C-T (7 Tahapan)
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#44474d] mt-0.5">
                      Melacak tahapan secara transparan tanpa membuka identitas Anda
                    </p>
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-[#006970] bg-[#eff4ff] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0">
                    {activeStageIndex + 1} / 7
                  </span>
                </div>

                {/* Vertical Stepper */}
                <div className="space-y-3 sm:space-y-4 relative pl-5 sm:pl-6 before:content-[''] before:absolute before:left-2 sm:before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {stageKeys.map((stageKey, idx) => {
                    const stageInfo = PROTECT_STAGES[stageKey];
                    const isCompleted = idx < activeStageIndex;
                    const isActive = idx === activeStageIndex;

                    return (
                      <div key={stageKey} className="relative flex items-start gap-2.5 sm:gap-3">
                        {/* Bubble */}
                        <div
                          className={`absolute -left-5 sm:-left-6 mt-0.5 w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold shadow-xs transition-all ${
                            isCompleted
                              ? 'bg-[#006970] text-white ring-2 sm:ring-4 ring-white'
                              : isActive
                              ? 'bg-[#00152d] text-[#94f1fa] ring-2 sm:ring-4 ring-[#94f1fa]/40 animate-pulse'
                              : 'bg-slate-200 text-slate-500 ring-2 sm:ring-4 ring-white'
                          }`}
                        >
                          {isCompleted ? '✓' : idx + 1}
                        </div>

                        {/* Content */}
                        <div
                          className={`p-3 sm:p-3.5 rounded-xl w-full border transition-all ${
                            isActive
                              ? 'bg-[#eff4ff] border-[#006970] shadow-xs'
                              : isCompleted
                              ? 'bg-slate-50/70 border-slate-200/80'
                              : 'bg-white border-slate-200 opacity-60'
                          }`}
                        >
                          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1">
                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                              <span
                                className={`text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded ${
                                  isActive
                                    ? 'bg-[#00152d] text-white'
                                    : isCompleted
                                    ? 'bg-[#006970]/15 text-[#006970]'
                                    : 'bg-slate-100 text-slate-500'
                                }`}
                              >
                                {stageInfo.code}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-[#00152d]">
                                {stageInfo.name}
                              </span>
                            </div>

                            <span className="text-[10px] sm:text-[11px] font-semibold text-[#44474d] shrink-0">
                              {isActive ? (
                                <span className="text-[#006970] flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#006970] animate-ping"></span>
                                  Sedang Berjalan
                                </span>
                              ) : isCompleted ? (
                                'Selesai'
                              ) : (
                                'Akan Datang'
                              )}
                            </span>
                          </div>

                          <p className="text-xs text-[#44474d] mt-1 leading-relaxed">
                            {stageInfo.description}
                          </p>
                          <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
                            Pelaksana: {stageInfo.actor}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CATATAN RESMI TIM SATGAS & PENGAWAS (PUBLIC MESSAGES) */}
              <div className="bg-white rounded-2xl p-4 sm:p-8 border border-slate-200 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-[#006970]">verified</span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#00152d] uppercase tracking-wider">
                      Catatan Resmi Tim Satgas & Pengasuh (Pesan Publik)
                    </h4>
                  </div>
                  <span className="text-[10px] sm:text-xs text-[#006970] font-semibold bg-[#eff4ff] px-2 py-0.5 rounded-full shrink-0">
                    Dilihat Pelapor
                  </span>
                </div>

                {activeReport.publicMessages && activeReport.publicMessages.length > 0 ? (
                  <div className="space-y-2.5">
                    {activeReport.publicMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-3.5 rounded-xl bg-[#eff4ff] border-l-4 border-l-[#006970] space-y-1"
                      >
                        <div className="flex items-center justify-between text-xs text-[#44474d]">
                          <span className="font-bold text-[#00152d] flex items-center gap-1 text-[11px] sm:text-xs">
                            <span className="material-symbols-outlined text-[13px] sm:text-[14px] text-[#006970]">verified_user</span>
                            {msg.senderRole}
                          </span>
                          <span className="text-[10px] sm:text-[11px]">{msg.timestamp}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#00152d] leading-relaxed italic break-words">
                          "{msg.message}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-slate-50 text-xs text-[#44474d] text-center italic">
                    Belum ada pesan publik dari tim satgas. Berkas sedang dalam alur telaah tertutup.
                  </div>
                )}

                <div className="p-2.5 sm:p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1 border border-emerald-200">
                  <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <span className="material-symbols-outlined text-[15px] text-emerald-600 shrink-0">verified_user</span>
                    Diverifikasi Tim Petugas Perlindungan Santri
                  </span>
                  <span className="font-bold text-emerald-700 text-[11px] sm:text-xs">Kerahasiaan 100% Terjaga</span>
                </div>
              </div>

              {/* ACTIONABLE NEXT STEPS FOR SANTRI */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#00152d] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[17px] text-[#006970]">alt_route</span>
                    Tindak Lanjut & Aksi Santri
                  </h4>
                  <span className="text-[10px] sm:text-[11px] text-[#44474d]">100% anonim</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsMsgPanelOpen(!isMsgPanelOpen)}
                    className="p-3 rounded-xl bg-[#eff4ff] hover:bg-[#d3e4fe] border border-slate-200 transition-colors text-left flex items-start gap-2.5 cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white text-[#006970] flex items-center justify-center shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#00152d] block group-hover:text-[#006970]">
                        Kirim Pesan Tambahan
                      </span>
                      <span className="text-[11px] text-[#44474d] mt-0.5 block leading-tight">
                        Ada perkembangan baru atau info saksi? Tambahkan keterangan terenkripsi.
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      alert(
                        'Permintaan konsultasi tertutup telah dicatat secara aman. Silakan kunjungi Bilik Konseling Masjid bada Maghrib dengan memperlihatkan kode tiket Anda kepada konselor sebaya.'
                      );
                    }}
                    className="p-3 rounded-xl bg-[#eff4ff] hover:bg-[#d3e4fe] border border-slate-200 transition-colors text-left flex items-start gap-2.5 cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white text-[#006970] flex items-center justify-center shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[18px]">support_agent</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#00152d] block group-hover:text-[#006970]">
                        Hubungi Konselor Sebaya
                      </span>
                      <span className="text-[11px] text-[#44474d] mt-0.5 block leading-tight">
                        Minta jadwal temu tertutup di Bilik Konseling tanpa perantara santri lain.
                      </span>
                    </div>
                  </button>
                </div>

                {/* Inline expansion for sending additional message */}
                {isMsgPanelOpen && (
                  <form onSubmit={handleSendFollowUp} className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#00152d] flex items-center gap-1.5 truncate">
                        <span className="material-symbols-outlined text-[16px] text-[#006970] shrink-0">lock</span>
                        Keterangan Tambahan #{activeReport.id}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsMsgPanelOpen(false)}
                        className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer shrink-0"
                      >
                        ✕ Tutup
                      </button>
                    </div>

                    <textarea
                      rows={3}
                      value={additionalMessage}
                      onChange={(e) => setAdditionalMessage(e.target.value)}
                      placeholder="Tuliskan perkembangan situasi terbaru atau info yang belum sempat diceritakan..."
                      className="w-full p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-[#00152d] focus:outline-none focus:border-[#006970]"
                      required
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-[10px] sm:text-[11px] text-slate-400">Pesan langsung diteruskan ke tim petugas.</span>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#006970] text-white rounded-lg text-xs font-bold hover:bg-[#00152d] transition-colors cursor-pointer flex items-center justify-center gap-1 self-end sm:self-auto"
                      >
                        <span className="material-symbols-outlined text-[14px]">send</span>
                        <span>{sentFollowUp ? 'Terkirim!' : 'Kirim Terenkripsi'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
