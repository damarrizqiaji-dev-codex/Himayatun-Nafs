import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { storageService } from '../services/storage';

export const Lapor: React.FC = () => {
  const { navigate } = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form states
  const [category, setCategory] = useState('');
  const [timeEstimate, setTimeEstimate] = useState('Hari ini (kurang dari 24 jam terakhir)');
  const [macroLocation, setMacroLocation] = useState('Asrama Putra');
  const [isUrgent, setIsUrgent] = useState(false);
  const [description, setDescription] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);

  // Modal & Success states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const stepLabels = [
    'Kategori Masalah',
    'Situasi & Waktu',
    'Uraian & Bantuan',
    'Tinjau & Tiket',
  ];

  const handleCategorySelect = (val: string) => {
    setCategory(val);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachmentName(e.target.files[0].name);
    }
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!category) {
        alert('Mohon pilih salah satu kategori masalah sebelum melanjutkan.');
        return false;
      }
    } else if (step === 2) {
      if (!timeEstimate || !macroLocation) {
        alert('Mohon lengkapi perkiraan waktu dan lokasi makro.');
        return false;
      }
    } else if (step === 3) {
      if (!description.trim() || description.trim().length < 10) {
        alert('Mohon ceritakan uraian kejadian secara singkat (minimal 10 karakter) untuk membantu pemahaman tim konselor.');
        return false;
      }
      if (!consentGiven) {
        alert('Mohon centang pernyataan kejujuran dan perlindungan amanah sebelum melanjutkan.');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  const confirmSubmission = () => {
    setIsModalOpen(false);

    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const generatedCode = `HN-2026-${randomHex}-AMN`;

    storageService.addReport({
      id: generatedCode,
      category,
      timeEstimate,
      macroLocation,
      isUrgentFromReporter: isUrgent,
      description,
      attachmentName: attachmentName || undefined,
    });

    setSubmittedCode(generatedCode);
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  const copyCode = () => {
    if (!submittedCode) return;
    navigator.clipboard.writeText(submittedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const categories = [
    {
      title: 'Perundungan / Bullying',
      desc: 'Pengucilan, pemalakan uang saku, ejekan berulang oleh teman seangkatan atau senior.',
      icon: 'groups',
      val: 'Perundungan / Bullying (pengucilan, pemalakan uang saku, ejekan berulang)',
    },
    {
      title: 'Kekerasan Verbal & Kehormatan',
      desc: 'Caci maki, perendahan martabat di depan umum, celaan nasab, atau sumpah serapah.',
      icon: 'record_voice_over',
      val: 'Kekerasan Verbal & Kehormatan (caci maki, perendahan martabat di depan umum)',
    },
    {
      title: 'Kekerasan Fisik & Hukuman Tak Wajar',
      desc: 'Pemukulan, tindakan kekerasan yang melampaui aturan batas takzir atau tata tertib.',
      icon: 'front_hand',
      val: 'Kekerasan Fisik & Hukuman Tak Wajar (pemukulan, tindakan melampaui aturan takzir)',
    },
    {
      title: 'Batas Kehormatan & Aurat',
      desc: 'Sentuhan tanpa izin, pelanggaran privasi bilik mandi/kamar santri, atau pelecehan.',
      icon: 'visibility_off',
      val: 'Batas Kehormatan & Aurat (sentuhan tanpa izin, pelanggaran privasi bilik mandi/kamar)',
    },
    {
      title: 'Intimidasi & Ancaman Keselamatan',
      desc: 'Tekanan psikis agar bungkam, pemaksaan kehendak, atau teror antar santri.',
      icon: 'warning',
      val: 'Intimidasi & Ancaman Keselamatan (tekanan psikis agar bungkam, teror santri)',
    },
    {
      title: 'Kendala Kesejahteraan & Pengasuhan Lainnya',
      desc: 'Kondisi kesehatan santri sakit diabaikan, diskriminasi pengurus, atau krisis santri.',
      icon: 'favorite',
      val: 'Kendala Kesejahteraan & Pengasuhan Lainnya (kesehatan diabaikan, diskriminasi)',
    },
  ];

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-8 max-w-4xl mx-auto flex-1">
      {/* Sub-bar Pinned Disclaimer */}
      <div className="mb-5 sm:mb-6 p-2.5 sm:p-3 rounded-xl bg-[#eff4ff] border border-[#94f1fa]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#0b1c30]">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#006970] shrink-0">encrypted</span>
          <span className="text-[11px] sm:text-xs">JALUR TERENKRIPSI END-TO-END — SANTRI VISION 2026</span>
        </div>
        <button
          onClick={() => window.location.replace('https://kemenag.go.id')}
          className="text-[10px] sm:text-[11px] font-bold text-white bg-[#00152d] hover:bg-[#ba1a1a] px-2.5 py-1 rounded-full transition-colors cursor-pointer self-start sm:self-auto shrink-0"
        >
          Tutup Cepat (Esc)
        </button>
      </div>

      {submittedCode ? (
        /* SUKSES PANEL */
        <div className="bg-white p-6 sm:p-12 rounded-3xl shadow-md text-center space-y-5 sm:space-y-6 border border-slate-200">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#94f1fa]/40 text-[#006970] flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[30px] sm:text-[36px]">check_circle</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] sm:text-xs text-[#006970] font-semibold uppercase tracking-wider">Amanah Diterima</span>
            <h2 className="text-xl sm:text-3xl font-bold text-[#00152d]">Laporan Anda Telah Diamankan</h2>
            <p className="text-xs sm:text-sm text-[#44474d] max-w-lg mx-auto leading-relaxed">
              Jazakumullah khairan atas keberanian Anda bersuara. Laporan telah masuk ke antrean verifikasi satgas dengan enkripsi penuh.
            </p>
          </div>

          {/* Monospace Code Box */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#eff4ff] space-y-2.5 sm:space-y-3 text-left border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#44474d]">Kode Tiket Anonim Anda:</span>
              <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-white text-[#006970] font-bold uppercase shadow-xs">
                Simpan Kode Ini
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 p-3 rounded-xl bg-white shadow-sm border border-slate-200">
              <span className="font-mono text-lg sm:text-2xl font-bold text-[#00152d] tracking-wider text-center sm:text-left select-all break-all">
                {submittedCode}
              </span>
              <button
                onClick={copyCode}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#00152d] text-white hover:bg-[#006970] text-xs font-semibold transition-all cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copied ? 'done' : 'content_copy'}
                </span>
                <span>{copied ? 'Tersalin!' : 'Salin Kode'}</span>
              </button>
            </div>

            <p className="text-xs text-[#44474d] leading-relaxed">
              <strong>Perhatian:</strong> Karena Anda tidak menyertakan email atau nomor HP, kode di atas adalah <em>satu-satunya cara</em> Anda dapat memantau respon resmi konselor di halaman Lacak Laporan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 pt-2">
            <button
              onClick={() => navigate(`/lacak?kode=${submittedCode}`)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#006970] text-white hover:bg-[#00152d] text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span>Buka Halaman Lacak Laporan</span>
            </button>
            <button
              onClick={() => navigate('/petugas')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#eff4ff] text-[#00152d] hover:bg-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-slate-300"
            >
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              <span>Lihat Antrean Petugas (Demo)</span>
            </button>
          </div>
        </div>
      ) : (
        /* FORM WORKFLOW */
        <div className="space-y-5 sm:space-y-6">
          {/* Header Formulir & Banner Empati */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#94f1fa]/40 text-[#007077] text-xs font-bold mb-2">
              <span className="material-symbols-outlined text-[15px]">verified_user</span>
              Protokol Amanah & Himayatun-Nafs
            </div>
            <h1 className="text-xl sm:text-3xl font-bold text-[#00152d] tracking-tight">Formulir Pelaporan Anonim Santri</h1>
            <p className="text-xs sm:text-sm text-[#44474d] mt-1 max-w-2xl leading-relaxed">
              Suara dan rasa aman Anda adalah hak mutlak di pondok pesantren ini. Isilah langkah demi langkah dengan tenang, tanpa rasa takut dihakimi.
            </p>

            <div className="mt-3.5 sm:mt-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#006970]/20 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#94f1fa]/40 text-[#006970] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px] sm:text-[26px]">security</span>
              </div>
              <div className="space-y-0.5 flex-1 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#00152d]">Kerahasiaan Mutlak Terjaga</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#006970] text-white">Terenkripsi</span>
                </div>
                <p className="text-[#44474d] text-xs leading-relaxed">
                  Sistem ini tidak mencatat nama, alamat IP gawai, nomor kamar, maupun kontak Anda. Keberanian Anda bersuara dilindungi oleh nilai amanah syar'i.
                </p>
              </div>
            </div>
          </div>

          {/* Stepper Indicator */}
          <div className="bg-white p-3.5 sm:p-5 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-100 mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-bold text-[#00152d] truncate">
                Langkah {currentStep}: {stepLabels[currentStep - 1]}
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-[#006970] bg-[#eff4ff] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shrink-0">
                {currentStep}/4 ({Math.round((currentStep / 4) * 100)}%)
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center">
              {[1, 2, 3, 4].map((stepNum) => (
                <button
                  key={stepNum}
                  type="button"
                  onClick={() => {
                    if (stepNum < currentStep || validateStep(currentStep)) {
                      setCurrentStep(stepNum);
                    }
                  }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      stepNum < currentStep
                        ? 'bg-[#006970] text-white shadow-xs'
                        : stepNum === currentStep
                        ? 'bg-[#00152d] text-white ring-2 sm:ring-4 ring-[#00152d]/10'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {stepNum < currentStep ? '✓' : stepNum}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-semibold mt-1 hidden xs:block text-[#44474d] truncate max-w-full">
                    {stepLabels[stepNum - 1]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 1: KATEGORI */}
          {currentStep === 1 && (
            <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-5">
              <div>
                <span className="text-xs text-[#006970] font-bold uppercase tracking-wider">Langkah 01 / 04</span>
                <h2 className="text-lg sm:text-xl font-bold text-[#00152d] mt-0.5">Identifikasi Kategori Kejadian</h2>
                <p className="text-xs sm:text-sm text-[#44474d] mt-1 leading-relaxed">
                  Pilihlah klasifikasi yang paling menggambarkan situasi. Anda dapat menceritakan detail pada tahap berikutnya.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {categories.map((c, idx) => {
                  const isSelected = category === c.val;
                  return (
                    <label
                      key={idx}
                      onClick={() => handleCategorySelect(c.val)}
                      className={`cursor-pointer p-3.5 sm:p-4 rounded-xl border-2 transition-all flex items-start gap-3 select-none ${
                        isSelected
                          ? 'border-[#006970] bg-[#eff4ff] shadow-sm'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#006970] text-white' : 'bg-slate-200 text-[#00152d]'
                      }`}>
                        <span className="material-symbols-outlined text-[20px]">{c.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-[#00152d] leading-snug">{c.title}</p>
                        <p className="text-[11px] sm:text-xs text-[#44474d] mt-1 leading-relaxed">{c.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00152d] text-white font-semibold text-xs sm:text-sm hover:bg-[#006970] transition-colors cursor-pointer"
                >
                  <span>Lanjut: Situasi & Waktu</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SITUASI & WAKTU */}
          {currentStep === 2 && (
            <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-5">
              <div>
                <span className="text-xs text-[#006970] font-bold uppercase tracking-wider">Langkah 02 / 04</span>
                <h2 className="text-lg sm:text-xl font-bold text-[#00152d] mt-0.5">Situasi, Perkiraan Waktu, & Lokasi Makro</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#00152d] mb-1">
                    Perkiraan Kapan Terjadinya <span className="text-red-500">*</span>
                  </label>
                  <p className="text-[11px] text-[#44474d] mb-1.5">Pilih rentang waktu yang paling mendekati ingatan Anda.</p>
                  <select
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#00152d] focus:bg-white focus:outline-none focus:border-[#006970]"
                    value={timeEstimate}
                    onChange={(e) => setTimeEstimate(e.target.value)}
                  >
                    <option value="Hari ini (kurang dari 24 jam terakhir)">Hari ini (kurang dari 24 jam terakhir)</option>
                    <option value="Kemarin">Kemarin</option>
                    <option value="Pekan ini (1 - 7 hari lalu)">Pekan ini (1 - 7 hari lalu)</option>
                    <option value="Lebih dari sebulan yang lalu">Lebih dari sebulan yang lalu</option>
                    <option value="Berulang kali / pola berkala">Berulang kali / pola berkala</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#00152d] mb-1">
                    Lokasi Makro Lingkungan Pesantren <span className="text-red-500">*</span>
                  </label>
                  <p className="text-[11px] text-[#44474d] mb-1.5">Kategori area umum tanpa menyebut nama kamar spesifik.</p>
                  <select
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#00152d] focus:bg-white focus:outline-none focus:border-[#006970]"
                    value={macroLocation}
                    onChange={(e) => setMacroLocation(e.target.value)}
                  >
                    <option value="Asrama Putra">Asrama Putra</option>
                    <option value="Asrama Putri">Asrama Putri</option>
                    <option value="Area Madrasah / Kompleks Kelas">Area Madrasah / Kompleks Kelas</option>
                    <option value="Masjid / Musholla / Aula Utama">Masjid / Musholla / Aula Utama</option>
                    <option value="Dapur / Kantin / Koperasi Santri">Dapur / Kantin / Koperasi Santri</option>
                    <option value="Area Umum / Lapangan / Sekitar Gerbang">Area Umum / Lapangan / Sekitar Gerbang</option>
                  </select>
                </div>
              </div>

              {/* Urgent Toggle */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#eff4ff] border border-slate-200 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white text-[#006970] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <span className="material-symbols-outlined text-[20px] sm:text-[22px]">health_and_safety</span>
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#00152d]">Kondisi Keselamatan Mendesak Saat Ini</h3>
                      <p className="text-[11px] sm:text-xs text-[#44474d] mt-0.5 leading-relaxed">
                        Apakah ancaman bahaya fisik masih berlangsung atau santri memerlukan pertolongan segera malam ini?
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ba1a1a]"></div>
                  </label>
                </div>

                {isUrgent ? (
                  <div className="p-3 rounded-lg bg-red-50 text-red-800 text-xs flex items-start gap-2 border border-red-200">
                    <span className="material-symbols-outlined text-[18px] text-red-600 shrink-0">priority_high</span>
                    <p className="leading-relaxed text-[11px] sm:text-xs">
                      <strong>Perhatian Khusus:</strong> Jika Anda butuh bantuan fisik segera malam ini, hubungi Posko Asatidz 24 Jam (Hotline: <strong>0800-1-SANTRI</strong>). Laporan ini akan diprioritaskan darurat.
                    </p>
                  </div>
                ) : (
                  <div className="text-[11px] sm:text-xs text-[#44474d] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0">check_circle</span>
                    <span>Kondisi saat ini relatif terkendali dari bahaya langsung.</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center justify-center gap-1 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Sebelumnya</span>
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#00152d] text-white text-xs sm:text-sm font-semibold hover:bg-[#006970] transition-colors cursor-pointer"
                >
                  <span>Lanjut: Uraian Cerita</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: URAIAN & BANTUAN */}
          {currentStep === 3 && (
            <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-5">
              <div>
                <span className="text-xs text-[#006970] font-bold uppercase tracking-wider">Langkah 03 / 04</span>
                <h2 className="text-lg sm:text-xl font-bold text-[#00152d] mt-0.5">Uraian Cerita & Kebutuhan Bantuan</h2>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs sm:text-sm font-bold text-[#00152d]">
                    Ceritakan Apa yang Terjadi Secara Santai <span className="text-red-500">*</span>
                  </label>
                  <span className="font-mono text-[11px] text-slate-400">{description.length} karakter</span>
                </div>

                <div className="p-2.5 sm:p-3 mb-2 rounded-xl bg-[#eff4ff] border border-[#006970]/20 text-[11px] sm:text-xs text-[#44474d] leading-relaxed">
                  Ceritakan apa yang terjadi dengan tenang. Anda tidak perlu menyebutkan nama jika merasa belum aman. Tulislah apa saja yang Anda rasakan atau apa yang Anda harapkan dari tim pendamping santri.
                </div>

                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ceritakan dengan bahasa sehari-hari Anda... contoh: 'Beberapa waktu belakangan ini setiap malam setelah muthala\'ah, ada santri yang sering dipalak dan diancam bila melapor...'"
                  className="w-full p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#00152d] focus:bg-white focus:outline-none focus:border-[#006970] leading-relaxed resize-y"
                />

                <p className="mt-1 text-[11px] text-[#44474d] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#006970] shrink-0">shield</span>
                  Kerahasiaan terjaga. Jangan menulis nomor HP pribadi Anda di sini jika ingin tetap anonim seutuhnya.
                </p>
              </div>

              {/* Optional attachment */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs sm:text-sm font-semibold text-[#00152d]">Lampiran Bukti (Opsional)</label>
                  <span className="text-[11px] text-[#006970]">Opsional • Tidak wajib</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 text-center flex flex-col items-center justify-center relative cursor-pointer hover:bg-slate-100 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <span className="material-symbols-outlined text-[22px] text-[#006970] mb-0.5">cloud_upload</span>
                  <p className="text-xs font-semibold text-[#00152d]">Klik untuk melampirkan berkas (foto/catatan memo)</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">JPG, PNG, PDF (Maks. 10MB) — Metadata otomatis disterilkan.</p>
                  {attachmentName && (
                    <span className="mt-2 text-xs font-mono text-[#006970] bg-white px-2 py-0.5 rounded border border-[#006970]/30 font-bold truncate max-w-full">
                      Berkas: {attachmentName}
                    </span>
                  )}
                </div>
              </div>

              {/* Consent checkbox */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#eff4ff] border border-slate-200">
                <label className="flex items-start gap-2.5 sm:gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#006970] focus:ring-0 cursor-pointer shrink-0"
                  />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#00152d]">Pernyataan Kejujuran & Perlindungan Amanah</p>
                    <p className="text-[11px] sm:text-xs text-[#44474d] leading-relaxed mt-0.5">
                      Saya menyampaikan peristiwa ini atas dasar niat menjaga keselamatan jiwa (*Himayatun-Nafs*) di pondok pesantren tanpa maksud memfitnah sesama santri.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center justify-center gap-1 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Sebelumnya</span>
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#00152d] text-white text-xs sm:text-sm font-semibold hover:bg-[#006970] transition-colors cursor-pointer"
                >
                  <span>Lanjut: Tinjau & Simpan</span>
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: TINJAU & KIRIM */}
          {currentStep === 4 && (
            <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-5">
              <div>
                <span className="text-xs text-[#006970] font-bold uppercase tracking-wider">Langkah 04 / 04</span>
                <h2 className="text-lg sm:text-xl font-bold text-[#00152d] mt-0.5">Tinjau Ringkasan Sebelum Mengirim</h2>
                <p className="text-xs sm:text-sm text-[#44474d] mt-1 leading-relaxed">
                  Periksalah kembali ringkasan laporan Anda sebelum sistem mengenkripsi dan menerbitkan kode lacak unik santri.
                </p>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 flex items-start justify-between border border-slate-100 gap-2">
                  <div className="min-w-0">
                    <span className="text-[11px] text-slate-400 block">Kategori Insiden</span>
                    <span className="text-xs sm:text-sm font-bold text-[#00152d] break-words">{category || 'Belum dipilih'}</span>
                  </div>
                  <button onClick={() => setCurrentStep(1)} className="text-xs text-[#006970] hover:underline font-semibold cursor-pointer shrink-0">
                    Ubah
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 flex items-start justify-between border border-slate-100 gap-2">
                    <div className="min-w-0">
                      <span className="text-[11px] text-slate-400 block">Perkiraan Waktu</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#00152d] truncate block">{timeEstimate}</span>
                    </div>
                    <button onClick={() => setCurrentStep(2)} className="text-xs text-[#006970] hover:underline font-semibold cursor-pointer shrink-0">
                      Ubah
                    </button>
                  </div>
                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 flex items-start justify-between border border-slate-100 gap-2">
                    <div className="min-w-0">
                      <span className="text-[11px] text-slate-400 block">Lokasi Makro Lingkungan</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#00152d] truncate block">{macroLocation}</span>
                    </div>
                    <button onClick={() => setCurrentStep(2)} className="text-xs text-[#006970] hover:underline font-semibold cursor-pointer shrink-0">
                      Ubah
                    </button>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-slate-400 block">Uraian Kejadian</span>
                    <button onClick={() => setCurrentStep(3)} className="text-xs text-[#006970] hover:underline font-semibold cursor-pointer">
                      Ubah
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-[#00152d] whitespace-pre-line leading-relaxed italic bg-white p-3 rounded-lg border border-slate-100 break-words">
                    "{description}"
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 border border-slate-100 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Status Kegawatan</span>
                    <span className={`font-bold ${isUrgent ? 'text-[#ba1a1a]' : 'text-[#006970]'}`}>
                      {isUrgent ? 'MENDESAK / BUTUH TINDAKAN CEPAT' : 'Kondisi Relatif Terkendali'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Lampiran</span>
                    <span className="text-slate-700">
                      {attachmentName || 'Tanpa berkas lampiran'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-[#eff4ff] border border-[#006970]/30 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[20px] text-[#006970] shrink-0 mt-0.5">shield_lock</span>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  Setelah dikirim, sistem akan menerbitkan <strong className="font-mono text-[#00152d]">Kode Tiket Anonim</strong>. Catat atau salin kode tersebut untuk memantau respons konselor pesantren di halaman Lacak Status.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center justify-center gap-1 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Perbaiki Kembali</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#006970] text-white text-xs sm:text-sm font-bold hover:bg-[#00152d] transition-all shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Kirim Laporan Secara Aman</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CONFIRMATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#00152d]/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-5 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="w-12 h-12 rounded-full bg-[#94f1fa]/40 text-[#006970] flex items-center justify-center mx-auto shrink-0">
              <span className="material-symbols-outlined text-[28px]">lock</span>
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-[#00152d]">Konfirmasi Pengiriman Laporan</h3>
              <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                Setelah dikirim, laporan ini akan langsung masuk ke brankas privasi Satgas Perlindungan Santri Himayatun-Nafs. Pastikan tidak ada data identitas pribadi Anda yang tertulis di uraian jika ingin tetap anonim.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-[#eff4ff] text-xs text-[#44474d] text-center font-semibold">
              Status: <span className="text-[#006970]">100% Bebas Identitas (Anonim)</span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Batal & Tinjau Ulang
              </button>
              <button
                type="button"
                onClick={confirmSubmission}
                className="px-5 py-2.5 rounded-xl bg-[#006970] text-white text-xs font-bold hover:bg-[#00152d] transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Ya, Kirim Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
