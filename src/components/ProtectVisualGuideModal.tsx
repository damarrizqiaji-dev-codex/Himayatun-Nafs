import React, { useState } from 'react';
import { ProtectStageKey, PROTECT_STAGES } from '../types/report';

interface DetailedStageGuide {
  key: ProtectStageKey;
  code: string;
  letter: string;
  title: string;
  actor: string;
  sla: string;
  objective: string;
  checklist: string[];
  escalationRule: string;
  privacyRule: string;
  syariFoundation: string;
  practicalExample: string;
}

export const DETAILED_PROTECT_GUIDE: Record<ProtectStageKey, DetailedStageGuide> = {
  P: {
    key: 'P',
    code: '[P] Tahap 1',
    letter: 'P',
    title: 'Pelaporan Anonim (Penerimaan Berkas)',
    actor: 'Sistem Enkripsi & Santri Pelapor',
    sla: '< 1 Jam (Registrasi Otomatis)',
    objective: 'Menerima dan menyegel kronologi santri secara aman tanpa merekam data gawai, nomor kamar spesifik, ataupun identitas akun.',
    checklist: [
      'Penerbitan kode tiket acak 16-karakter (misal: HN-2026-8942-AMN)',
      'Pemutusan log alamat IP dan data peramban seketika',
      'Pemberian pesan wasiat hifdz (penjagaan kode tiket pribadi)',
      'Penetapan tanda mendesak bila dicentang oleh pelapor',
    ],
    escalationRule: 'Bila santri menandai kondisi mendesak, notifikasi darurat internal ditandai merah di antrean petugas.',
    privacyRule: 'Kerahasiaan mutlak: tidak ada pihak manapun (termasuk admin server) yang dapat mengetahui identitas asli pelapor.',
    syariFoundation: 'Amanah: Menjaga rahasia orang yang meminta pertolongan adalah kewajiban syar\'i yang tidak boleh dikhianati.',
    practicalExample: 'Santri menuliskan peristiwa intimidasi malam hari di lorong barat lewat gawai warnet pesantren lalu mengantongi kode tiket.',
  },
  R: {
    key: 'R',
    code: '[R] Tahap 2',
    letter: 'R',
    title: 'Review Objektif (Penelaahan Awal)',
    actor: 'Petugas Triase Satgas Perlindungan',
    sla: 'Maksimal 2 - 4 Jam Kerja',
    objective: 'Mempelajari kronologi peristiwa dengan jernih, memverifikasi kecukupan informasi, dan memastikan kategori masalah tanpa berprasangka buruk.',
    checklist: [
      'Pemeriksaan logis kronologi peristiwa (waktu, lokasi makro)',
      'Verifikasi kesesuaian kategori masalah yang dipilih pelapor',
      'Pemeriksaan apakah informasi cukup atau perlu klarifikasi tambahan',
      'Menyusun draf pesan publik santun jika membutuhkan rincian tambahan',
    ],
    escalationRule: 'Jika terdapat indikasi kekerasan fisik mendesak, segera lewati telaah panjang dan picu konsultasi asatidz jaga.',
    privacyRule: 'Petugas tidak diperkenankan berspekulasi atau menebak-nebak nama pelapor dari gaya penulisan.',
    syariFoundation: 'Tabayyun: Memeriksa dan menelaah informasi secara objektif sebelum mengambil kesimpulan atau tindakan.',
    practicalExample: 'Petugas mencentang checklist verifikasi dan mengirim pesan publik melalui tiket meminta rincian perkiraan jam kejadian.',
  },
  O: {
    key: 'O',
    code: '[O] Tahap 3',
    letter: 'O',
    title: 'Organisasi Risiko (Klasifikasi Moral Manusia)',
    actor: 'Petugas Triase & Konselor Senior',
    sla: 'Maksimal 6 Jam Kerja',
    objective: 'Menetapkan tingkat risiko (Ringan, Sedang, Tinggi, Darurat) secara manusiawi dengan kewajiban mencantumkan alasan tertulis.',
    checklist: [
      'Penilaian dampak fisik, psikis, dan relasional terhadap santri',
      'Pemilihan tingkat risiko: Ringan, Sedang, Tinggi, atau Darurat',
      'Wajib mengisi alasan singkat penetapan risiko oleh manusia (non-otomatis)',
      'Pencatatan eskalasi SOP jika risiko Tinggi atau Darurat',
    ],
    escalationRule: 'Risiko Tinggi/Darurat wajib memicu panel eskalasi SOP (pemisahan fisik, patroli lorong, pemberitahuan pengasuh).',
    privacyRule: 'Alasan risiko dicatat dalam log internal dan tidak menyudutkan korban.',
    syariFoundation: 'Al-Adl wa At-Taqdir: Keadilan dan proporsionalitas dalam menimbang derajat kemudharatan (*Daf\'ul Mafasid*).',
    practicalExample: 'Petugas menetapkan risiko Sedang karena adanya ancaman verbal berulang, mencatat alasan perlunya pendampingan ustadzah.',
  },
  T: {
    key: 'T',
    code: '[T] Tahap 4',
    letter: 'T',
    title: 'Tindakan Terarah (Intervensi Santun)',
    actor: 'Asatidz Pembina, Satgas & Lurah Pondok',
    sla: '12 - 24 Jam sejak penetapan risiko',
    objective: 'Mengambil langkah protektif yang proporsional tanpa menimbulkan kepanikan atau kegaduhan di lingkungan asrama.',
    checklist: [
      'Peningkatan patroli senyap asatidz piket di area makro kejadian',
      'Pengaturan ulang jadwal kegiatan/piket kamar jika diperlukan',
      'Pemberian peringatan tertutup secara beradab tanpa membuka sumber aduan',
      'Pengamanan santri ke bilik aman jika terdapat ancaman fisik nyata',
    ],
    escalationRule: 'Koordinasi terpadu dengan Majelis Pengasuh/Kiai jika melibatkan sanksi takzir atau relokasi kamar.',
    privacyRule: 'Terlapor tidak boleh mengetahui siapa pelapornya; penindakan dibingkai sebagai penegakan tata tertib umum asrama.',
    syariFoundation: 'Ta\'awun wa Himayah: Tolong-menolong dalam menegakkan kebaikan dan mencegah kemungkaran dengan cara ma\'ruf.',
    practicalExample: 'Lurah pondok meningkatkan ronda malam di lorong lantai 2 dan memanggil santri terkait dengan dalih evaluasi kedisiplinan umum.',
  },
  E: {
    key: 'E',
    code: '[E] Tahap 5',
    letter: 'E',
    title: 'Empati & Pulih (Pendampingan Komprehensif)',
    actor: 'Konselor Pondok, Duta Sebaya & Poskestren',
    sla: '1 - 3 Hari (Berkelanjutan)',
    objective: 'Memulihkan kondisi fisik dan psikologis santri melalui konseling empatik, dukungan sebaya, dan doa bersama di Bilik Aman.',
    checklist: [
      'Sesi temu tertutup di Bilik Konseling Masjid bada shalat',
      'Pemeriksaan kesehatan di Poskestren jika ada luka atau keluhan fisik',
      'Pendampingan emosional oleh Bu Nyai / Ustadzah bagi santriwati',
      'Pencatatan rencana pendampingan ke sistem simulasi rujukan',
    ],
    escalationRule: 'Jika trauma berlanjut, jadwalkan rujukan dengan psikolog atau konselor profesional mitra pesantren.',
    privacyRule: 'Seluruh isi percakapan konseling bersifat rahasia rekam bimbingan (Protected Sanctuary).',
    syariFoundation: 'Rahmah wa Shifa: Kasih sayang tanpa batas dan ikhtiar penyembuhan batin (*syifa\' lima fish-shudur*).',
    practicalExample: 'Santri diajak minum teh hangat di bilik konseling asrama dan didengarkan keluh kesahnya tanpa dihakimi.',
  },
  C: {
    key: 'C',
    code: '[C] Tahap 6',
    letter: 'C',
    title: 'Continuity Monitor (Pemantauan Keberlanjutan)',
    actor: 'Pengurus Asrama & Wali Kamar',
    sla: '14 - 30 Hari Pengawasan Senyap',
    objective: 'Mengamati interaksi sosial di kamar dan ruang mengaji untuk memastikan tidak ada intimidasi balasan atau diskriminasi terselubung.',
    checklist: [
      'Evaluasi mingguan suasana interaksi kamar oleh wali kamar',
      'Pemeriksaan apakah pelapor mengirimkan pesan tambahan via /lacak',
      'Memastikan tidak ada perubahan sikap drastis santri dalam belajar',
      'Pencatatan catatan perkembangan berkala di log internal petugas',
    ],
    escalationRule: 'Jika ditemukan intimidasi ulang, kasus segera dikembalikan ke Tahap Tindakan dengan tingkat risiko dinaikkan.',
    privacyRule: 'Pengawasan dilakukan secara natural tanpa memberi label istimewa kepada santri pelapor.',
    syariFoundation: 'Al-Ihsan wa Al-Istiqamah: Berbuat kebajikan secara konsisten dan menjaga keselamatan jangka panjang.',
    practicalExample: 'Wali kamar mengamati saat jam muthalaah malam bahwa santri sudah kembali ceria dan membaur mengaji bersama kawan-kawan.',
  },
  T_FINAL: {
    key: 'T_FINAL',
    code: '[T] Tahap 7',
    letter: 'T',
    title: 'Tuntas & Evaluasi (Penutupan & Rekomendasi)',
    actor: 'Majelis Pengasuh / Dewan Masyayikh & Pengawas',
    sla: 'Penutupan Kasus Resmi',
    objective: 'Menutup berkas kasus setelah hak santri pulih, mendokumentasikan pembelajaran, dan memberikan rekomendasi tata tertib.',
    checklist: [
      'Verifikasi kepuasan pemulihan santri melalui pesan tiket akhir',
      'Penutupan berkas formal dengan ringkasan keberhasilan',
      'Perumusan rekomendasi perbaikan tata tertib atau fasilitas pondok',
      'Pemasukan statistik ke dashboard agregat pengawas (tanpa identitas)',
    ],
    escalationRule: 'Rekomendasi sistemik disampaikan dalam rapat pleno berkala Dewan Asatidz.',
    privacyRule: 'Data laporan diarsipkan dengan status TUNTAS, privasi tetap terlindungi selamanya.',
    syariFoundation: 'Hifzhul Ummah wa Al-Khatimah: Menjaga kemaslahatan komunitas pesantren secara luas dan menutup amanah dengan husnul khatimah.',
    practicalExample: 'Majelis Pengasuh menetapkan aturan lampu lorong dan patroli baru sebagai hasil evaluasi kasus yang telah tuntas.',
  },
};

interface ProtectVisualGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStage?: ProtectStageKey;
  onApplyStage?: (stageKey: ProtectStageKey) => void;
}

export const ProtectVisualGuideModal: React.FC<ProtectVisualGuideModalProps> = ({
  isOpen,
  onClose,
  currentStage = 'P',
  onApplyStage,
}) => {
  const [selectedKey, setSelectedKey] = useState<ProtectStageKey>(currentStage);

  if (!isOpen) return null;

  const stageKeys: ProtectStageKey[] = ['P', 'R', 'O', 'T', 'E', 'C', 'T_FINAL'];
  const activeGuide = DETAILED_PROTECT_GUIDE[selectedKey];

  return (
    <div className="fixed inset-0 z-50 bg-[#00152d]/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#00152d] text-white p-4 sm:p-6 flex items-start sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#006970] to-[#122a46] flex items-center justify-center text-[#94f1fa] shrink-0 border border-[#94f1fa]/30">
              <span className="material-symbols-outlined text-[22px] sm:text-[24px]">account_tree</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#94f1fa] bg-[#122a46] px-2 py-0.5 rounded-full border border-[#94f1fa]/20">
                  Panduan Visual SOP Petugas
                </span>
                <span className="text-[11px] text-slate-300 hidden sm:inline">• SantriVision 2026</span>
              </div>
              <h2 className="text-base sm:text-xl font-bold tracking-tight text-white mt-0.5">
                Rujukan Cepat Tahapan Protokol PROTECT
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Tutup panduan"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">close</span>
          </button>
        </div>

        {/* Horizontal Interactive Stage Stepper */}
        <div className="bg-[#eff4ff] border-b border-slate-200 px-3 sm:px-6 py-2.5 sm:py-3 shrink-0 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
            {stageKeys.map((key, idx) => {
              const guide = DETAILED_PROTECT_GUIDE[key];
              const isSelected = selectedKey === key;
              const isCurrent = currentStage === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedKey(key)}
                  className={`px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    isSelected
                      ? 'bg-[#00152d] text-white border-[#00152d] shadow-sm'
                      : 'bg-white text-[#00152d] border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                  type="button"
                >
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${
                      isSelected
                        ? 'bg-[#006970] text-[#94f1fa]'
                        : 'bg-slate-100 text-[#00152d]'
                    }`}
                  >
                    {key === 'T_FINAL' ? 'T7' : guide.letter}
                  </span>
                  <span className="truncate max-w-[110px] sm:max-w-none text-left">
                    {guide.title.split('(')[0].trim()}
                  </span>
                  {isCurrent && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" title="Tahap berkas saat ini" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1 text-[#00152d]">
          {/* Header Tile */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#eff4ff] to-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#00152d] text-[#94f1fa] font-mono text-xs font-bold">
                  {activeGuide.code}
                </span>
                <span className="text-xs font-semibold text-[#006970] bg-[#eff4ff] px-2 py-0.5 rounded-full border border-[#006970]/20">
                  Pelaksana: {activeGuide.actor}
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-extrabold text-[#00152d] mt-1.5 leading-snug">
                {activeGuide.title}
              </h3>
            </div>

            <div className="flex flex-col sm:items-end shrink-0 text-xs">
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Target Waktu (SLA):</span>
              <span className="font-mono font-bold text-[#ba1a1a] bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg mt-0.5">
                {activeGuide.sla}
              </span>
            </div>
          </div>

          {/* Grid 2 Columns for details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-start">
            {/* Left Col: Objective & Checklist (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#006970] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px]">target</span>
                  Tujuan Utama Tahap Ini
                </h4>
                <p className="text-xs sm:text-sm text-[#00152d] leading-relaxed">
                  {activeGuide.objective}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#00152d] flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <span className="material-symbols-outlined text-[17px] text-[#006970]">checklist</span>
                  Daftar Periksa Petugas (Checklist Tindakan SOP)
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {activeGuide.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="text-[#44474d] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#eff4ff] border border-slate-200/80 space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#00152d] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px] text-[#006970]">lightbulb</span>
                  Contoh Kasus Praktis di Pesantren
                </h4>
                <p className="text-xs text-[#44474d] leading-relaxed italic">
                  "{activeGuide.practicalExample}"
                </p>
              </div>
            </div>

            {/* Right Col: Syari Foundation, Escalation, Privacy (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="p-4 rounded-2xl bg-[#e5eeff] border border-slate-200 space-y-1.5 border-l-4 border-l-[#006970]">
                <h4 className="text-xs font-bold text-[#00152d] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px] text-[#006970]">balance</span>
                  Landasan Maqashid Syari'ah
                </h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  {activeGuide.syariFoundation}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px] text-amber-700">warning</span>
                  Aturan Eskalasi & Jalur Cepat
                </h4>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {activeGuide.escalationRule}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h4 className="text-xs font-bold text-[#00152d] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px] text-[#006970]">lock</span>
                  Protokol Penjagaan Kerahasiaan
                </h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  {activeGuide.privacyRule}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-3.5 sm:p-4 px-4 sm:px-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
          <div className="text-xs text-slate-500">
            Sedang menelaah: <strong className="text-[#00152d]">{activeGuide.code} - {activeGuide.name}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              type="button"
            >
              Tutup Rujukan
            </button>

            {onApplyStage && (
              <button
                onClick={() => {
                  onApplyStage(selectedKey);
                  onClose();
                }}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#00152d] hover:bg-[#006970] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Pilih Tahap {activeGuide.letter} untuk Berkas Ini</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
