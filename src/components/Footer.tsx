import React from 'react';
import { useRouter } from '../context/RouterContext';
import { AppLogo } from './AppLogo';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <footer className="w-full bg-[#0b1c30] text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 mb-8 sm:mb-12">
          {/* Brand & Reference */}
          <div className="space-y-3.5 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-xs">
                <AppLogo className="w-full h-full object-contain" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Himayatun-Nafs</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sistem perlindungan santri terpadu dengan standar kerahasiaan ketat, menghormati hak asasi santri dan nilai etika Islam pesantren Indonesia.
            </p>
            <div className="p-3 rounded-xl bg-[#122a46]/60 border border-slate-700/60">
              <p className="text-[11px] text-[#94f1fa] uppercase tracking-wider font-bold">Kerangka Regulasi</p>
              <p className="text-xs text-slate-300 mt-0.5">SOP Himayatul Awlad & Pedoman Ditpdpontren Ditjen Pendis Kementerian Agama RI</p>
            </div>
          </div>

          {/* Pilar Syar'i */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Pilar Nilai Syar'i</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-1.5"><strong className="text-slate-200">Amanah:</strong> Kerahasiaan data santri dijaga mutlak.</li>
              <li className="flex items-start gap-1.5"><strong className="text-slate-200">Rahmah:</strong> Welas asih tanpa stigma & perundungan.</li>
              <li className="flex items-start gap-1.5"><strong className="text-slate-200">Ta'awun:</strong> Tolong-menolong dalam keadilan santun.</li>
              <li className="flex items-start gap-1.5"><strong className="text-slate-200">Himayatun-Nafs:</strong> Memelihara keselamatan jiwa santri.</li>
            </ul>
          </div>

          {/* Alternative Channels */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Kanal Non-Gadget Pesantren</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Untuk santri atau wali santri tanpa perangkat telepon:</p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-[#94f1fa]">mail</span>
                <span>Kotak Aman Fisik Perpustakaan/Poskestren</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-[#94f1fa]">support_agent</span>
                <span>Hotline Darurat Santri: 0800-1-SANTRI (Bebas Pulsa)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px] text-[#94f1fa]">volunteer_activism</span>
                <span>Konselor Sebaya Asrama Putri & Putra</span>
              </li>
            </ul>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Akses Terpadu</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => {
                      document.getElementById('alur-protect')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="hover:text-[#94f1fa] transition-colors cursor-pointer text-left"
                >
                  Panduan & Standar Alur PROTECT
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/lapor')} className="hover:text-[#94f1fa] transition-colors cursor-pointer text-left">
                  Formulir Pelaporan Terenkripsi
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/lacak')} className="hover:text-[#94f1fa] transition-colors cursor-pointer text-left">
                  Lacak Status Tiket Kasus
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tentang')} className="hover:text-[#94f1fa] transition-colors cursor-pointer text-left">
                  Protokol Keamanan & Tingkat 2 Simulasi
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/petugas/masuk')} className="hover:text-[#94f1fa] transition-colors cursor-pointer text-left font-semibold text-slate-200">
                  Portal Petugas & Pengawas (Simulasi)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="text-center md:text-left">
            Prototipe Konseptual SantriVision 2026 — Data kasus sintetis & simulasi peran Tingkat 2 (tanpa server auth) untuk kemaslahatan santri Indonesia.
          </p>
          <p className="font-semibold text-slate-300">© 2026 Himayatun-Nafs. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};
