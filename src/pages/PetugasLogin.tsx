import React from 'react';
import { useRouter } from '../context/RouterContext';
import { storageService } from '../services/storage';
import { AppLogo } from '../components/AppLogo';

export const PetugasLogin: React.FC = () => {
  const { navigate, switchRole, currentRole } = useRouter();

  const handleSelectRole = (role: 'petugas' | 'pengawas') => {
    switchRole(role);
    if (role === 'petugas') {
      navigate('/petugas');
    } else {
      navigate('/pengawas');
    }
  };

  const handleResetData = () => {
    if (confirm('Kembalikan seluruh data demo ke kondisi awal prototipe?')) {
      storageService.resetDefaults();
      alert('Data demo berhasil direset ke kondisi awal.');
    }
  };

  return (
    <div className="w-full py-6 sm:py-12 px-4 sm:px-8 max-w-4xl mx-auto flex-1 flex flex-col justify-center">
      {/* Explicit Simulation Banner */}
      <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5 sm:gap-3 shadow-xs">
        <span className="material-symbols-outlined text-[22px] sm:text-[24px] text-amber-700 shrink-0 mt-0.5">
          info
        </span>
        <div className="space-y-0.5">
          <p className="text-xs sm:text-sm font-bold">
            Simulasi Tingkat 2: Tidak Ada Autentikasi Nyata & Tanpa Penegakan Hak Akses Server
          </p>
          <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed">
            Halaman ini adalah simulator peran untuk pengujian alur perlindungan santri. Tidak memerlukan kata sandi sungguhan, akun Kemenag, atau kredensial database. Silakan klik tombol peran di bawah untuk menguji alur masing-masing pihak.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 sm:p-12 border border-slate-200 shadow-md space-y-6 sm:space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-slate-200 shadow-sm p-2 flex items-center justify-center mx-auto">
            <AppLogo className="w-full h-full object-contain" />
          </div>
          <h1 className="text-xl sm:text-3xl font-bold text-[#00152d]">
            Portal Penanganan & Pengawasan Santri
          </h1>
          <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
            Pilihlah simulasi peran untuk mengevaluasi alur triase kasus tertutup atau pemantauan kepatuhan maqashid syari'ah.
          </p>
        </div>

        {/* 2 Roles Grid with Distinct Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Peran 1: Petugas Perlindungan */}
          <div className="p-4.5 sm:p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-[#006970] transition-all flex flex-col justify-between space-y-4 sm:space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-[#006970] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">assignment</span>
                </span>
                <span className="text-[11px] font-bold text-[#006970] bg-[#94f1fa]/40 px-2.5 py-0.5 rounded-full uppercase">
                  Pelaksana Kasus
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#00152d]">Petugas Perlindungan</h3>
                <p className="text-xs text-[#006970] font-semibold mt-0.5">Satgas / Tim Triase & Konselor</p>
              </div>
              <ul className="text-xs text-[#44474d] space-y-2 pt-1">
                <li className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#006970] mt-0.5">check</span>
                  <span>Melihat antrean laporan tanpa identitas pelapor.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#006970] mt-0.5">check</span>
                  <span>Verifikasi awal & klasifikasi risiko manual oleh manusia.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#006970] mt-0.5">check</span>
                  <span>Mencatat eskalasi SOP darurat dan pesan publik ke pelapor.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#006970] mt-0.5">check</span>
                  <span>Menulis catatan internal yang tidak pernah bocor ke santri.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectRole('petugas')}
              className="w-full py-3 px-4 rounded-xl bg-[#00152d] hover:bg-[#122a46] text-white text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Masuk sebagai Petugas Perlindungan</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Peran 2: Pengawas / Pengasuh */}
          <div className="p-4.5 sm:p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-[#00152d] transition-all flex flex-col justify-between space-y-4 sm:space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-[#00152d] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">insights</span>
                </span>
                <span className="text-[11px] font-bold text-[#00152d] bg-[#d3e3ff] px-2.5 py-0.5 rounded-full uppercase">
                  Pimpinan & Evaluasi
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#00152d]">Pengawas / Pengasuh</h3>
                <p className="text-xs text-[#00152d] font-semibold mt-0.5">Majelis Pengasuh Kiai & Dewan Pembina</p>
              </div>
              <ul className="text-xs text-[#44474d] space-y-2 pt-1">
                <li className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#00152d] mt-0.5">check</span>
                  <span>Hanya melihat statistik agregat (tanpa isi & kronologi).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#00152d] mt-0.5">check</span>
                  <span>Penerapan privasi agregat ketat: nilai &lt;3 ditampilkan "&lt;3".</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#00152d] mt-0.5">check</span>
                  <span>Pemeriksaan laporan macet (&gt;N hari tanpa update).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#00152d] mt-0.5">check</span>
                  <span>Catatan evaluasi tata tertib & rekomendasi pesantren.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectRole('pengawas')}
              className="w-full py-3 px-4 rounded-xl bg-[#006970] hover:bg-[#004f54] text-white text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Masuk sebagai Pengawas / Pengasuh</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Footer controls: Reset Demo & Back */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-[#44474d]">
          <button
            onClick={() => navigate('/')}
            className="hover:text-[#00152d] font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Kembali ke Halaman Santri (Beranda)</span>
          </button>

          <button
            onClick={handleResetData}
            className="text-slate-500 hover:text-red-700 font-medium flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            <span>Reset Data Simulasi ke Standar Awal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
