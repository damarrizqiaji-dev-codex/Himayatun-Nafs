import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { AppLogo } from './AppLogo';

export const Navbar: React.FC = () => {
  const { path, navigate, currentRole, switchRole } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isStaffMode = path.startsWith('/petugas') || path.startsWith('/pengawas');

  const handlePanicEscape = () => {
    window.location.replace('https://kemenag.go.id');
  };

  const handleNavClick = (targetPath: string) => {
    setMobileMenuOpen(false);
    navigate(targetPath);
  };

  const handleScrollTo = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (path !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Institutional Trust Bar */}
      <div className="w-full bg-[#0b1c30] text-[#f8f9ff] border-b border-[#122a46] text-xs py-1.5 px-3 sm:px-6 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#122a46] text-[#94f1fa] font-semibold text-[10px] sm:text-[11px] tracking-wide border border-[#94f1fa]/20 shrink-0">
              <span className="material-symbols-outlined text-[12px] sm:text-[14px] text-[#94f1fa]">verified_user</span>
              SantriVision 2026
            </span>
            <span className="truncate text-slate-300 hidden xs:inline">
              Nol-Log IP Aktif
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-slate-300 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px]">
              <span className="material-symbols-outlined text-[13px] text-[#94f1fa]">lock</span>
              Enkripsi End-to-End
            </span>
            <button
              onClick={handlePanicEscape}
              className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#ba1a1a] hover:bg-red-700 text-white font-semibold transition-all shadow-sm cursor-pointer text-[10px] sm:text-xs"
              title="Langsung beralih ke portal Kemenag untuk privasi seketika"
              type="button"
            >
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">visibility_off</span>
              <span>Tutup Cepat (Esc)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mode Indicator Banner if on Staff / Officer Routes */}
      {isStaffMode && (
        <div className="w-full bg-[#eff4ff] border-b border-[#94f1fa]/40 py-2 px-3 sm:px-6 text-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[#0b1c30]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#122a46] text-white font-semibold text-[11px]">
                <span className="material-symbols-outlined text-[13px] text-[#94f1fa]">admin_panel_settings</span>
                {currentRole === 'pengawas' ? 'MODE: PENGAWAS / PENGASUH' : 'MODE: PETUGAS PERLINDUNGAN'}
              </span>
              <span className="text-[#006970] text-[11px] font-medium">
                Tingkat 2 (Simulasi Peran)
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <button
                onClick={() => handleNavClick('/petugas/masuk')}
                className="text-[#006970] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">swap_horiz</span>
                Ganti Peran
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => {
                  switchRole('publik');
                  handleNavClick('/');
                }}
                className="text-slate-600 hover:text-[#00152d] font-semibold flex items-center gap-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">arrow_back</span>
                Kembali ke Santri
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Header Bar */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_2px_12px_rgba(11,28,48,0.04)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Identity */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2 sm:gap-3 shrink-0 group text-left cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center p-1 sm:p-1.5 shrink-0 group-hover:border-[#006970] transition-all">
              <AppLogo className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-[#00152d] tracking-tight leading-tight group-hover:text-[#006970] transition-colors">
                Himayatun-Nafs
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#006970] tracking-wider uppercase font-semibold">
                Ruang Aman Santri
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-semibold">
            {isStaffMode ? (
              <>
                <button
                  onClick={() => handleNavClick('/petugas')}
                  className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                    path === '/petugas' || path.startsWith('/petugas/laporan')
                      ? 'bg-[#eff4ff] text-[#00152d] font-bold border border-[#94f1fa]/40'
                      : 'text-[#44474d] hover:text-[#00152d] hover:bg-[#f8f9ff]'
                  }`}
                >
                  Antrean Laporan (Petugas)
                </button>
                <button
                  onClick={() => handleNavClick('/pengawas')}
                  className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                    path === '/pengawas'
                      ? 'bg-[#eff4ff] text-[#00152d] font-bold border border-[#94f1fa]/40'
                      : 'text-[#44474d] hover:text-[#00152d] hover:bg-[#f8f9ff]'
                  }`}
                >
                  Monitoring Agregat (Pengawas)
                </button>
                <button
                  onClick={() => handleNavClick('/tentang')}
                  className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                    path === '/tentang'
                      ? 'bg-[#eff4ff] text-[#00152d] font-bold'
                      : 'text-[#44474d] hover:text-[#00152d] hover:bg-[#f8f9ff]'
                  }`}
                >
                  Tentang & Simulasi Tingkat 2
                </button>
                <button
                  onClick={() => handleNavClick('/lacak')}
                  className="px-3.5 py-2 rounded-lg text-[#44474d] hover:text-[#00152d] hover:bg-[#f8f9ff] transition-colors cursor-pointer"
                >
                  Cek Sisi Santri (/lacak)
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('/')}
                  className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    path === '/' ? 'bg-[#e5eeff] text-[#00152d] font-bold' : 'text-[#44474d] hover:text-[#00152d] hover:bg-[#eff4ff]'
                  }`}
                >
                  Beranda
                </button>
                <button
                  onClick={() => handleNavClick('/panduan?tab=protect')}
                  className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    path.includes('panduan') && (!queryParams.tab || queryParams.tab === 'protect')
                      ? 'bg-[#e5eeff] text-[#00152d] font-bold'
                      : 'text-[#44474d] hover:text-[#00152d] hover:bg-[#eff4ff]'
                  }`}
                >
                  Panduan PROTECT
                </button>
                <button
                  onClick={() => handleNavClick('/panduan?tab=orientasi')}
                  className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    path.includes('panduan') && queryParams.tab === 'orientasi'
                      ? 'bg-[#e5eeff] text-[#00152d] font-bold'
                      : 'text-[#44474d] hover:text-[#00152d] hover:bg-[#eff4ff]'
                  }`}
                >
                  Orientasi Santri
                </button>
                <button
                  onClick={() => handleNavClick('/panduan?tab=asrama')}
                  className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    path.includes('panduan') && queryParams.tab === 'asrama'
                      ? 'bg-[#e5eeff] text-[#00152d] font-bold'
                      : 'text-[#44474d] hover:text-[#00152d] hover:bg-[#eff4ff]'
                  }`}
                >
                  Kanal Asrama
                </button>
                <button
                  onClick={() => handleNavClick('/lacak')}
                  className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    path === '/lacak' ? 'bg-[#e5eeff] text-[#00152d] font-bold' : 'text-[#44474d] hover:text-[#00152d] hover:bg-[#eff4ff]'
                  }`}
                >
                  Lacak Status
                </button>
                <button
                  onClick={() => handleNavClick('/tentang')}
                  className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    path === '/tentang' ? 'bg-[#e5eeff] text-[#00152d] font-bold' : 'text-[#44474d] hover:text-[#00152d] hover:bg-[#eff4ff]'
                  }`}
                >
                  Tentang
                </button>
              </>
            )}
          </nav>

          {/* Action CTAs & Mobile Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Portal Petugas Link (Desktop & Tablet) */}
            <button
              onClick={() => handleNavClick('/petugas/masuk')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                isStaffMode
                  ? 'bg-[#122a46] text-white border-[#122a46] shadow-sm'
                  : 'text-[#0b1c30] hover:text-[#00152d] hover:bg-[#eff4ff] border-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[17px] text-[#006970]">admin_panel_settings</span>
              <span>Portal Petugas</span>
            </button>

            {/* Buat Laporan Button */}
            <button
              onClick={() => handleNavClick('/lapor')}
              className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#006970] text-white hover:bg-[#00152d] transition-all shadow-sm cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[16px] sm:text-[18px]">lock</span>
              <span className="hidden xs:inline">Buat Laporan</span>
              <span className="xs:hidden">Lapor</span>
            </button>

            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-[#00152d] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Buka menu navigasi"
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 shadow-lg animate-in fade-in duration-200">
            <div className="grid grid-cols-1 gap-1 text-sm font-semibold">
              {isStaffMode ? (
                <>
                  <button
                    onClick={() => handleNavClick('/petugas')}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                      path === '/petugas' || path.startsWith('/petugas/laporan')
                        ? 'bg-[#eff4ff] text-[#00152d] font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Antrean Laporan (Petugas)</span>
                    <span className="material-symbols-outlined text-[18px] text-[#006970]">table_rows</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/pengawas')}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                      path === '/pengawas' ? 'bg-[#eff4ff] text-[#00152d] font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Monitoring Agregat (Pengawas)</span>
                    <span className="material-symbols-outlined text-[18px] text-[#006970]">insights</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/tentang')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>Tentang & Regulasi Tingkat 2</span>
                    <span className="material-symbols-outlined text-[18px] text-slate-400">info</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/lacak')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>Cek Sisi Santri (/lacak)</span>
                    <span className="material-symbols-outlined text-[18px] text-slate-400">visibility</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavClick('/')}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                      path === '/' ? 'bg-[#eff4ff] text-[#00152d] font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Beranda Utama</span>
                    <span className="material-symbols-outlined text-[18px] text-[#006970]">home</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/panduan?tab=protect')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>Panduan & Alur PROTECT</span>
                    <span className="material-symbols-outlined text-[18px] text-[#006970]">account_tree</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/panduan?tab=orientasi')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>Orientasi Santri Baru & FAQ</span>
                    <span className="material-symbols-outlined text-[18px] text-[#006970]">help_center</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/panduan?tab=asrama')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>Kanal Asrama Non-Gawai</span>
                    <span className="material-symbols-outlined text-[18px] text-[#006970]">inbox</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/lacak')}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                      path === '/lacak' ? 'bg-[#eff4ff] text-[#00152d] font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Lacak Status Tiket</span>
                    <span className="material-symbols-outlined text-[18px] text-[#006970]">search</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/panduan?tab=pilar')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>Empat Pilar Nilai Syar'i</span>
                    <span className="material-symbols-outlined text-[18px] text-[#006970]">balance</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/tentang')}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                      path === '/tentang' ? 'bg-[#eff4ff] text-[#00152d] font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Tentang & Transparansi Privasi</span>
                    <span className="material-symbols-outlined text-[18px] text-slate-400">info</span>
                  </button>
                </>
              )}

              {/* Special mobile button for Portal Petugas */}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => handleNavClick('/petugas/masuk')}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#00152d] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#006970]">admin_panel_settings</span>
                  <span>Masuk Portal Petugas / Pengawas (Simulasi)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
