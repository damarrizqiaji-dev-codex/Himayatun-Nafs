import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { AppLogo } from './AppLogo';
import { PROTECT_STAGES, ProtectStageKey } from '../types/report';

interface InteractiveFeatureSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveFeatureSidebar: React.FC<InteractiveFeatureSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const { path, navigate, currentRole, switchRole } = useRouter();
  const [activePreviewStage, setActivePreviewStage] = useState<ProtectStageKey>('P');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const stageKeys: ProtectStageKey[] = ['P', 'R', 'O', 'T', 'E', 'C', 'T_FINAL'];

  const navItems = [
    {
      group: 'Layanan Utama Santri',
      items: [
        {
          title: 'Buat Laporan Anonim',
          description: 'Alur 4 langkah pelaporan dengan enkripsi & tanpa log IP',
          icon: 'shield',
          path: '/lapor',
          badge: 'Nol-Log',
        },
        {
          title: 'Lacak Status Tiket',
          description: 'Pantau perkembangan aduan via Kode Tiket Rahasia',
          icon: 'mark_chat_read',
          path: '/lacak',
          badge: 'Anonim',
        },
      ],
    },
    {
      group: 'Pusat Panduan & SOP Khusus',
      items: [
        {
          title: 'Alur Protokol PROTECT',
          description: 'Mekanisme 7-tahap penanganan terstruktur & adil',
          icon: 'account_tree',
          path: '/panduan?tab=protect',
          badge: 'SOP 7-Tahap',
        },
        {
          title: 'Orientasi & Tanya Jawab (FAQ)',
          description: 'Jawaban keraguan santri: nama aman, anti-balas dendam',
          icon: 'help_center',
          path: '/panduan?tab=orientasi',
          badge: 'Edukasi',
        },
        {
          title: 'Kanal Non-Gawai Asrama',
          description: 'Kotak bersegel, Duta Sebaya, dan Poskestren tanpa HP',
          icon: 'inbox',
          path: '/panduan?tab=asrama',
          badge: 'Fisik Asrama',
        },
        {
          title: 'Pilar Nilai Syar\'i',
          description: 'Amanah, Rahmah, Ta\'awun, dan Hifzhun Nafs',
          icon: 'balance',
          path: '/panduan?tab=pilar',
          badge: 'Maqashid',
        },
      ],
    },
    {
      group: 'Integritas & Regulasi',
      items: [
        {
          title: 'Integritas & Tingkat 2',
          description: 'Batasan prototipe, simulasi peran, & pedoman Ditpdpontren',
          icon: 'verified_user',
          path: '/tentang',
          badge: 'Simulasi',
        },
      ],
    },
    {
      group: 'Portal Petugas & Pimpinan',
      items: [
        {
          title: 'Antrean Laporan Petugas',
          description: 'Triase, klasifikasi risiko, pesan & eskalasi kasus',
          icon: 'security',
          path: '/petugas',
          badge: 'Petugas',
        },
        {
          title: 'Monitoring Agregat Pengawas',
          description: 'Statistik agregat privasi & kepatuhan SLA pesantren',
          icon: 'monitoring',
          path: '/pengawas',
          badge: 'Pengawas',
        },
        {
          title: 'Pilihan Masuk / Simulasi Peran',
          description: 'Pilih peran Petugas Perlindungan atau Pengawas Kiai',
          icon: 'switch_account',
          path: '/petugas/masuk',
          badge: 'Tingkat 2',
        },
      ],
    },
  ];

  const handleNavigate = (targetPath: string) => {
    onClose();
    navigate(targetPath);
  };

  const filteredNavItems = navItems.map((group) => ({
    ...group,
    items: group.items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.badge.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#00152d] text-white border-b border-[#122a46] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 p-1 flex items-center justify-center shrink-0">
              <AppLogo className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>Menu Fitur & SOP Pesantren</span>
              </h2>
              <span className="text-[11px] text-[#94f1fa] font-medium block">
                Navigasi Terpisah Ruang Aman Himayatun-Nafs
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Tutup Menu"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search Bar & Role Pill */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 space-y-2.5 shrink-0">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari fitur, panduan SOP, atau modul..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-[#00152d] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006970]/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
              </button>
            )}
          </div>

          {/* Quick Role Switcher Pill */}
          <div className="flex items-center justify-between text-xs px-2 py-1 rounded-xl bg-white border border-slate-200">
            <span className="text-[11px] text-slate-500 font-medium">Peran Aktif:</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-[11px] text-[#006970] uppercase">
                {currentRole === 'publik' ? 'Santri Publik' : currentRole === 'petugas' ? 'Petugas' : 'Pengawas'}
              </span>
              <button
                onClick={() => handleNavigate('/petugas/masuk')}
                className="text-[10px] text-slate-400 hover:text-[#00152d] underline font-semibold cursor-pointer ml-1"
              >
                Ubah
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-5">
          {filteredNavItems.map((group, gIdx) => (
            <div key={gIdx} className="space-y-2">
              <div className="text-[11px] font-bold text-[#006970] uppercase tracking-wider px-1">
                {group.group}
              </div>

              <div className="space-y-1.5">
                {group.items.map((item, iIdx) => {
                  const isActive = path === item.path || (item.path.startsWith('/panduan') && path === '/panduan');
                  return (
                    <button
                      key={iIdx}
                      onClick={() => handleNavigate(item.path)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer group ${
                        isActive
                          ? 'bg-[#eff4ff] border-[#006970] shadow-xs'
                          : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-[#00152d] text-[#94f1fa]'
                            : 'bg-slate-100 text-[#006970] group-hover:bg-[#00152d] group-hover:text-[#94f1fa]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[19px]">
                          {item.icon}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <h4 className="text-xs sm:text-sm font-bold text-[#00152d] truncate group-hover:text-[#006970] transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#44474d] line-clamp-1 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Mini Interactive PROTECT Stage Inspector */}
          <div className="bg-[#eff4ff] rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#00152d] uppercase tracking-wide flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#006970]">account_tree</span>
                Rujukan Cepat Tahapan PROTECT:
              </span>
              <button
                onClick={() => handleNavigate('/panduan?tab=protect')}
                className="text-[11px] text-[#006970] hover:underline font-bold cursor-pointer"
              >
                Buka Penuh →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {stageKeys.map((key) => {
                const stage = PROTECT_STAGES[key];
                const isSelected = activePreviewStage === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActivePreviewStage(key)}
                    className={`py-1 rounded-lg text-center font-bold text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#00152d] text-[#94f1fa] shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {stage.letter}
                  </button>
                );
              })}
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs">
              <strong className="text-[#00152d] block text-xs">
                {PROTECT_STAGES[activePreviewStage].code}: {PROTECT_STAGES[activePreviewStage].name}
              </strong>
              <span className="text-[#44474d] text-[11px] mt-0.5 block leading-snug">
                {PROTECT_STAGES[activePreviewStage].description}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 shrink-0 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#006970]">verified</span>
            <span>SantriVision 2026</span>
          </div>

          <button
            onClick={() => {
              onClose();
              navigate('/');
            }}
            className="text-[#006970] hover:underline font-semibold cursor-pointer"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
};
