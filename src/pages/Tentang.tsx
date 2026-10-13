import React from 'react';
import { useRouter } from '../context/RouterContext';

export const Tentang: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="w-full py-6 sm:py-12 px-4 sm:px-8 max-w-4xl mx-auto flex-1 space-y-6 sm:space-y-10">
      {/* Header */}
      <div className="space-y-2.5 sm:space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#122a46] text-[#94f1fa] text-[11px] sm:text-xs font-bold">
          <span className="material-symbols-outlined text-[14px]">verified_user</span>
          DOKUMEN INTEGRITAS & BATASAN SISTEM
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#00152d] tracking-tight break-words">
          Tentang Himayatun-Nafs & Protokol SantriVision 2026
        </h1>
        <p className="text-xs sm:text-base text-[#44474d] leading-relaxed">
          Penjelasan komprehensif mengenai batasan prototipe, landasan syar'i maqashid syari'ah, minimisasi data, serta arsitektur simulasi peran Tingkat 2.
        </p>
      </div>

      {/* PROMINENT TINGKAT 2 CLASSIFICATION BANNER */}
      <div className="p-4 sm:p-6 rounded-3xl bg-amber-50 border-2 border-amber-200 text-amber-950 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="material-symbols-outlined text-[24px] sm:text-[26px] text-amber-700 shrink-0">warning</span>
          <h2 className="text-sm sm:text-lg font-bold leading-snug">
            Klasifikasi Implementasi: Tingkat 2 (Simulasi Peran Interaktif)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          Sesuai dengan ketentuan perancangan sistem prototipe:
        </p>
        <ul className="text-xs sm:text-sm text-amber-900 list-disc pl-5 space-y-1.5 leading-relaxed">
          <li>
            <strong>Halaman Petugas (/petugas & /petugas/laporan/:id) dan Pengawas (/pengawas):</strong> Ditetapkan sebagai <strong>Tingkat 2 (Simulasi Peran)</strong>.
          </li>
          <li>
            <strong>Tidak Ada Hak Akses yang Ditegakkan Server (No Server-Enforced RBAC):</strong> Perpindahan peran ("Petugas Perlindungan" atau "Pengawas/Pengasuh") dilakukan melalui tombol simulasi di halaman <code>/petugas/masuk</code>, bukan melalui autentikasi kata sandi server atau sistem SSO riil.
          </li>
          <li>
            <strong>Tujuan Desain:</strong> Menunjukkan secara utuh bagaimana tata kelola proteksi berjenjang, privasi agregat (&lt;3), alur verifikasi checklist, klasifikasi risiko manual manusia, dan eskalasi SOP dapat diterapkan secara etis dan manusiawi di lingkungan pesantren Indonesia.
          </li>
        </ul>
      </div>

      {/* 4 Pilar Syar'i Details */}
      <div className="bg-white rounded-3xl p-4.5 sm:p-8 border border-slate-200 shadow-sm space-y-5 sm:space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-[#00152d] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006970]">balance</span>
          Empat Pilar Syar'i (Maqashid Syari'ah)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-[#00152d] block text-sm">1. Amanah (Custodial Accountability)</span>
            <p className="text-[#44474d] leading-relaxed text-xs">
              Kerahasiaan data pelapor dijaga mutlak. Berkas disegel anonim tanpa merekam alamat IP atau nama asli santri. Petugas mengemban amanah suci demi menjaga kemaslahatan santri.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-[#00152d] block text-sm">2. Rahmah (Unconditional Compassion)</span>
            <p className="text-[#44474d] leading-relaxed text-xs">
              Pendekatan welas asih murni tanpa stigmatisasi, penghakiman moral, atau pemojokan korban. Santri yang bersuara didampingi dengan kehangatan ukhuwah.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-[#00152d] block text-sm">3. Ta'awun (Mutual Cooperation)</span>
            <p className="text-[#44474d] leading-relaxed text-xs">
              Sinergi gotong royong antara santri sebaya, asatidz pembina, dan poskestren untuk menyelesaikan persoalan asrama secara santun tanpa perpecahan kelompok.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-[#00152d] block text-sm">4. Himayatun-Nafs & Hifzhul 'Irdh</span>
            <p className="text-[#44474d] leading-relaxed text-xs">
              Menjaga jiwa raga (*Hifzhun Nafs*) dan menjaga martabat kehormatan santri (*Hifzhul 'Irdh*). Keselamatan jiwa santri merupakan hukum tertinggi di pondok pesantren.
            </p>
          </div>
        </div>
      </div>

      {/* Alur PROTECT 7-Tahap */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-[#00152d] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006970]">account_tree</span>
          Protokol 7-Tahap PROTECT
        </h2>
        <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
          Setiap aduan diproses mengikuti tahapan berjenjang standar yang dirancang untuk mencegah keputusan sepihak:
        </p>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-[#00152d] text-white font-bold flex items-center justify-center flex-shrink-0">P</span>
            <div>
              <strong className="text-[#00152d] block">Tahap 1: Pelaporan Anonim</strong>
              <span className="text-[#44474d]">Santri menulis kronologi bebas tanpa akun dan mendapatkan tiket 16-karakter.</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-[#00152d] text-white font-bold flex items-center justify-center flex-shrink-0">R</span>
            <div>
              <strong className="text-[#00152d] block">Tahap 2: Review Objektif</strong>
              <span className="text-[#44474d]">Penelaahan checklist awal oleh verifikator satgas tanpa asumsi negatif.</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-[#00152d] text-white font-bold flex items-center justify-center flex-shrink-0">O</span>
            <div>
              <strong className="text-[#00152d] block">Tahap 3: Organisasi Risiko</strong>
              <span className="text-[#44474d]">Penetapan triase risiko oleh manusia (Ringan, Sedang, Tinggi, Darurat) dengan alasan tertulis.</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-[#006970] text-white font-bold flex items-center justify-center flex-shrink-0">T</span>
            <div>
              <strong className="text-[#00152d] block">Tahap 4: Tindakan Terarah</strong>
              <span className="text-[#44474d]">Langkah protektif santun: pemisahan kontak, patroli senyap, atau eskalasi SOP darurat.</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-[#00152d] text-white font-bold flex items-center justify-center flex-shrink-0">E</span>
            <div>
              <strong className="text-[#00152d] block">Tahap 5: Empati & Pulih</strong>
              <span className="text-[#44474d]">Pendampingan konseling sebaya, dukungan emosional, dan pemulihan kesehatan santri.</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-[#00152d] text-white font-bold flex items-center justify-center flex-shrink-0">C</span>
            <div>
              <strong className="text-[#00152d] block">Tahap 6: Continuity Monitor</strong>
              <span className="text-[#44474d]">Pemantauan iklim kamar asrama selama 14-30 hari demi mencegah diskriminasi ulang.</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-[#122a46] text-[#94f1fa] font-bold flex items-center justify-center flex-shrink-0">T</span>
            <div>
              <strong className="text-[#00152d] block">Tahap 7: Tuntas & Evaluasi</strong>
              <span className="text-[#44474d]">Penutupan berkas resmi dan laporan evaluasi tata tertib pondok kepada Majelis Pengasuh.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button to Portal Masuk */}
      <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          onClick={() => navigate('/')}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer text-center"
        >
          Kembali ke Beranda
        </button>

        <button
          onClick={() => navigate('/petugas/masuk')}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#00152d] hover:bg-[#006970] text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
          <span>Buka Portal Simulasi Petugas & Pengawas</span>
        </button>
      </div>
    </div>
  );
};
