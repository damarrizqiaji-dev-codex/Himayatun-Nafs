import { ReportItem, UserRole } from '../types/report';

const STORAGE_KEY = 'himayatun_nafs_reports_v2';
const ROLE_KEY = 'himayatun_nafs_current_role';

const INITIAL_DEMO_REPORTS: ReportItem[] = [
  {
    id: 'HN-2026-8942-AMN',
    category: 'Perundungan / Bullying (pengucilan, pemalakan uang saku, ejekan berulang)',
    timeEstimate: 'Pekan ini (1 - 7 hari lalu)',
    macroLocation: 'Asrama Putra',
    isUrgentFromReporter: false,
    description:
      'Beberapa waktu belakangan ini setiap malam setelah muthala\'ah, ada santri satu angkatan yang sering dipalak uang saku dan diancam bila melapor kepada ustadz pembina kamar.',
    attachmentName: 'catatan_kejadian_tertutup.jpg',
    createdAt: '24 Feb 2026, 09:15 WIB',
    updatedAt: '25 Feb 2026, 11:20 WIB',
    daysSinceUpdate: 1,
    verification: {
      infoCukup: true,
      perluKlarifikasi: false,
      kategoriSesuai: true,
    },
    riskLevel: 'sedang',
    riskReason: 'Terjadi intimidasi berulang tanpa kekerasan fisik akut, memerlukan mediasi damai dan proteksi kamar tertutup.',
    riskAssessedBy: 'Petugas Perlindungan (Ustadz Ridwan)',
    riskAssessedAt: '24 Feb 2026, 14:00 WIB',
    currentStage: 'T',
    publicMessages: [
      {
        id: 'pub-1',
        senderRole: 'Tim Satgas & Pengasuh',
        message:
          'Laporan ananda telah ditelaah secara teliti oleh Tim Petugas Perlindungan Santri. Langkah verifikasi awal telah dilakukan secara tertutup tanpa menyebutkan nama atau identitas siapa pun. Pembina asrama telah meningkatkan pengawasan berkala di area terkait secara tenang. Ananda tetap aman, terlindungi, dan tidak sendirian.',
        timestamp: '25 Feb 2026, 11:20 WIB',
      },
    ],
    internalNotes: [
      {
        id: 'int-1',
        authorRole: 'Petugas Perlindungan',
        note: 'Pola terjadi di lantai 2 asrama putra barat. Disarankan koordinasi senyap dengan Lurah Pondok tanpa memanggil santri secara terbuka agar tidak memicu kecurigaan teman sekamar.',
        timestamp: '24 Feb 2026, 10:30 WIB',
      },
      {
        id: 'int-2',
        authorRole: 'Konselor Pondok',
        note: 'Jadwal observasi malam disepakati jam 22.00-23.30 oleh asatidz piket harian.',
        timestamp: '25 Feb 2026, 08:15 WIB',
      },
    ],
    referrals: [
      {
        id: 'ref-1',
        type: 'Konseling Sebaya di Bilik Aman',
        notes: 'Disiapkan sesi temu empatik informal di bilik musyawarah santri.',
        status: 'Berjalan',
        timestamp: '25 Feb 2026, 09:00 WIB',
      },
    ],
    activityLogs: [
      {
        id: 'act-1',
        actorRole: 'Pelapor (Santri)',
        action: 'Mengirimkan berkas pelaporan anonim dengan enkripsi awal.',
        timestamp: '24 Feb 2026, 09:15 WIB',
      },
      {
        id: 'act-2',
        actorRole: 'Petugas Perlindungan',
        action: 'Melakukan telaah checklist awal verifikasi berkas: Informasi dinyatakan cukup.',
        timestamp: '24 Feb 2026, 13:40 WIB',
      },
      {
        id: 'act-3',
        actorRole: 'Petugas Perlindungan',
        action: 'Menetapkan klasifikasi risiko manusiawi: Sedang (Alasan: intimidasi berulang non-fisik).',
        timestamp: '24 Feb 2026, 14:00 WIB',
      },
      {
        id: 'act-4',
        actorRole: 'Petugas Perlindungan',
        action: 'Memperbarui tahap ke [T] Tindakan Terarah dan mengirim pesan kepastian ke pelapor.',
        timestamp: '25 Feb 2026, 11:20 WIB',
      },
    ],
  },
  {
    id: 'HN-2026-9011-URG',
    category: 'Intimidasi & Ancaman Keselamatan (tekanan psikis agar bungkam, teror santri)',
    timeEstimate: 'Hari ini (kurang dari 24 jam terakhir)',
    macroLocation: 'Asrama Putra',
    isUrgentFromReporter: true,
    description:
      'Ada ancaman kekerasan fisik yang akan dilakukan malam ini di belakang kamar mandi asrama jika uang kas tidak diserahkan. Korban merasa sangat takut keluar kamar.',
    createdAt: '26 Feb 2026, 07:45 WIB',
    updatedAt: '26 Feb 2026, 08:30 WIB',
    daysSinceUpdate: 0,
    verification: {
      infoCukup: true,
      perluKlarifikasi: false,
      kategoriSesuai: true,
    },
    riskLevel: 'darurat',
    riskReason: 'Ancaman keselamatan fisik langsung dalam waktu <24 jam dengan potensi bahaya nyata.',
    riskAssessedBy: 'Petugas Perlindungan (Tim Siaga)',
    riskAssessedAt: '26 Feb 2026, 08:00 WIB',
    escalation: {
      recordedAt: '26 Feb 2026, 08:15 WIB',
      recordedBy: 'Petugas Perlindungan',
      steps: [
        '[Langkah SOP: Pemisahan fisik dan evakuasi perlindungan ke bilik aman pengasuhan]',
        '[Langkah SOP: Pengamanan lorong & patroli asatidz siaga malam ini]',
        '[Langkah SOP: Laporan tertutup kepada Majelis Pengasuh/Kiai]',
      ],
      partiesContacted: [
        '[Pihak SOP: Majelis Pengasuh / Dewan Masyayikh]',
        '[Pihak SOP: Tim Pengasuhan Asrama Pusat]',
      ],
      notes: 'Protokol perlindungan darurat diaktifkan. Penjagaan lorong diperketat segera.',
    },
    currentStage: 'T',
    publicMessages: [
      {
        id: 'pub-2',
        senderRole: 'Tim Satgas Siaga',
        message:
          'Pemberitahuan darurat: Tim asatidz telah mengamankan rute asrama dan meningkatkan siaga penuh. Ananda disarankan tetap berada di bilik musholla asrama atau mendekat ke pos ustadz piket. Anda terlindungi sepenuhnya.',
        timestamp: '26 Feb 2026, 08:30 WIB',
      },
    ],
    internalNotes: [
      {
        id: 'int-3',
        authorRole: 'Petugas Perlindungan',
        note: 'Prioritas tertinggi. Jangan lakukan pemanggilan massal. Pastikan asatidz ronda hadir sebelum jam muthalaah selesai.',
        timestamp: '26 Feb 2026, 08:05 WIB',
      },
    ],
    referrals: [
      {
        id: 'ref-2',
        type: 'Pendampingan Perlindungan Asatidz Pembina',
        notes: 'Penjagaan bilik aman tanpa stigma.',
        status: 'Berjalan',
        timestamp: '26 Feb 2026, 08:20 WIB',
      },
    ],
    activityLogs: [
      {
        id: 'act-21',
        actorRole: 'Pelapor (Santri)',
        action: 'Laporan dikirim dengan tanda mendesak (Urgent Safety Flag aktif).',
        timestamp: '26 Feb 2026, 07:45 WIB',
      },
      {
        id: 'act-22',
        actorRole: 'Petugas Perlindungan',
        action: 'Menetapkan risiko manusiawi DARURAT dan memicu alur Eskalasi SOP.',
        timestamp: '26 Feb 2026, 08:00 WIB',
      },
      {
        id: 'act-23',
        actorRole: 'Petugas Perlindungan',
        action: 'Mencatat eskalasi resmi ke Majelis Pengasuh sesuai SOP Perlindungan Pesantren.',
        timestamp: '26 Feb 2026, 08:15 WIB',
      },
    ],
  },
  {
    id: 'HN-2026-1188-BTA',
    category: 'Batas Kehormatan & Aurat (sentuhan tanpa izin, pelanggaran privasi bilik mandi/kamar)',
    timeEstimate: 'Kemarin',
    macroLocation: 'Asrama Putri',
    isUrgentFromReporter: false,
    description:
      'Terjadi pelanggaran batasan aurat dan privasi bilik istirahat santriwati oleh oknum pengurus kamar tanpa izin syar\'i.',
    createdAt: '23 Feb 2026, 16:20 WIB',
    updatedAt: '24 Feb 2026, 10:00 WIB',
    daysSinceUpdate: 2,
    verification: {
      infoCukup: true,
      perluKlarifikasi: false,
      kategoriSesuai: true,
    },
    riskLevel: 'tinggi',
    riskReason: 'Menyangkut kehormatan diri (Hifzhul \'Irdh) santriwati yang memerlukan penanganan Bu Nyai/Ustadzah Pembina secara tertutup.',
    riskAssessedBy: 'Petugas Perlindungan (Ustadzah Nurul)',
    riskAssessedAt: '23 Feb 2026, 18:00 WIB',
    escalation: {
      recordedAt: '23 Feb 2026, 18:30 WIB',
      recordedBy: 'Petugas Perlindungan',
      steps: [
        '[Langkah SOP: Klarifikasi tertutup bersama Bu Nyai / Ustadzah Sepuh]',
        '[Langkah SOP: Evaluasi penugasan pengurus kamar yang dilaporkan]',
      ],
      partiesContacted: [
        '[Pihak SOP: Bu Nyai / Pengasuh Asrama Putri]',
        '[Pihak SOP: Konselor Putri Berlisensi]',
      ],
      notes: 'Pemeriksaan etis tertutup tanpa membuka aib di hadapan santriwati lain.',
    },
    currentStage: 'T',
    publicMessages: [
      {
        id: 'pub-3',
        senderRole: 'Tim Pembina Putri',
        message:
          'Laporan ananda sedang ditangani secara langsung oleh Ibu Pengasuh dengan adab kerahasiaan penuh. Segala tata tertib batas asrama sedang dievaluasi ketat.',
        timestamp: '24 Feb 2026, 10:00 WIB',
      },
    ],
    internalNotes: [
      {
        id: 'int-4',
        authorRole: 'Petugas Perlindungan',
        note: 'Menjaga marwah santriwati adalah prioritas. Tidak melibatkan asatidz putra.',
        timestamp: '23 Feb 2026, 17:00 WIB',
      },
    ],
    referrals: [
      {
        id: 'ref-3',
        type: 'Konseling Khusus Bu Nyai / Ustadzah',
        notes: 'Pendampingan kejiwaan tenang di wisma pengasuhan.',
        status: 'Berjalan',
        timestamp: '24 Feb 2026, 09:30 WIB',
      },
    ],
    activityLogs: [
      {
        id: 'act-31',
        actorRole: 'Pelapor (Santri)',
        action: 'Laporan anonim terdaftar.',
        timestamp: '23 Feb 2026, 16:20 WIB',
      },
      {
        id: 'act-32',
        actorRole: 'Petugas Perlindungan',
        action: 'Klasifikasi risiko Tinggi ditetapkan dan eskalasi dicatat ke Bu Nyai.',
        timestamp: '23 Feb 2026, 18:30 WIB',
      },
    ],
  },
  {
    id: 'HN-2026-4102-RHM',
    category: 'Kendala Kesejahteraan & Pengasuhan Lainnya (kesehatan diabaikan, diskriminasi)',
    timeEstimate: 'Lebih dari sebulan yang lalu',
    macroLocation: 'Dapur / Kantin / Koperasi Santri',
    isUrgentFromReporter: false,
    description:
      'Keluhan perihal penanganan santri yang sakit demam di asrama lambat direspon oleh bagian piket kesehatan dan perlu pembenahan operasional poskestren.',
    createdAt: '18 Feb 2026, 10:00 WIB',
    updatedAt: '21 Feb 2026, 14:20 WIB',
    daysSinceUpdate: 5,
    verification: {
      infoCukup: true,
      perluKlarifikasi: false,
      kategoriSesuai: true,
    },
    riskLevel: 'ringan',
    riskReason: 'Isu operasional kesejahteraan tanpa ancaman kekerasan, dapat diselesaikan lewat evaluasi tata kelola poskestren.',
    riskAssessedBy: 'Petugas Perlindungan',
    riskAssessedAt: '18 Feb 2026, 11:30 WIB',
    currentStage: 'T_FINAL',
    publicMessages: [
      {
        id: 'pub-4',
        senderRole: 'Tim Pengasuh Pesantren',
        message:
          'Alhamdulillah usulan dan aduan telah ditindaklanjuti. SOP piket Poskestren telah direvisi dan dokter jaga pondok kini disiagakan 24 jam dengan obat-obatan lengkap.',
        timestamp: '21 Feb 2026, 14:20 WIB',
      },
    ],
    internalNotes: [
      {
        id: 'int-5',
        authorRole: 'Petugas Perlindungan',
        note: 'Pengurus Poskestren telah dibina oleh Majelis Masyaikh dan rotasi jaga diperbaharui.',
        timestamp: '21 Feb 2026, 13:00 WIB',
      },
    ],
    referrals: [],
    activityLogs: [
      {
        id: 'act-41',
        actorRole: 'Pelapor (Santri)',
        action: 'Laporan anonim terdaftar.',
        timestamp: '18 Feb 2026, 10:00 WIB',
      },
      {
        id: 'act-42',
        actorRole: 'Petugas Perlindungan',
        action: 'Berkas diselesaikan secara tuntas [Tuntas & Evaluasi].',
        timestamp: '21 Feb 2026, 14:20 WIB',
      },
    ],
  },
  {
    id: 'HN-2026-5521-KLS',
    category: 'Kekerasan Verbal & Kehormatan (caci maki, perendahan martabat di depan umum)',
    timeEstimate: 'Berulang kali / pola berkala',
    macroLocation: 'Area Madrasah / Kompleks Kelas',
    isUrgentFromReporter: false,
    description:
      'Ada beberapa kali ejekan martabat nasab dan daerah asal santri baru saat jam istirahat muthala\'ah siang.',
    createdAt: '16 Feb 2026, 13:10 WIB',
    updatedAt: '16 Feb 2026, 13:10 WIB',
    daysSinceUpdate: 10, // Backlog alert (> 7 days without update!)
    verification: {
      infoCukup: false,
      perluKlarifikasi: true,
      kategoriSesuai: true,
    },
    riskLevel: 'belum_ditentukan',
    riskReason: '',
    currentStage: 'R',
    publicMessages: [
      {
        id: 'pub-5',
        senderRole: 'Tim Verifikasi',
        message:
          'Laporan sedang dalam penelaahan awal. Mohon jika ada waktu yang lebih spesifik atau lokasi kelas, dapat disampaikan lewat pesan tambahan.',
        timestamp: '16 Feb 2026, 13:45 WIB',
      },
    ],
    internalNotes: [
      {
        id: 'int-6',
        authorRole: 'Petugas Perlindungan',
        note: 'Menunggu klarifikasi rentang jam kejadian di madrasah.',
        timestamp: '16 Feb 2026, 13:30 WIB',
      },
    ],
    referrals: [],
    activityLogs: [
      {
        id: 'act-51',
        actorRole: 'Pelapor (Santri)',
        action: 'Laporan anonim terdaftar.',
        timestamp: '16 Feb 2026, 13:10 WIB',
      },
    ],
  },
];

export const storageService = {
  getReports(): ReportItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REPORTS));
        return INITIAL_DEMO_REPORTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_DEMO_REPORTS;
    }
  },

  getReportById(id: string): ReportItem | undefined {
    const list = this.getReports();
    const cleanId = id.trim().toUpperCase();
    return list.find((item) => item.id.toUpperCase() === cleanId);
  },

  saveReport(updated: ReportItem): void {
    const list = this.getReports();
    const index = list.findIndex((item) => item.id === updated.id);
    if (index >= 0) {
      list[index] = updated;
    } else {
      list.unshift(updated);
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new Event('storage_update'));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  },

  addReport(newReport: Omit<ReportItem, 'createdAt' | 'updatedAt' | 'daysSinceUpdate' | 'verification' | 'riskLevel' | 'riskReason' | 'currentStage' | 'publicMessages' | 'internalNotes' | 'referrals' | 'activityLogs'>): ReportItem {
    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }) + ' • ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    const fullReport: ReportItem = {
      ...newReport,
      createdAt: nowStr,
      updatedAt: nowStr,
      daysSinceUpdate: 0,
      verification: {
        infoCukup: false,
        perluKlarifikasi: false,
        kategoriSesuai: true,
      },
      riskLevel: 'belum_ditentukan',
      riskReason: '',
      currentStage: 'P',
      publicMessages: [
        {
          id: 'pub-' + Date.now(),
          senderRole: 'Sistem Penerimaan Himayatun-Nafs',
          message: 'Laporan anonim Anda telah berhasil disegel dan masuk ke antrean verifikasi satgas. Simpan kode tiket Anda dengan cermat.',
          timestamp: nowStr,
        },
      ],
      internalNotes: [],
      referrals: [],
      activityLogs: [
        {
          id: 'act-' + Date.now(),
          actorRole: 'Pelapor (Santri)',
          action: 'Laporan baru dibuat secara anonim dan terenkripsi.',
          timestamp: nowStr,
        },
      ],
    };

    const list = this.getReports();
    list.unshift(fullReport);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event('storage_update'));
    return fullReport;
  },

  updateReport(id: string, updates: Partial<ReportItem>): ReportItem | undefined {
    const current = this.getReportById(id);
    if (!current) return undefined;

    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }) + ' • ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    const merged: ReportItem = {
      ...current,
      ...updates,
      updatedAt: nowStr,
      daysSinceUpdate: 0,
    };

    this.saveReport(merged);
    return merged;
  },

  addActivityLog(id: string, actorRole: string, action: string): void {
    const report = this.getReportById(id);
    if (!report) return;

    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }) + ' • ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    const newLog = {
      id: 'act-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
      actorRole,
      action,
      timestamp: nowStr,
    };

    report.activityLogs.unshift(newLog);
    this.saveReport(report);
  },

  addPublicMessage(id: string, message: string, senderRole = 'Tim Petugas Perlindungan'): void {
    const report = this.getReportById(id);
    if (!report) return;

    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }) + ' • ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    const newMsg = {
      id: 'pub-' + Date.now(),
      senderRole,
      message,
      timestamp: nowStr,
    };

    report.publicMessages.unshift(newMsg);
    this.addActivityLog(id, senderRole, `Mengirim pesan publik ke pelapor: "${message.substring(0, 40)}..."`);
    this.saveReport(report);
  },

  addInternalNote(id: string, note: string, authorRole = 'Petugas Perlindungan'): void {
    const report = this.getReportById(id);
    if (!report) return;

    const nowStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }) + ' • ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    const newNote = {
      id: 'int-' + Date.now(),
      authorRole,
      note,
      timestamp: nowStr,
    };

    report.internalNotes.unshift(newNote);
    this.addActivityLog(id, authorRole, `Menambahkan catatan internal rahasia.`);
    this.saveReport(report);
  },

  getCurrentRole(): UserRole {
    return (localStorage.getItem(ROLE_KEY) as UserRole) || 'publik';
  },

  setCurrentRole(role: UserRole): void {
    localStorage.setItem(ROLE_KEY, role);
    window.dispatchEvent(new Event('role_update'));
  },

  resetDefaults(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REPORTS));
    window.dispatchEvent(new Event('storage_update'));
  },
};
