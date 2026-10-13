import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { ProtectStageKey, PROTECT_STAGES } from '../types/report';
import { DETAILED_PROTECT_GUIDE } from '../components/ProtectVisualGuideModal';

export type PanduanTabKey = 'protect' | 'orientasi' | 'asrama' | 'pilar';

export const PanduanHub: React.FC = () => {
  const { path, queryParams, navigate } = useRouter();

  // Determine initial active tab from path or query
  const getInitialTab = (): PanduanTabKey => {
    if (queryParams.tab === 'orientasi' || path.includes('orientasi')) return 'orientasi';
    if (queryParams.tab === 'asrama' || path.includes('asrama') || path.includes('non-gawai')) return 'asrama';
    if (queryParams.tab === 'pilar' || path.includes('pilar')) return 'pilar';
    return 'protect';
  };

  const [activeTab, setActiveTab] = useState<PanduanTabKey>(getInitialTab);
  const [selectedProtectStage, setSelectedProtectStage] = useState<ProtectStageKey>('P');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const tabFromUrl = getInitialTab();
    setActiveTab(tabFromUrl);
  }, [path, queryParams.tab]);

  const handleTabSwitch = (tab: PanduanTabKey) => {
    setActiveTab(tab);
    navigate(`/panduan?tab=${tab}`);
  };

  const stageKeys: ProtectStageKey[] = ['P', 'R', 'O', 'T', 'E', 'C', 'T_FINAL'];
  const activeStageGuide = DETAILED_PROTECT_GUIDE[selectedProtectStage];

  const faqs = [
    {
      q: 'Apakah saya benar-benar aman dan nama saya tidak akan terbongkar?',
      a: 'Ya, 100% aman. Sistem Himayatun-Nafs beroperasi dengan prinsip Nol-Log IP dan Zero-Identity. Anda tidak perlu memasukkan nama asli, kamar tidur, akun media sosial, ataupun nomor WhatsApp. Satu-satunya kunci akses adalah Kode Tiket Anonim 16-karakter yang Anda pegang sendiri.',
    },
    {
      q: 'Bagaimana jika saya tidak memiliki handphone di asrama pondok?',
      a: 'Sebagian besar pesantren melarang santri membawa gawai. Anda dapat menyampaikan keluhan melalui 3 kanal fisik resmi: Kotak Aman Fisik Bersegel (di perpustakaan dan poskestren), Duta Santri Sebaya yang terlatih PFA, atau konsultasi langsung di Poskestren.',
    },
    {
      q: 'Siapa yang membaca dan menindaklanjuti laporan saya?',
      a: 'Laporan hanya dibaca oleh Petugas Perlindungan Santri yang telah disumpah amanah syar\'i. Petugas bertugas melakukan verifikasi fakta, klasifikasi risiko, dan menyusun langkah pendampingan secara tertutup tanpa melibatkan santri lain.',
    },
    {
      q: 'Apakah pelaku atau pihak yang dilaporkan akan tahu bahwa saya yang melapor?',
      a: 'Tidak pernah. SOP penanganan di pesantren mewajibkan intervensi dibingkai sebagai patroli kedisiplinan umum atau penegakan tata tertib asrama reguler oleh asatidz, bukan sebagai reaksi langsung atas aduan santri tertentu.',
    },
    {
      q: 'Apa yang harus saya lakukan jika merasa terancam bahaya fisik detik ini?',
      a: 'Jika Anda dalam ancaman bahaya fisik mendesak, segera datangi Posko Asatidz Piket 24 Jam, Bilik Konseling Masjid, atau Poskestren terdekat. Jangan menunggu proses tiket jika ada ancaman keselamatan mendadak.',
    },
  ];

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-8 max-w-7xl mx-auto flex-1 space-y-6">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#122a46] text-[#94f1fa] text-[11px] sm:text-xs font-bold mb-1.5">
            <span className="material-symbols-outlined text-[14px]">menu_book</span>
            PUSAT PANDUAN, SOP & EDUKASI SANTRI
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-[#00152d]">
            Panduan Perlindungan & Ruang Aman Pesantren
          </h1>
          <p className="text-xs sm:text-sm text-[#44474d] mt-0.5">
            Informasi komprehensif mengenai alur penanganan aduan, orientasi santri baru, dan saluran asrama terhubung.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigate('/lapor')}
            className="px-4 py-2.5 rounded-xl bg-[#006970] text-white text-xs sm:text-sm font-bold hover:bg-[#00152d] transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">lock</span>
            <span>Mulai Buat Laporan</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout with Interactive Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* INTERACTIVE SIDEBAR (4 Cols Desktop) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Mobile Tab Switcher (< lg screens) */}
          <div className="lg:hidden bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {[
              { id: 'protect', label: 'Alur PROTECT', icon: 'account_tree' },
              { id: 'orientasi', label: 'Orientasi & FAQ', icon: 'help_center' },
              { id: 'asrama', label: 'Kanal Asrama', icon: 'inbox' },
              { id: 'pilar', label: 'Pilar Syar\'i', icon: 'balance' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabSwitch(tab.id as PanduanTabKey)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#00152d] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Desktop Interactive Sidebar Card (>= lg screens) */}
          <div className="hidden lg:block bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-2 sticky top-24">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-3 py-1">
              Menu Navigasi Panduan
            </span>

            <nav className="space-y-1.5">
              <button
                onClick={() => handleTabSwitch('protect')}
                className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between cursor-pointer group ${
                  activeTab === 'protect'
                    ? 'bg-[#00152d] text-white shadow-md'
                    : 'text-[#00152d] hover:bg-[#eff4ff]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      activeTab === 'protect'
                        ? 'bg-[#006970] text-[#94f1fa]'
                        : 'bg-[#eff4ff] text-[#006970] group-hover:bg-[#006970] group-hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[19px]">account_tree</span>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold leading-tight">Alur Protokol PROTECT</h4>
                    <span className={`text-[11px] block mt-0.5 ${activeTab === 'protect' ? 'text-slate-300' : 'text-slate-500'}`}>
                      7 Tahap Penanganan SOP
                    </span>
                  </div>
                </div>
                <span className={`material-symbols-outlined text-[18px] ${activeTab === 'protect' ? 'text-[#94f1fa]' : 'text-slate-400'}`}>
                  chevron_right
                </span>
              </button>

              <button
                onClick={() => handleTabSwitch('orientasi')}
                className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between cursor-pointer group ${
                  activeTab === 'orientasi'
                    ? 'bg-[#00152d] text-white shadow-md'
                    : 'text-[#00152d] hover:bg-[#eff4ff]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      activeTab === 'orientasi'
                        ? 'bg-[#006970] text-[#94f1fa]'
                        : 'bg-[#eff4ff] text-[#006970] group-hover:bg-[#006970] group-hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[19px]">help_center</span>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold leading-tight">Orientasi & FAQ Santri</h4>
                    <span className={`text-[11px] block mt-0.5 ${activeTab === 'orientasi' ? 'text-slate-300' : 'text-slate-500'}`}>
                      3 Langkah & Tanya Jawab
                    </span>
                  </div>
                </div>
                <span className={`material-symbols-outlined text-[18px] ${activeTab === 'orientasi' ? 'text-[#94f1fa]' : 'text-slate-400'}`}>
                  chevron_right
                </span>
              </button>

              <button
                onClick={() => handleTabSwitch('asrama')}
                className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between cursor-pointer group ${
                  activeTab === 'asrama'
                    ? 'bg-[#00152d] text-white shadow-md'
                    : 'text-[#00152d] hover:bg-[#eff4ff]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      activeTab === 'asrama'
                        ? 'bg-[#006970] text-[#94f1fa]'
                        : 'bg-[#eff4ff] text-[#006970] group-hover:bg-[#006970] group-hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[19px]">inbox</span>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold leading-tight">Kanal Asrama Non-Gawai</h4>
                    <span className={`text-[11px] block mt-0.5 ${activeTab === 'asrama' ? 'text-slate-300' : 'text-slate-500'}`}>
                      Kotak Aman & Poskestren
                    </span>
                  </div>
                </div>
                <span className={`material-symbols-outlined text-[18px] ${activeTab === 'asrama' ? 'text-[#94f1fa]' : 'text-slate-400'}`}>
                  chevron_right
                </span>
              </button>

              <button
                onClick={() => handleTabSwitch('pilar')}
                className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between cursor-pointer group ${
                  activeTab === 'pilar'
                    ? 'bg-[#00152d] text-white shadow-md'
                    : 'text-[#00152d] hover:bg-[#eff4ff]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      activeTab === 'pilar'
                        ? 'bg-[#006970] text-[#94f1fa]'
                        : 'bg-[#eff4ff] text-[#006970] group-hover:bg-[#006970] group-hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[19px]">balance</span>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold leading-tight">Empat Pilar Nilai Syar'i</h4>
                    <span className={`text-[11px] block mt-0.5 ${activeTab === 'pilar' ? 'text-slate-300' : 'text-slate-500'}`}>
                      Amanah, Rahmah, Ta'awun
                    </span>
                  </div>
                </div>
                <span className={`material-symbols-outlined text-[18px] ${activeTab === 'pilar' ? 'text-[#94f1fa]' : 'text-slate-400'}`}>
                  chevron_right
                </span>
              </button>
            </nav>

            {/* Quick Action Box */}
            <div className="pt-4 mt-2 border-t border-slate-100 space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-[#eff4ff] border border-slate-200/80 space-y-1.5">
                <span className="text-xs font-bold text-[#00152d] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#006970]">verified_user</span>
                  Sudah punya kode tiket?
                </span>
                <p className="text-[11px] text-[#44474d] leading-relaxed">
                  Pantau perkembangan verifikasi dan respons konselor pesantren secara langsung.
                </p>
                <button
                  onClick={() => navigate('/lacak')}
                  className="w-full mt-1 py-1.5 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#00152d] hover:bg-slate-50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Buka Halaman Lacak</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT AREA (8 Cols Desktop) */}
        <div className="lg:col-span-8 space-y-6">
          {/* TAB 1: ALUR PROTOKOL PROTECT */}
          {activeTab === 'protect' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] text-[#006970] text-xs font-bold">
                  <span className="material-symbols-outlined text-[15px]">account_tree</span>
                  STANDAR OPERASIONAL PROSEDUR RESMI
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#00152d]">
                  Mekanisme 7-Tahap Alur Protokol P-R-O-T-E-C-T
                </h2>
                <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                  Setiap laporan santri dijamin melewati 7 tahapan berjenjang objektif guna mencegah keputusan sepihak, memuliakan privasi korban, dan memulihkan harmoni pesantren.
                </p>

                {/* Horizontal Step Selector */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 block mb-2">
                    Klik tahapan di bawah untuk membuka rujukan detail SOP:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                    {stageKeys.map((key) => {
                      const isSelected = selectedProtectStage === key;
                      const guide = DETAILED_PROTECT_GUIDE[key];
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedProtectStage(key)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                            isSelected
                              ? 'bg-[#00152d] text-white border-[#00152d] shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-[#00152d] hover:bg-slate-100'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
                              isSelected
                                ? 'bg-[#006970] text-[#94f1fa]'
                                : 'bg-white text-[#00152d] shadow-xs'
                            }`}
                          >
                            {guide.letter}
                          </span>
                          <span className="text-[10px] font-bold truncate max-w-full">
                            {guide.code.split(']')[0].replace('[', '')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Detailed Active Stage Panel */}
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-[#006970]/30 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00152d] text-[#94f1fa] font-mono text-xs font-bold">
                        {activeStageGuide.code}
                      </span>
                      <span className="text-xs font-semibold text-[#006970] bg-[#eff4ff] px-2.5 py-0.5 rounded-full">
                        Pelaksana: {activeStageGuide.actor}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#00152d] mt-1">
                      {activeStageGuide.title}
                    </h3>
                  </div>

                  <span className="text-xs font-mono font-bold text-[#ba1a1a] bg-red-50 border border-red-200 px-3 py-1 rounded-xl self-start sm:self-auto shrink-0">
                    SLA: {activeStageGuide.sla}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#006970] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">target</span>
                    Tujuan Pokok
                  </h4>
                  <p className="text-xs sm:text-sm text-[#00152d] leading-relaxed">
                    {activeStageGuide.objective}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#00152d] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#006970]">checklist</span>
                    Daftar Tindakan SOP Terstandar:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeStageGuide.checklist.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#eff4ff] border border-slate-200/80 flex items-start gap-2 text-xs">
                        <span className="text-[#006970] font-black text-sm shrink-0">✓</span>
                        <span className="text-[#00152d] leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-[#e5eeff] border border-slate-200 space-y-1 border-l-4 border-l-[#006970]">
                    <span className="text-xs font-bold text-[#00152d] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-[#006970]">balance</span>
                      Landasan Maqashid Syari'ah
                    </span>
                    <p className="text-xs text-[#44474d] leading-relaxed">
                      {activeStageGuide.syariFoundation}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1 border-l-4 border-l-amber-500">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-amber-700">warning</span>
                      Prosedur Jalur Cepat / Darurat
                    </span>
                    <p className="text-xs text-amber-950 leading-relaxed">
                      {activeStageGuide.escalationRule}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORIENTASI SANTRI BARU & FAQ */}
          {activeTab === 'orientasi' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* 3 Quick Steps */}
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] text-[#006970] text-xs font-bold">
                  <span className="material-symbols-outlined text-[15px]">touch_app</span>
                  ORIENTASI SANTRI BARU
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#00152d]">
                  Tiga Langkah Mudah Mencari Perlindungan
                </h2>
                <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                  Pesantren adalah rumah belajar yang aman. Jika ananda melihat atau mengalami perlakuan tidak menyenangkan, berikut 3 langkah aman bersuara:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-[#00152d] text-white flex items-center justify-center font-bold text-xs">
                      01
                    </div>
                    <h4 className="text-sm font-bold text-[#00152d]">Ceritakan Peristiwa</h4>
                    <p className="text-xs text-[#44474d] leading-relaxed">
                      Tuliskan apa yang terjadi tanpa nama, kamar, atau nomor gawai. 100% bebas dari risiko teridentifikasi.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-[#006970] text-white flex items-center justify-center font-bold text-xs">
                      02
                    </div>
                    <h4 className="text-sm font-bold text-[#00152d]">Simpan Kode Rahasia</h4>
                    <p className="text-xs text-[#44474d] leading-relaxed">
                      Catat kode 16-karakter unik di tempat aman. Kode ini adalah bukti akses Anda untuk melihat perkembangan.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-[#122a46] text-[#94f1fa] flex items-center justify-center font-bold text-xs">
                      03
                    </div>
                    <h4 className="text-sm font-bold text-[#00152d]">Pantau & Dampingi</h4>
                    <p className="text-xs text-[#44474d] leading-relaxed">
                      Tim satgas akan menindaklanjuti secara santun dan melindungi ananda tanpa konfrontasi terbuka.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-[#00152d]">
                  <span className="material-symbols-outlined text-[20px] text-[#006970]">help</span>
                  <h3 className="text-base sm:text-lg font-bold">
                    Tanya Jawab Seputar Keamanan Pelapor (FAQ)
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl border transition-all overflow-hidden ${
                          isOpen ? 'bg-[#eff4ff]/60 border-[#006970]/40' : 'bg-slate-50/70 border-slate-200'
                        }`}
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer"
                          type="button"
                        >
                          <span className="text-xs sm:text-sm font-bold text-[#00152d] leading-snug">
                            {faq.q}
                          </span>
                          <span className="material-symbols-outlined text-[18px] text-[#006970] shrink-0">
                            {isOpen ? 'expand_less' : 'expand_more'}
                          </span>
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#44474d] leading-relaxed border-t border-slate-100">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KANAL ASRAMA NON-GAWAI */}
          {activeTab === 'asrama' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] text-[#006970] text-xs font-bold">
                  <span className="material-symbols-outlined text-[15px]">mark_email_unread</span>
                  AKSES ASRAMA & KOMPLEK PESANTREN
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#00152d]">
                  Kanal Perlindungan Fisik (Bebas Gawai)
                </h2>
                <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                  Tradisi luhur pesantren membatasi penggunaan telepon genggam agar santri khusyuk mendalami ilmu agama. Jika santri tidak memiliki akses internet, perlindungan tetap berjalan melalui 3 jalur fisik:
                </p>

                <div className="space-y-3 pt-1">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#00152d] text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px] text-[#94f1fa]">inbox</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#00152d]">1. Kotak Aman Fisik Bersegel (Safe Drop Box)</h4>
                      <p className="text-xs text-[#44474d] leading-relaxed">
                        Disediakan di area bebas sorotan CCTV langsung: di sudut tenang perpustakaan, lorong samping masjid, dan ruang tunggu poskestren. Amplop aduan disegel dan dibuka berkala hanya oleh Tim Satgas berwenang.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#006970] text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px] text-[#94f1fa]">diversity_1</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#00152d]">2. Duta Santri Sebaya (Terlatih PFA)</h4>
                      <p className="text-xs text-[#44474d] leading-relaxed">
                        Santri senior pilihan yang dilatih teknik dengar aktif, amanah, dan Psychological First Aid (PFA). Teman sebaya siap menjadi jembatan curhat tanpa membocorkan obrolan kepada kawan kamar lainnya.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#122a46] text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px] text-[#94f1fa]">local_hospital</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#00152d]">3. Pos Kesehatan Pesantren (Poskestren)</h4>
                      <p className="text-xs text-[#44474d] leading-relaxed">
                        Tenaga medis dan ustadzah piket poskestren siap melayani pemeriksaan kesehatan fisik maupun tempat perlindungan transit darurat dengan standar privasi rekam medis resmi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EMPAT PILAR NILAI SYAR'I */}
          {activeTab === 'pilar' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eff4ff] text-[#006970] text-xs font-bold">
                  <span className="material-symbols-outlined text-[15px]">balance</span>
                  MAQASHID SYARI'AH PESANTREN
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#00152d]">
                  Bukan Sekadar Sistem, Melainkan Amanah Syar'i
                </h2>
                <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                  Platform ini berakar pada 4 pilar adab dan etika Islam yang menjamin perlindungan santri berjalan dalam koridor kemuliaan:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#006970] uppercase">Pilar 01</span>
                      <span className="material-symbols-outlined text-[#006970] text-[18px]">vpn_key</span>
                    </div>
                    <h3 className="text-base font-bold text-[#00152d]">Amanah (Custodial Trust)</h3>
                    <p className="text-xs text-[#44474d] leading-relaxed">
                      Kerahasiaan mutlak. Akses laporan dibatasi peran tertutup. Petugas disumpah demi Allah Ta'ala untuk tidak membocorkan keluhan santri kepada pihak manapun.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#006970] uppercase">Pilar 02</span>
                      <span className="material-symbols-outlined text-[#006970] text-[18px]">favorite</span>
                    </div>
                    <h3 className="text-base font-bold text-[#00152d]">Rahmah (Pure Compassion)</h3>
                    <p className="text-xs text-[#44474d] leading-relaxed">
                      Kasih sayang murni (*unconditional compassion*). Tidak ada interogasi keras atau penghakiman moral terhadap santri yang berani mencari bantuan perlindungan.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#006970] uppercase">Pilar 03</span>
                      <span className="material-symbols-outlined text-[#006970] text-[18px]">group_work</span>
                    </div>
                    <h3 className="text-base font-bold text-[#00152d]">Ta'awun (Mutual Support)</h3>
                    <p className="text-xs text-[#44474d] leading-relaxed">
                      Sinergi tolong-menolong antara konselor sebaya santri, Lurah Pondok, asatidz pengasuh, dan paramedis poskestren demi memulihkan keharmonisan asrama secara adil.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#006970] uppercase">Pilar 04</span>
                      <span className="material-symbols-outlined text-[#006970] text-[18px]">shield</span>
                    </div>
                    <h3 className="text-base font-bold text-[#00152d]">Himayatun-Nafs (Soul Preservation)</h3>
                    <p className="text-xs text-[#44474d] leading-relaxed">
                      Memuliakan maqashid syari'ah primer: Menjaga Jiwa (*Hifzhun Nafs*) dan Martabat (*Hifzhul 'Irdh*). Keselamatan raga dan batin santri adalah prioritas mutlak.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
