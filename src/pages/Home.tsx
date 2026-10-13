import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { AppLogo } from '../components/AppLogo';

export const Home: React.FC = () => {
  const { navigate } = useRouter();
  const [quickCode] = useState('HN-2026-8942-AMN');
  const [quickInput, setQuickInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [highlightResult, setHighlightResult] = useState(false);

  const copyDemoCode = () => {
    navigator.clipboard.writeText(quickCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const simulateCheck = () => {
    setHighlightResult(true);
    setTimeout(() => setHighlightResult(false), 700);
  };

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickInput.trim()) {
      navigate(`/lacak?kode=${encodeURIComponent(quickInput.trim().toUpperCase())}`);
    } else {
      simulateCheck();
      document.getElementById('lacak-modul')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-white via-[#eff4ff]/50 to-[#f8f9ff] pt-6 sm:pt-10 pb-12 sm:pb-16 border-b border-slate-200/60 overflow-hidden">
        <div className="absolute -top-24 right-0 w-[300px] sm:w-[540px] h-[300px] sm:h-[540px] bg-[#94f1fa]/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute top-72 -left-20 w-[240px] sm:w-[420px] h-[240px] sm:h-[420px] bg-[#d3e3ff]/30 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start gap-4 sm:gap-5">
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-xs px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[#00152d] max-w-full">
                <AppLogo className="w-4 h-4 shrink-0" />
                <span className="text-[11px] sm:text-xs tracking-wide font-bold text-[#00152d] truncate">HIMAYATUN-NAFS</span>
                <span className="text-slate-300">|</span>
                <span className="text-[11px] sm:text-xs text-[#006970] font-semibold shrink-0">Ruang Aman Santri</span>
              </div>

              <h1 className="text-[1.85rem] sm:text-[2.5rem] lg:text-[3.25rem] text-[#00152d] tracking-tight leading-[1.2] font-extrabold break-words">
                Ruang Aman Santri:<br />
                <span className="text-[#006970] font-bold">Bersuara Tanpa Takut,</span><br />
                <span className="text-[#00152d] font-bold">Martabat Terjaga.</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-[#44474d] max-w-2xl leading-relaxed">
                Platform pendampingan santri terpadu berlandaskan nilai syar'i <strong className="text-[#00152d] font-semibold">Amanah</strong> dan <strong className="text-[#00152d] font-semibold">Rahmah</strong>. Melindungi santri dari perundungan, kekerasan fisik, intimidasi, maupun tekanan batin tanpa risiko terbongkarnya identitas pelapor.
              </p>

              {/* Reassurance Strip */}
              <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-sm flex items-start sm:items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#94f1fa]/50 text-[#006970] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                  <span className="material-symbols-outlined text-[20px] sm:text-[24px]">verified</span>
                </div>
                <div className="text-xs sm:text-sm text-[#44474d] leading-snug">
                  <strong className="text-[#00152d] font-semibold block">Terikat Sumpah Kerahasiaan & Tanpa Rekam IP:</strong>
                  Anda tidak diwajibkan menyertakan nama asli, kamar, asrama, nomor HP, ataupun akun apapun.
                </div>
              </div>

              {/* Primary CTAs & Fast Tracker */}
              <div className="w-full flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                <button
                  onClick={() => navigate('/lapor')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00152d] text-white hover:bg-[#122a46] px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-[#00152d]/20 group cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-[#94f1fa] group-hover:scale-110 transition-transform">shield</span>
                  <span>Mulai Laporan Anonim</span>
                  <span className="material-symbols-outlined text-[16px] sm:text-[18px]">arrow_forward</span>
                </button>

                <form
                  onSubmit={handleQuickTrack}
                  className="flex-1 flex items-center bg-white border border-slate-200 rounded-xl shadow-sm p-1.5 focus-within:border-[#006970] focus-within:ring-2 focus-within:ring-[#006970]/20 transition-all"
                >
                  <span className="material-symbols-outlined text-[#74777e] ml-2 text-[18px] shrink-0">search</span>
                  <input
                    className="w-full min-w-0 px-2 py-1.5 bg-transparent font-mono text-xs sm:text-sm text-[#00152d] uppercase placeholder:normal-case placeholder:font-sans placeholder:text-[#74777e] focus:outline-none"
                    placeholder="Kode Tiket (mis: HN-8942-AMN)"
                    type="text"
                    value={quickInput}
                    onChange={(e) => setQuickInput(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-[#006970] hover:bg-[#00152d] text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0"
                  >
                    Lacak
                  </button>
                </form>
              </div>

              {/* Quick Credibility Badges */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-1 text-xs text-[#44474d]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#006970] text-[15px]">schedule</span>
                  <span>Respon &lt; 24 Jam</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#006970] text-[15px]">psychology</span>
                  <span>Konselor Santri</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#006970] text-[15px]">fingerprint</span>
                  <span>Zero Knowledge</span>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5 relative w-full">
              <div className="relative bg-white border border-slate-200 rounded-3xl p-3 shadow-xl shadow-slate-200/50">
                <div className="relative h-60 sm:h-80 w-full rounded-2xl overflow-hidden shadow-inner">
                  <img
                    className="w-full h-full object-cover"
                    alt="Pondok Pesantren Sanctuary"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG8OZLsRQduR24jbcRZmDUp-RosvWS77PiT1OztnJISpVO8-DgnM0RJUxjwsXpForcfqgtR57rif5p9tEqORXCD558HVmxFajmdWpWvVTHUMK8ZSssz3mwLCEJC73Co1K9iEKxTv6ncB8-FT7zC06lXY0jo7feG3dpfItsfNpBFjmKO_skZhjoAjpDZu-M1WBh557DUs_tSyTfWSrLUHBOYhoe2BuiqURHCnxf-69uAnFhH1DMQ2mA"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00152d]/85 via-[#00152d]/20 to-transparent"></div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-white/60 shadow-lg flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#00152d] text-[#94f1fa] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px] sm:text-[20px]">health_and_safety</span>
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold text-[#00152d] block leading-tight truncate">Posko Perlindungan 24 Jam</span>
                        <span className="text-[10px] sm:text-[11px] text-[#44474d] truncate block">Sumpah Kerahasiaan</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] sm:text-[11px] font-semibold border border-emerald-200 shrink-0">
                      Siaga
                    </span>
                  </div>
                </div>

                {/* 3-Step Simple Flow */}
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-[#eff4ff] rounded-2xl border border-slate-200/70">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#00152d] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#006970] text-[16px]">touch_app</span>
                      Panduan Cepat Santri Baru (3 Langkah)
                    </span>
                    <span className="text-[11px] text-[#006970] font-medium hidden xs:inline">Tenang</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                      <span className="w-5 h-5 rounded-full bg-[#006970] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <div>
                        <strong className="text-[#00152d] font-semibold block text-xs">Pilih & Ceritakan Peristiwa</strong>
                        <span className="text-[#44474d] text-[11px] leading-tight block">Tanpa nama, nomor HP, atau kamar tidur. 100% anonim.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                      <span className="w-5 h-5 rounded-full bg-[#006970] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <div>
                        <strong className="text-[#00152d] font-semibold block text-xs">Dapatkan Kode Tiket Rahasia</strong>
                        <span className="text-[#44474d] text-[11px] leading-tight block">Simpan kode unik (misal: HN-8942-AMN) sebagai bukti pantau.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                      <span className="w-5 h-5 rounded-full bg-[#006970] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <div>
                        <strong className="text-[#00152d] font-semibold block text-xs">Pantau Respon & Dampingi</strong>
                        <span className="text-[#44474d] text-[11px] leading-tight block">Satgas menindaklanjuti secara santun tanpa konfrontasi terbuka.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Status Tracker Module */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-4 sm:-mt-6 mb-12 sm:mb-16 relative z-20 w-full" id="lacak-modul">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/70 p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
            <div className="lg:col-span-5 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-[#006970]">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">mark_chat_read</span>
                <span className="text-xs tracking-wider uppercase font-bold">Simulasi Cek Tiket Real-Time</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#00152d]">Sudah Memiliki Kode Tiket Pelaporan?</h2>
              <p className="text-xs sm:text-sm text-[#44474d]">
                Gunakan kode tiket rahasia untuk memantau status penanganan kasus Anda tanpa perlu login akun atau verifikasi nomor handphone.
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 bg-[#eff4ff] p-2 sm:p-2.5 rounded-2xl border border-slate-200/70">
              <div className="flex-1 w-full flex items-center bg-white rounded-xl px-3 py-2 sm:py-2.5 shadow-sm border border-slate-200 min-w-0">
                <span className="material-symbols-outlined text-[#74777e] mr-2 text-[18px] sm:text-[20px] shrink-0">vpn_key</span>
                <input
                  className="w-full bg-transparent font-mono text-xs sm:text-sm font-semibold text-[#00152d] uppercase focus:outline-none truncate"
                  readOnly
                  type="text"
                  value={quickCode}
                />
                <button
                  className="text-[#44474d] hover:text-[#006970] p-1 flex items-center transition-colors cursor-pointer shrink-0"
                  onClick={copyDemoCode}
                  title="Salin Kode Contoh"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>
              <button
                className="w-full sm:w-auto bg-[#00152d] text-white hover:bg-[#122a46] text-xs sm:text-sm font-semibold px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                onClick={() => navigate(`/lacak?kode=${quickCode}`)}
                type="button"
              >
                <span>Periksa Status</span>
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Quick Track Result Drawer */}
          <div
            className={`mt-4 sm:mt-6 p-3.5 sm:p-5 bg-[#eff4ff] rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 transition-all ${
              highlightResult ? 'ring-2 ring-[#006970]' : ''
            }`}
          >
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#006970] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 sm:mt-0">
                <span className="material-symbols-outlined text-[18px] sm:text-[22px]">assignment_turned_in</span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="font-mono text-xs sm:text-sm text-[#00152d] font-bold">{quickCode}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-[#94f1fa] text-[#007077]">
                    Tahap: [T] Tindakan Terarah (Aktif)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#44474d] mt-1 leading-snug">
                  Laporan diverifikasi Satgas Pesantren. Pendampingan sebaya asrama dan asatidz pendamping telah diaktifkan secara tertutup.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/lacak?kode=${quickCode}`)}
              className="text-xs sm:text-sm text-[#006970] hover:text-[#00152d] flex items-center gap-1 font-bold whitespace-nowrap cursor-pointer self-end sm:self-center"
            >
              Detail Lengkap Laporan <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Orientasi Santri Baru Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 sm:pb-16 w-full" id="faq-orientasi">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-[#006970] text-xs font-bold uppercase tracking-widest mb-2 bg-[#94f1fa]/40 px-3 py-1 rounded-full">
            <span className="material-symbols-outlined text-[16px]">help_center</span>
            <span>Orientasi Santri Baru</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#00152d]">
            Mengapa & Bagaimana Kami Menjaga Anda?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#44474d] mt-2 leading-relaxed">
            Kami mengerti rasa ragu, takut dicap mengadu, atau cemas akan sanksi sosial. Berikut jawaban jujur atas segala kekhawatiran Anda sebelum melapor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#e5eeff] text-[#00152d] flex items-center justify-center mb-3 sm:mb-4">
              <span className="material-symbols-outlined text-[22px] sm:text-[26px] text-[#006970]">visibility_off</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#00152d] mb-1.5">"Apakah nama saya bisa ketahuan teman/ustadz?"</h3>
            <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
              <strong>Sama sekali tidak.</strong> Sistem tidak pernah menuntut identitas asli. Bahkan alamat IP jaringan dan tipe perangkat otomatis dihapus oleh protokol sanitasi sebelum data disimpan ke pangkalan data perlindungan.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#e5eeff] text-[#00152d] flex items-center justify-center mb-3 sm:mb-4">
              <span className="material-symbols-outlined text-[22px] sm:text-[26px] text-[#006970]">phonelink_erase</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#00152d] mb-1.5">"Bagaimana jika santri tidak boleh memegang HP?"</h3>
            <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
              Tersedia <strong>Kotak Aman Fisik</strong> bersegel di bilik kesehatan & perpustakaan, serta <strong>Duta Santri Sebaya</strong> yang telah disumpah dan terlatih Pertolongan Pertama Psikologis (PFA) untuk membantu Anda tanpa gawai.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#e5eeff] text-[#00152d] flex items-center justify-center mb-3 sm:mb-4">
              <span className="material-symbols-outlined text-[22px] sm:text-[26px] text-[#006970]">shield_person</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#00152d] mb-1.5">"Siapa yang menerima dan menindaklanjuti?"</h3>
            <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
              Hanya <strong>Tim Satgas Khusus</strong> (terdiri dari konselor berlisensi, Bu Nyai/Ustadzah Pembina, dan dokter poskestren). Tidak dibahas dalam forum terbuka pondok, tidak ada penghakiman moral, dan tidak ada konfrontasi frontal.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Islamic Core Operational Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 sm:pb-16 w-full">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-[#006970] text-xs font-bold uppercase tracking-widest mb-2">
            <span className="material-symbols-outlined text-[16px]">balance</span>
            <span>Prinsip Adab & Maqashid Syari'ah</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#00152d]">
            Bukan Sekadar Sistem, Melainkan Amanah Syar'i
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#44474d] mt-2 leading-relaxed">
            Setiap tata kelola dan perlindungan dalam Himayatun-Nafs diikat oleh 4 pilar kehormatan Islam untuk menjamin kemaslahatan jiwa santri secara paripurna.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#e5eeff] flex items-center justify-center text-[#00152d] mb-3 sm:mb-4">
                <span className="material-symbols-outlined text-[22px] sm:text-[26px]">vpn_key_alert</span>
              </div>
              <span className="text-[11px] text-[#006970] font-bold uppercase tracking-wider block mb-1">Pilar 01</span>
              <h3 className="text-base sm:text-lg font-bold text-[#00152d] mb-1.5">Amanah</h3>
              <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                Kerahasiaan mutlak. Akses laporan dibatasi peran tertutup. Petugas disumpah demi Allah Ta'ala untuk tidak membocorkan keluhan santri kepada pihak manapun.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-xs text-[#00152d] font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-[#006970]">security</span>
                Akses Tertutup Berlapis
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#e5eeff] flex items-center justify-center text-[#006970] mb-3 sm:mb-4">
                <span className="material-symbols-outlined text-[22px] sm:text-[26px]">favorite</span>
              </div>
              <span className="text-[11px] text-[#006970] font-bold uppercase tracking-wider block mb-1">Pilar 02</span>
              <h3 className="text-base sm:text-lg font-bold text-[#00152d] mb-1.5">Rahmah</h3>
              <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                Kasih sayang murni (*unconditional compassion*). Tidak ada interogasi keras atau penghakiman moral terhadap santri yang berani mencari bantuan perlindungan.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-xs text-[#00152d] font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-[#006970]">volunteer_activism</span>
                Tanpa Menyalahkan Korban
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#e5eeff] flex items-center justify-center text-[#00152d] mb-3 sm:mb-4">
                <span className="material-symbols-outlined text-[22px] sm:text-[26px]">group_work</span>
              </div>
              <span className="text-[11px] text-[#006970] font-bold uppercase tracking-wider block mb-1">Pilar 03</span>
              <h3 className="text-base sm:text-lg font-bold text-[#00152d] mb-1.5">Ta'awun</h3>
              <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                Sinergi tolong-menolong antara konselor sebaya santri, Lurah Pondok, asatidz pengasuh, dan paramedis poskestren demi memulihkan keharmonisan asrama secara adil.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-xs text-[#00152d] font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-[#006970]">handshake</span>
                Dukungan Kolektif Terpadu
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#e5eeff] flex items-center justify-center text-[#006970] mb-3 sm:mb-4">
                <span className="material-symbols-outlined text-[22px] sm:text-[26px]">shield_with_heart</span>
              </div>
              <span className="text-[11px] text-[#006970] font-bold uppercase tracking-wider block mb-1">Pilar 04</span>
              <h3 className="text-base sm:text-lg font-bold text-[#00152d] mb-1.5">Himayatun-Nafs</h3>
              <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                Memuliakan maqashid syari'ah primer: Menjaga Jiwa (*Hifzhun Nafs*) dan Martabat (*Hifzhul 'Irdh*). Keselamatan raga dan batin santri adalah prioritas mutlak.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-xs text-[#00152d] font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-[#006970]">verified_user</span>
                Tujuan Tertinggi Pesantren
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Tahapan Interaktif PROTECT */}
      <section className="w-full bg-[#f1f5f9] py-12 sm:py-16 border-y border-slate-200/80" id="alur-protect">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[#006970] text-xs font-bold uppercase tracking-widest mb-2 bg-white px-3 py-1 rounded-full border border-slate-200">
                <span className="material-symbols-outlined text-[16px]">account_tree</span>
                <span>Protokol Standar Penanganan Berjenjang</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#00152d]">
                Alur Mekanisme 7-Tahap P-R-O-T-E-C-T
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-[#44474d] max-w-2xl mt-1 leading-relaxed">
                Panduan terstruktur yang memastikan setiap aduan tertangani secara adil, transparan, dan melindungi kerahasiaan santri sejak laporan pertama hingga pemulihan penuh.
              </p>
            </div>
            <button
              onClick={() => navigate('/tentang')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#006970] hover:text-[#00152d] transition-colors shrink-0 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm cursor-pointer self-start md:self-auto"
            >
              <span>Pelajari Standar SOP</span>
              <span className="material-symbols-outlined text-[16px] sm:text-[18px]">menu_book</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 sm:gap-3.5">
            {/* Step 1: P */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-[#006970] transition-all">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#00152d] text-white font-bold flex items-center justify-center text-xs sm:text-sm shadow-sm">P</span>
                  <span className="text-[10px] font-bold text-[#006970] tracking-wider uppercase bg-[#94f1fa]/40 px-2 py-0.5 rounded">Tahap 1</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#00152d] mb-1">Pelaporan Anonim</h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Santri menuliskan kronologi bebas tanpa syarat nama asli dan langsung memegang kode tiket rahasia.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#006970]">person_off</span> Santri / Saksi
              </div>
            </div>

            {/* Step 2: R */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-[#006970] transition-all">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#00152d] text-white font-bold flex items-center justify-center text-xs sm:text-sm shadow-sm">R</span>
                  <span className="text-[10px] font-bold text-[#006970] tracking-wider uppercase bg-[#94f1fa]/40 px-2 py-0.5 rounded">Tahap 2</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#00152d] mb-1">Review Objektif</h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Penelaahan fakta awal oleh tim verifikator satgas tanpa berprasangka dan tanpa membuka nama asrama.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#006970]">fact_check</span> Tim Verifikasi
              </div>
            </div>

            {/* Step 3: O */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-[#006970] transition-all">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#00152d] text-white font-bold flex items-center justify-center text-xs sm:text-sm shadow-sm">O</span>
                  <span className="text-[10px] font-bold text-[#006970] tracking-wider uppercase bg-[#94f1fa]/40 px-2 py-0.5 rounded">Tahap 3</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#00152d] mb-1">Organisasi Risiko</h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Triase klasifikasi manusia: Ringan, Sedang, Tinggi, atau Darurat dengan alasan singkat tertulis.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#006970]">rule</span> Triase Satgas
              </div>
            </div>

            {/* Step 4: T */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-[#006970] transition-all">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#006970] text-white font-bold flex items-center justify-center text-xs sm:text-sm shadow-sm">T</span>
                  <span className="text-[10px] font-bold text-[#006970] tracking-wider uppercase bg-[#94f1fa]/40 px-2 py-0.5 rounded">Tahap 4</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#00152d] mb-1">Tindakan Terarah</h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Langkah perlindungan santun: Pemisahan kontak sepihak, patroli senyap, dan mitigasi damai.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#006970]">handshake</span> Asatidz Mediasi
              </div>
            </div>

            {/* Step 5: E */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-[#006970] transition-all">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#00152d] text-white font-bold flex items-center justify-center text-xs sm:text-sm shadow-sm">E</span>
                  <span className="text-[10px] font-bold text-[#006970] tracking-wider uppercase bg-[#94f1fa]/40 px-2 py-0.5 rounded">Tahap 5</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#00152d] mb-1">Empati & Pulih</h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Pendampingan pemulihan mental, doa bersama, konseling empatik santriwati/putra di Bilik Aman.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#006970]">healing</span> Konselor Pondok
              </div>
            </div>

            {/* Step 6: C */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-[#006970] transition-all">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#00152d] text-white font-bold flex items-center justify-center text-xs sm:text-sm shadow-sm">C</span>
                  <span className="text-[10px] font-bold text-[#006970] tracking-wider uppercase bg-[#94f1fa]/40 px-2 py-0.5 rounded">Tahap 6</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#00152d] mb-1">Continuity Monitor</h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Pemantauan berkala kondisi lingkungan kamar santri selama 14-30 hari demi mencegah intimidasi ulang.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#006970]">bedroom_child</span> Pengurus Kamar
              </div>
            </div>

            {/* Step 7: T */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-[#006970] transition-all">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#122a46] text-[#94f1fa] font-bold flex items-center justify-center text-xs sm:text-sm shadow-sm">T</span>
                  <span className="text-[10px] font-bold text-[#006970] tracking-wider uppercase bg-[#94f1fa]/40 px-2 py-0.5 rounded">Tahap 7</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#00152d] mb-1">Tuntas & Evaluasi</h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Penutupan berkas formal, laporan perbaikan tata tertib asrama kepada Pengasuh Kiai tanpa membuka aib.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#006970]">task_alt</span> Majelis Pengasuh
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Split Mosaic */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 w-full" id="jalur-non-gawai">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 text-[#006970] text-xs font-bold uppercase tracking-wider bg-[#eff4ff] px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>Integritas, Etika & Batasan</span>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#00152d]">
                Transparansi Privasi & Batasan Prototipe SantriVision
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-[#44474d] leading-relaxed">
                Kami memegang prinsip kejujuran ilmiah dan syar'i: <strong className="text-[#00152d] font-semibold">tidak ada sistem digital yang kebal 100%</strong>. Oleh karenanya, keamanan platform ini bertumpu pada minimisasi data ekstrem — sistem kami tidak pernah meminta apa yang tidak perlu diketahui.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 sm:p-3.5 rounded-xl bg-[#eff4ff] border border-slate-200/60 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[#00152d] text-xs sm:text-sm font-bold">
                    <span className="material-symbols-outlined text-[#006970] text-[18px]">do_not_disturb_on</span>
                    <span>Nol Log Alamat IP</span>
                  </div>
                  <p className="text-xs text-[#44474d]">
                    Alamat IP perangkat dan riwayat peramban langsung diputus di gerbang enkripsi tanpa disimpan.
                  </p>
                </div>
                <div className="p-3 sm:p-3.5 rounded-xl bg-[#eff4ff] border border-slate-200/60 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[#00152d] text-xs sm:text-sm font-bold">
                    <span className="material-symbols-outlined text-[#006970] text-[18px]">smart_toy</span>
                    <span>Manusia Pengambil Keputusan</span>
                  </div>
                  <p className="text-xs text-[#44474d]">
                    Algoritma hanya menyortir antrean tiket, bukan memutus sanksi santri secara sepihak.
                  </p>
                </div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#e5eeff] text-[#0b1c30] flex items-start gap-2.5 sm:gap-3 border border-slate-200/60">
                <span className="material-symbols-outlined text-[#006970] text-[20px] sm:text-[22px] mt-0.5 shrink-0">info</span>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  <strong className="text-[#00152d] font-semibold">Catatan Prototipe Konseptual:</strong> Sistem ini merupakan bagian dari inovasi santri masa depan (SantriVision 2026). Segala data studi kasus yang ditampilkan adalah simulasi etis untuk pemodelan perlindungan santri Indonesia yang bermartabat.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#44474d]">
              <span>Pedoman Ditpdpontren Ditjen Pendis Kemenag RI</span>
              <button
                onClick={() => navigate('/tentang')}
                className="text-xs text-[#006970] hover:text-[#00152d] font-bold flex items-center gap-1 cursor-pointer self-start sm:self-auto"
              >
                Baca Dokumen Privasi & Batasan <span className="material-symbols-outlined text-[15px]">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#00152d] via-[#0f2942] to-[#122a46] text-white rounded-3xl p-5 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-[#006970]/20 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[#94f1fa] text-xs uppercase tracking-wider mb-2.5">
                <span className="material-symbols-outlined text-[16px]">mark_email_unread</span>
                <span>Akses Khusus Non-Gawai</span>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
                Tidak Memegang Handphone di Asrama?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Tradisi pesantren membatasi penggunaan gawai demi kekhusyukan mengaji. Pelaporan Himayatun-Nafs tetap dapat diakses santri melalui 3 kanal fisik resmi:
              </p>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 bg-white/10 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-white/10">
                  <span className="material-symbols-outlined text-[#94f1fa] text-[18px] sm:text-[20px] shrink-0 mt-0.5">inbox</span>
                  <div>
                    <span className="text-xs font-bold text-white block">Kotak Aman Fisik Bersegel</span>
                    <span className="text-[11px] text-slate-300 leading-tight">Surat tertutup dapat dimasukkan di perpustakaan & bilik kesehatan tanpa CCTV langsung.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 bg-white/10 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-white/10">
                  <span className="material-symbols-outlined text-[#94f1fa] text-[18px] sm:text-[20px] shrink-0 mt-0.5">diversity_1</span>
                  <div>
                    <span className="text-xs font-bold text-white block">Duta Santri Sebaya (Terlatih PFA)</span>
                    <span className="text-[11px] text-slate-300 leading-tight">Santri senior pilihan yang dilatih teknik dengar aktif, amanah, dan Psychological First Aid.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 bg-white/10 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-white/10">
                  <span className="material-symbols-outlined text-[#94f1fa] text-[18px] sm:text-[20px] shrink-0 mt-0.5">local_hospital</span>
                  <div>
                    <span className="text-xs font-bold text-white block">Pos Kesehatan Pesantren (Poskestren)</span>
                    <span className="text-[11px] text-slate-300 leading-tight">Petugas medis pondok siap menerima pengaduan dengan privasi rekam medis resmi.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span>Komplek Putra & Putri</span>
              <span className="font-mono text-xs text-[#94f1fa] font-bold">SOP-FISIK-2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Safe Space */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 sm:pb-16 w-full">
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-center">
            <div className="space-y-1.5">
              <span className="text-xs text-[#006970] uppercase tracking-widest font-bold">Ukhuwah & Kasih Sayang</span>
              <h3 className="text-base sm:text-xl font-bold text-[#00152d]">Pesantren Adalah Rumah Perlindungan Jiwa</h3>
              <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                Mencari pertolongan dan bersuara bukanlah aib, melainkan wujud menjaga amanah raga dan kehormatan yang dikaruniakan Allah Subhanahu wa Ta'ala.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden h-40 sm:h-44 shadow-sm relative group border border-slate-200">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Ruang Teduh Konselor Putri"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC1p4aNX1dorCwopA0udnmlpYdCO7BNJgBoj3K8fc3_on_NRWgcGLHQv8fjsbGLL21AVZlwUeFg3zox5YIzMLMJSLu2X6KsVrd-tAajTbw-o_QI1dzYbNGxkK7P-40eXUZA8JZguY2QQ1JQe-u0vRsyWPzfUPddzb2AhdTa1MzRu_pQ32dW_4ykc83lXhxTbz9cdoRnyfQyCC_7FFcn_1sxdKLLXRLOJgT74Og3rvD8FYHKRqlBm2A"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00152d]/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#94f1fa]">spa</span>
                  Ruang Teduh Konselor Putri
                </span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden h-40 sm:h-44 shadow-sm relative group border border-slate-200">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Pendampingan Asatidz Pembina"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0NF5Jx714Q4e8b9r1XZjz1jHkHAIkqMlGpXMr-xaARY7mkjLAwUb77KwSwmTUzCbZE667eiejs-wuNaWaINwEnJ69r7uBpiI-2Bs471pXv3RusZSflaClb6mBK-CCuJHkW14jNdU_675sFvslOI3vNTAsbSJp-SvI3XAN5dMZivs0aNP94WbpvAEJgN4rAKjJ0kbLhVU0QsuQ4l1cL9WzwDfAwHoFLSoWp3RxX2eiRV4xhp3i67UO"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00152d]/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#94f1fa]">supervisor_account</span>
                  Pendampingan Asatidz Pembina
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
