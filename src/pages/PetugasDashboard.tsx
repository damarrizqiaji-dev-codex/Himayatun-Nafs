import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { storageService } from '../services/storage';
import { ReportItem, ProtectStageKey, RiskLevel, PROTECT_STAGES } from '../types/report';
import { ProtectVisualGuideModal } from '../components/ProtectVisualGuideModal';

export const PetugasDashboard: React.FC = () => {
  const { navigate } = useRouter();

  const [reports, setReports] = useState<ReportItem[]>([]);
  const [filterStage, setFilterStage] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [filterUrgent, setFilterUrgent] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isProtectGuideOpen, setIsProtectGuideOpen] = useState(false);

  const loadData = () => {
    setReports(storageService.getReports());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('storage_update', loadData);
    return () => window.removeEventListener('storage_update', loadData);
  }, []);

  const filteredReports = reports.filter((item) => {
    if (filterStage !== 'all' && item.currentStage !== filterStage) {
      return false;
    }
    if (filterRisk !== 'all' && item.riskLevel !== filterRisk) {
      return false;
    }
    if (filterUrgent === 'urgent' && !item.isUrgentFromReporter) {
      return false;
    }
    if (filterUrgent === 'normal' && item.isUrgentFromReporter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = item.id.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchLoc = item.macroLocation.toLowerCase().includes(q);
      if (!matchId && !matchCat && !matchLoc) return false;
    }
    return true;
  });

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'darurat':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/30 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-ping"></span>
            Darurat
          </span>
        );
      case 'tinggi':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            Tinggi
          </span>
        );
      case 'sedang':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
            Sedang
          </span>
        );
      case 'ringan':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Ringan
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
            Belum Dinilai
          </span>
        );
    }
  };

  const getStageBadge = (stageKey: ProtectStageKey) => {
    const info = PROTECT_STAGES[stageKey];
    return (
      <span className="px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold bg-[#eff4ff] text-[#00152d] border border-slate-200">
        {info.code}
      </span>
    );
  };

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-8 max-w-7xl mx-auto flex-1 space-y-5 sm:space-y-6">
      {/* Header and Quick Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#122a46] text-[#94f1fa] text-[11px] sm:text-xs font-bold mb-1.5">
            <span className="material-symbols-outlined text-[14px]">shield</span>
            PORTAL PETUGAS PERLINDUNGAN SANTRI
          </div>
          <h1 className="text-xl sm:text-3xl font-bold text-[#00152d]">
            Antrean & Penelaahan Laporan Santri
          </h1>
          <p className="text-xs sm:text-sm text-[#44474d] mt-0.5">
            Seluruh berkas terdaftar tanpa identitas pelapor. Verifikasi dan klasifikasi dilakukan oleh manusia.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setIsProtectGuideOpen(true)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#00152d] text-white hover:bg-[#006970] text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[17px] text-[#94f1fa]">account_tree</span>
            <span>Panduan Visual PROTECT</span>
          </button>

          <button
            onClick={() => navigate('/pengawas')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-[#00152d] hover:bg-slate-50 transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px] text-[#006970]">insights</span>
            <span>Buka Monitoring Pengawas</span>
          </button>
        </div>
      </div>

      {/* Quick metrics summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] sm:text-xs text-[#44474d] block">Total Antrean</span>
          <span className="text-xl sm:text-2xl font-bold text-[#00152d] mt-0.5 block font-mono">{reports.length}</span>
          <span className="text-[10px] sm:text-[11px] text-[#006970]">Anonim Terenkripsi</span>
        </div>
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] sm:text-xs text-[#44474d] block">Tanda Mendesak</span>
          <span className="text-xl sm:text-2xl font-bold text-[#ba1a1a] mt-0.5 block font-mono">
            {reports.filter((r) => r.isUrgentFromReporter).length}
          </span>
          <span className="text-[10px] sm:text-[11px] text-[#ba1a1a]">Perlu Atensi Utama</span>
        </div>
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] sm:text-xs text-[#44474d] block">Tinggi / Darurat</span>
          <span className="text-xl sm:text-2xl font-bold text-amber-600 mt-0.5 block font-mono">
            {reports.filter((r) => r.riskLevel === 'tinggi' || r.riskLevel === 'darurat').length}
          </span>
          <span className="text-[10px] sm:text-[11px] text-amber-700">Dalam Penanganan SOP</span>
        </div>
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] sm:text-xs text-[#44474d] block">Perlu Telaah</span>
          <span className="text-xl sm:text-2xl font-bold text-[#006970] mt-0.5 block font-mono">
            {reports.filter((r) => r.riskLevel === 'belum_ditentukan' || r.verification.perluKlarifikasi).length}
          </span>
          <span className="text-[10px] sm:text-[11px] text-slate-500">Telaah Manusia</span>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-2.5 items-center">
          {/* Search */}
          <div className="sm:col-span-2 md:col-span-5 relative flex items-center">
            <span className="material-symbols-outlined text-slate-400 absolute left-3 text-[18px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kode tiket, kategori, lokasi..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#00152d] focus:bg-white focus:outline-none focus:border-[#006970]"
            />
          </div>

          {/* Filter Tahap */}
          <div className="md:col-span-3">
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#00152d] focus:bg-white focus:outline-none focus:border-[#006970]"
            >
              <option value="all">Semua Tahap PROTECT</option>
              <option value="P">[P] Tahap 1 - Pelaporan Anonim</option>
              <option value="R">[R] Tahap 2 - Review Objektif</option>
              <option value="O">[O] Tahap 3 - Organisasi Risiko</option>
              <option value="T">[T] Tahap 4 - Tindakan Terarah</option>
              <option value="E">[E] Tahap 5 - Empati & Pulih</option>
              <option value="C">[C] Tahap 6 - Continuity Monitor</option>
              <option value="T_FINAL">[T] Tahap 7 - Tuntas & Evaluasi</option>
            </select>
          </div>

          {/* Filter Risiko */}
          <div className="md:col-span-2">
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#00152d] focus:bg-white focus:outline-none focus:border-[#006970]"
            >
              <option value="all">Semua Risiko</option>
              <option value="belum_ditentukan">Belum Ditentukan</option>
              <option value="ringan">Ringan</option>
              <option value="sedang">Sedang</option>
              <option value="tinggi">Tinggi</option>
              <option value="darurat">Darurat</option>
            </select>
          </div>

          {/* Filter Mendesak */}
          <div className="md:col-span-2">
            <select
              value={filterUrgent}
              onChange={(e) => setFilterUrgent(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#00152d] focus:bg-white focus:outline-none focus:border-[#006970]"
            >
              <option value="all">Semua Status</option>
              <option value="urgent">Mendesak Saja</option>
              <option value="normal">Terkendali Saja</option>
            </select>
          </div>
        </div>
      </div>

      {/* QUEUE LIST */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-3.5 sm:p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-1 text-xs font-semibold text-[#44474d]">
          <span>Menampilkan {filteredReports.length} dari {reports.length} laporan</span>
          <span className="text-[#006970] font-bold flex items-center gap-1 text-[11px] sm:text-xs">
            <span className="material-symbols-outlined text-[13px]">lock</span>
            Privasi Zero-Identity Aktif
          </span>
        </div>

        {filteredReports.length === 0 ? (
          <div className="p-10 text-center text-slate-400 space-y-2">
            <span className="material-symbols-outlined text-[32px]">filter_list_off</span>
            <p className="text-sm font-semibold text-[#00152d]">Tidak ada laporan yang sesuai dengan filter.</p>
            <p className="text-xs">Coba ubah opsi filter atau kata kunci pencarian Anda.</p>
          </div>
        ) : (
          <>
            {/* MOBILE CARD VIEW (< md screens) - Never cuts off! */}
            <div className="md:hidden divide-y divide-slate-100">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => navigate(`/petugas/laporan/${report.id}`)}
                  className="p-4 hover:bg-[#eff4ff]/60 transition-colors cursor-pointer space-y-2.5 active:bg-[#eff4ff]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-xs text-[#00152d]">
                      {report.id}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {report.isUrgentFromReporter && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ffdad6] text-[#ba1a1a]">
                          Mendesak
                        </span>
                      )}
                      {getRiskBadge(report.riskLevel)}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#00152d] leading-snug">
                      {report.category}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px] text-slate-400">location_on</span>
                        {report.macroLocation}
                      </span>
                      <span>•</span>
                      <span>{report.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>{getStageBadge(report.currentStage)}</div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/petugas/laporan/${report.id}`);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#00152d] text-white text-[11px] font-semibold flex items-center gap-1"
                    >
                      <span>Detail</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP TABLE VIEW (>= md screens) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-white text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3 px-4">Kode Tiket</th>
                    <th className="py-3 px-4">Kategori Masalah</th>
                    <th className="py-3 px-4">Tahap PROTECT</th>
                    <th className="py-3 px-4">Klasifikasi Risiko</th>
                    <th className="py-3 px-4 text-center">Tanda Mendesak</th>
                    <th className="py-3 px-4">Waktu Registrasi</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-[#00152d]">
                  {filteredReports.map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-[#eff4ff]/60 transition-colors cursor-pointer group"
                      onClick={() => navigate(`/petugas/laporan/${report.id}`)}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-[#00152d] group-hover:text-[#006970]">
                        {report.id}
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="font-semibold text-[#00152d] truncate" title={report.category}>
                          {report.category}
                        </p>
                        <span className="text-[11px] text-[#44474d] flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[13px] text-slate-400">location_on</span>
                          {report.macroLocation}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getStageBadge(report.currentStage)}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getRiskBadge(report.riskLevel)}
                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {report.isUrgentFromReporter ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#ffdad6] text-[#ba1a1a]">
                            <span className="material-symbols-outlined text-[13px]">priority_high</span>
                            Mendesak
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium">Biasa</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                        {report.createdAt}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/petugas/laporan/${report.id}`);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#00152d] hover:bg-[#006970] text-white font-semibold text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Buka Detail</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* PANDUAN VISUAL SOP MODAL */}
      <ProtectVisualGuideModal
        isOpen={isProtectGuideOpen}
        onClose={() => setIsProtectGuideOpen(false)}
      />
    </div>
  );
};
