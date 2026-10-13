import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { storageService } from '../services/storage';
import { ReportItem, PROTECT_STAGES, ProtectStageKey } from '../types/report';

export const PengawasMonitoring: React.FC = () => {
  const { navigate } = useRouter();

  const [reports, setReports] = useState<ReportItem[]>([]);
  const [systemNotes, setSystemNotes] = useState<string[]>([
    'Perlu penguatan kapasitas duta santri sebaya untuk mengenali indikasi perundungan relasional di jam istirahat muthalaah.',
    'Peningkatan patroli asatidz piket pada lorong lantai 2 asrama putra barat telah menurunkan frekuensi aduan hingga batas aman.',
    'Standarisasi respons darurat: waktu triase rata-rata berhasil ditekan di bawah 4 jam kerja.',
  ]);
  const [newSystemNote, setNewSystemNote] = useState('');

  const DEMO_BACKLOG_DAYS_THRESHOLD = 7; // Konstanta Demo N hari

  const loadData = () => {
    setReports(storageService.getReports());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, []);

  // Privacy Rule: Any count < 3 is displayed as "<3" (k-anonymity privacy protection)
  const formatPrivacyCount = (count: number): string => {
    if (count === 0) return '0';
    if (count < 3) return '<3';
    return count.toString();
  };

  // Calculations
  const totalReports = reports.length;

  // By Stage
  const stageCounts: Record<ProtectStageKey, number> = {
    P: 0,
    R: 0,
    O: 0,
    T: 0,
    E: 0,
    C: 0,
    T_FINAL: 0,
  };
  reports.forEach((r) => {
    if (stageCounts[r.currentStage] !== undefined) {
      stageCounts[r.currentStage]++;
    }
  });

  // By Risk Level
  const riskCounts = {
    belum_ditentukan: 0,
    ringan: 0,
    sedang: 0,
    tinggi: 0,
    darurat: 0,
  };
  reports.forEach((r) => {
    if (riskCounts[r.riskLevel] !== undefined) {
      riskCounts[r.riskLevel]++;
    }
  });

  // By Category
  const categoryCounts: Record<string, number> = {};
  reports.forEach((r) => {
    const key = r.category.split('(')[0].trim();
    categoryCounts[key] = (categoryCounts[key] || 0) + 1;
  });

  // Kepatuhan Tahapan (sudah melewati tinjauan/review awal, i.e. beyond stage P)
  const reviewedCount = reports.filter((r) => r.currentStage !== 'P').length;
  const adherencePercent = totalReports > 0 ? Math.round((reviewedCount / totalReports) * 100) : 100;

  // Laporan yang belum diperbarui lebih dari N hari
  const backlogReports = reports.filter((r) => r.daysSinceUpdate >= DEMO_BACKLOG_DAYS_THRESHOLD);

  const handleAddSystemNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSystemNote.trim()) return;
    setSystemNotes([newSystemNote.trim(), ...systemNotes]);
    setNewSystemNote('');
  };

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-8 max-w-7xl mx-auto flex-1 space-y-6 sm:space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00152d] text-[#94f1fa] text-[11px] sm:text-xs font-bold mb-1.5">
            <span className="material-symbols-outlined text-[14px]">insights</span>
            PORTAL PENGAWAS & PENGASUH PESANTREN
          </div>
          <h1 className="text-xl sm:text-3xl font-bold text-[#00152d]">
            Monitoring Agregat & Evaluasi Proses Perlindungan
          </h1>
          <p className="text-xs sm:text-sm text-[#44474d] mt-0.5">
            Data disajikan strictly agregat untuk evaluasi kebijakan tata tertib pesantren tanpa membuka isi cerita atau identitas pihak mana pun.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 text-[#00152d] text-[11px] sm:text-xs font-bold border border-slate-200">
            <span className="material-symbols-outlined text-[15px] text-[#006970]">verified_user</span>
            Privasi: Nilai &lt; 3 Ditampilkan "&lt;3"
          </span>
          <button
            onClick={() => navigate('/petugas')}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-[#00152d] hover:bg-slate-50 cursor-pointer shadow-xs"
          >
            Antrean Petugas
          </button>
        </div>
      </div>

      {/* PRIVACY ASSURANCE STRIP */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#eff4ff] border border-slate-200 text-xs text-[#44474d] flex items-start gap-2.5 sm:gap-3">
        <span className="material-symbols-outlined text-[20px] sm:text-[22px] text-[#006970] shrink-0 mt-0.5">
          privacy_tip
        </span>
        <div className="space-y-1">
          <p className="font-bold text-[#00152d]">
            Prinsip Maqashid Syari'ah: Hifzhul 'Irdh (Menjaga Kehormatan) & Privasi Agregat
          </p>
          <p className="leading-relaxed">
            Halaman monitoring pimpinan ini sengaja dirancang <strong>tanpa uraian kronologi</strong>, <strong>tanpa nama saksi</strong>, dan <strong>tanpa daftar pihak yang dilaporkan</strong>. Setiap metrik frekuensi kecil (&lt;3) disamarkan sebagai "&lt;3" untuk mencegah identifikasi silang (*k-anonymity*). Seluruh angka berlabel <strong className="text-[#006970]">Data Simulasi</strong>.
          </p>
        </div>
      </div>

      {/* SUMMARY STATS TILES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#44474d] gap-0.5">
            <span className="truncate">Total Berkas</span>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#006970] bg-[#eff4ff] px-1.5 py-0.5 rounded self-start sm:self-auto">Simulasi</span>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-[#00152d] block font-mono">
            {formatPrivacyCount(totalReports)}
          </span>
          <span className="text-[10px] sm:text-[11px] text-slate-500">Seluruh aduan</span>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#44474d] gap-0.5">
            <span className="truncate">Kepatuhan</span>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded self-start sm:self-auto">SOP Aktif</span>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-emerald-700 block font-mono">
            {adherencePercent}%
          </span>
          <span className="text-[10px] sm:text-[11px] text-slate-500 truncate block">
            {formatPrivacyCount(reviewedCount)} melewati telaah
          </span>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#44474d] gap-0.5">
            <span className="truncate">Darurat</span>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded self-start sm:self-auto">Prioritas</span>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-[#ba1a1a] block font-mono">
            {formatPrivacyCount(riskCounts.darurat)}
          </span>
          <span className="text-[10px] sm:text-[11px] text-slate-500 truncate block">Eskalasi SOP</span>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#44474d] gap-0.5">
            <span className="truncate">Backlog</span>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded self-start sm:self-auto">&gt;{DEMO_BACKLOG_DAYS_THRESHOLD} Hari</span>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-amber-700 block font-mono">
            {formatPrivacyCount(backlogReports.length)}
          </span>
          <span className="text-[10px] sm:text-[11px] text-slate-500 truncate block">Perlu tindak lanjut</span>
        </div>
      </div>

      {/* AGGREGATE BREAKDOWN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* CARD 1: Jumlah per Tahap PROTECT */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 sm:pb-3">
            <h3 className="text-xs font-bold text-[#00152d] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#006970]">account_tree</span>
              <span>Jumlah Per Tahap PROTECT</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-semibold uppercase shrink-0">Simulasi</span>
          </div>

          <div className="space-y-2.5">
            {Object.entries(PROTECT_STAGES).map(([key, info]) => {
              const count = stageCounts[key as ProtectStageKey] || 0;
              const formatted = formatPrivacyCount(count);
              return (
                <div key={key} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#00152d] bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                      {key === 'T_FINAL' ? 'T' : key}
                    </span>
                    <span className="text-slate-700 font-medium">{info.name}</span>
                  </div>
                  <span className="font-mono font-bold text-[#00152d] bg-[#eff4ff] px-2.5 py-0.5 rounded-full">
                    {formatted}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CARD 2: Jumlah per Tingkat Risiko */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 sm:pb-3">
            <h3 className="text-xs font-bold text-[#00152d] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#006970]">crisis_alert</span>
              <span>Jumlah Per Tingkat Risiko</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-semibold uppercase shrink-0">Simulasi</span>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-red-50 text-red-900 border border-red-100">
              <span className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                Darurat
              </span>
              <span className="font-mono font-bold">{formatPrivacyCount(riskCounts.darurat)}</span>
            </div>

            <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-100">
              <span className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                Tinggi
              </span>
              <span className="font-mono font-bold">{formatPrivacyCount(riskCounts.tinggi)}</span>
            </div>

            <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-sky-50 text-sky-900 border border-sky-100">
              <span className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                Sedang
              </span>
              <span className="font-mono font-bold">{formatPrivacyCount(riskCounts.sedang)}</span>
            </div>

            <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-100">
              <span className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                Ringan
              </span>
              <span className="font-mono font-bold">{formatPrivacyCount(riskCounts.ringan)}</span>
            </div>

            <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 text-slate-700 border border-slate-200">
              <span className="font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                Belum Ditentukan
              </span>
              <span className="font-mono font-bold">{formatPrivacyCount(riskCounts.belum_ditentukan)}</span>
            </div>
          </div>
        </div>

        {/* CARD 3: Jumlah per Kategori Masalah */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 sm:pb-3">
            <h3 className="text-xs font-bold text-[#00152d] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#006970]">category</span>
              <span>Jumlah Per Kategori Insiden</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-semibold uppercase shrink-0">Simulasi</span>
          </div>

          <div className="space-y-2.5">
            {Object.entries(categoryCounts).map(([catName, count]) => (
              <div key={catName} className="flex items-center justify-between text-xs">
                <span className="text-slate-700 font-medium truncate pr-2" title={catName}>
                  {catName}
                </span>
                <span className="font-mono font-bold text-[#00152d] bg-[#eff4ff] px-2.5 py-0.5 rounded-full flex-shrink-0">
                  {formatPrivacyCount(count)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EVALUASI PROSES & PEMERIKSAAN TINDAK LANJUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Pemeriksaan Tindak Lanjut (Backlog Laporan Belum Update) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-amber-600 shrink-0">alarm</span>
              <h3 className="text-xs sm:text-sm font-bold text-[#00152d] uppercase tracking-wider">
                Pemeriksaan Tindak Lanjut
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded self-start sm:self-auto">
              Ambang Batas: &gt;{DEMO_BACKLOG_DAYS_THRESHOLD} Hari
            </span>
          </div>

          <p className="text-xs text-[#44474d] leading-relaxed">
            Menemukan berkas yang belum menerima pembaruan status lebih dari {DEMO_BACKLOG_DAYS_THRESHOLD} hari kerja (konstanta demo) guna mencegah kelalaian respon asatidz:
          </p>

          {backlogReports.length === 0 ? (
            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs text-center border border-emerald-200">
              Semua berkas diperbarui tepat waktu sesuai standar SOP kemaslahatan santri.
            </div>
          ) : (
            <div className="space-y-3">
              {backlogReports.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-[#00152d] truncate">{b.id}</span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">
                      {b.daysSinceUpdate} hari tanpa update
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span className="truncate">Tahap: {PROTECT_STAGES[b.currentStage]?.name}</span>
                    <span className="shrink-0">{b.createdAt}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    Perhatian Pengawas: Segera koordinasi dengan petugas piket untuk memperbarui langkah tindak lanjut.
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Catatan Perbaikan Sistem & Rekomendasi Pesantren */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-4 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#006970] shrink-0">recommend</span>
              <h3 className="text-xs sm:text-sm font-bold text-[#00152d] uppercase tracking-wider">
                Catatan Perbaikan Sistem & Tata Tertib
              </h3>
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#006970] font-semibold bg-[#eff4ff] px-2 py-0.5 rounded-full shrink-0">
              Majelis Kiai
            </span>
          </div>

          <p className="text-xs text-[#44474d] leading-relaxed">
            Rekomendasi dari pengawas untuk penyempurnaan sarana fisik asrama, kurikulum adab santri, dan tata tertib pondok:
          </p>

          <form onSubmit={handleAddSystemNote} className="space-y-2">
            <textarea
              rows={2}
              value={newSystemNote}
              onChange={(e) => setNewSystemNote(e.target.value)}
              placeholder="Tuliskan catatan perbaikan sistem atau tata tertib baru..."
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#00152d] focus:bg-white focus:outline-none focus:border-[#006970]"
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-[#00152d] hover:bg-[#006970] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Tambah Catatan Evaluasi
              </button>
            </div>
          </form>

          {/* List of Notes */}
          <div className="space-y-2 max-h-56 overflow-y-auto pt-1">
            {systemNotes.map((note, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#00152d] flex items-start gap-2">
                <span className="text-[#006970] font-bold">•</span>
                <span className="leading-relaxed">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
