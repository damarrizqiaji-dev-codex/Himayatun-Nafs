export type ProtectStageKey = 'P' | 'R' | 'O' | 'T' | 'E' | 'C' | 'T_FINAL';

export interface ProtectStageInfo {
  key: ProtectStageKey;
  code: string;
  name: string;
  actor: string;
  description: string;
}

export const PROTECT_STAGES: Record<ProtectStageKey, ProtectStageInfo> = {
  P: {
    key: 'P',
    code: '[P] Tahap 1',
    name: 'Pelaporan Anonim',
    actor: 'Santri / Saksi',
    description: 'Enkripsi data formulir selesai. Berkas disegel anonim tanpa merekam identitas perangkat.',
  },
  R: {
    key: 'R',
    code: '[R] Tahap 2',
    name: 'Review Objektif',
    actor: 'Tim Verifikasi',
    description: 'Penelaahan fakta awal oleh tim verifikator satgas tanpa berprasangka.',
  },
  O: {
    key: 'O',
    code: '[O] Tahap 3',
    name: 'Organisasi Risiko',
    actor: 'Triase Satgas',
    description: 'Klasifikasi risiko manusiawi (Ringan, Sedang, Tinggi, Darurat) dan penentuan tindak awal.',
  },
  T: {
    key: 'T',
    code: '[T] Tahap 4',
    name: 'Tindakan Terarah',
    actor: 'Asatidz Mediasi',
    description: 'Langkah perlindungan santun: patroli senyap, rotasi lorong, atau perlindungan langsung.',
  },
  E: {
    key: 'E',
    code: '[E] Tahap 5',
    name: 'Empati & Pulih',
    actor: 'Konselor Pondok',
    description: 'Pendampingan emosional, doa bersama, dan konseling empatik santri di Bilik Aman.',
  },
  C: {
    key: 'C',
    code: '[C] Tahap 6',
    name: 'Continuity Monitor',
    actor: 'Pengurus Kamar',
    description: 'Pemantauan iklim interaksi kamar santri selama 14-30 hari demi mencegah intimidasi ulang.',
  },
  T_FINAL: {
    key: 'T_FINAL',
    code: '[T] Tahap 7',
    name: 'Tuntas & Evaluasi',
    actor: 'Majelis Pengasuh',
    description: 'Penutupan berkas formal, laporan evaluasi tata tertib pondok kepada Pengasuh Kiai.',
  },
};

export type RiskLevel = 'belum_ditentukan' | 'ringan' | 'sedang' | 'tinggi' | 'darurat';

export interface PublicMessage {
  id: string;
  senderRole: string; // e.g. "Tim Satgas & Pengasuh"
  message: string;
  timestamp: string;
}

export interface InternalNote {
  id: string;
  authorRole: string; // e.g. "Petugas Perlindungan", "Konselor Bilik Aman"
  note: string;
  timestamp: string;
}

export interface ReferralRecord {
  id: string;
  type: string; // e.g. "Konseling Sebaya di Bilik Aman"
  notes: string;
  status: 'Direncanakan' | 'Berjalan' | 'Selesai';
  timestamp: string;
}

export interface ActivityLogItem {
  id: string;
  actorRole: string; // "Petugas Perlindungan", "Pengawas", "Sistem", "Pelapor"
  action: string;
  timestamp: string;
}

export interface EscalationRecord {
  recordedAt: string;
  recordedBy: string;
  steps: string[]; // placeholder steps
  partiesContacted: string[]; // placeholder parties
  notes: string;
}

export interface VerificationChecklist {
  infoCukup: boolean;
  perluKlarifikasi: boolean;
  kategoriSesuai: boolean;
}

export interface ReportItem {
  id: string; // Ticket code, e.g. "HN-2026-8942-AMN"
  category: string;
  timeEstimate: string;
  macroLocation: string;
  isUrgentFromReporter: boolean;
  description: string;
  attachmentName?: string;
  createdAt: string;
  updatedAt: string;
  daysSinceUpdate: number; // Demo backlog calculation

  // Verification panel
  verification: VerificationChecklist;

  // Manual Risk Classification (Human decided)
  riskLevel: RiskLevel;
  riskReason: string;
  riskAssessedBy?: string;
  riskAssessedAt?: string;

  // Escalation if risk is Tinggi or Darurat
  escalation?: EscalationRecord;

  // Protect Stage
  currentStage: ProtectStageKey;

  // Separate messages & notes
  publicMessages: PublicMessage[];
  internalNotes: InternalNote[];

  // Referral / Pendampingan
  referrals: ReferralRecord[];

  // Activity Logs
  activityLogs: ActivityLogItem[];
}

export type UserRole = 'publik' | 'petugas' | 'pengawas';
