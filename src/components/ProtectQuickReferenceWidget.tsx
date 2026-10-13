import React, { useState } from 'react';
import { ProtectStageKey, PROTECT_STAGES } from '../types/report';
import { DETAILED_PROTECT_GUIDE } from './ProtectVisualGuideModal';

interface ProtectQuickReferenceWidgetProps {
  currentReportStage?: ProtectStageKey;
  onApplyStage?: (stageKey: ProtectStageKey) => void;
  onApplyMessageDraft?: (draftMessage: string) => void;
  className?: string;
  defaultExpanded?: boolean;
}

export const ProtectQuickReferenceWidget: React.FC<ProtectQuickReferenceWidgetProps> = ({
  currentReportStage = 'P',
  onApplyStage,
  onApplyMessageDraft,
  className = '',
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [selectedStageKey, setSelectedStageKey] = useState<ProtectStageKey>(currentReportStage);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const stageKeys: ProtectStageKey[] = ['P', 'R', 'O', 'T', 'E', 'C', 'T_FINAL'];
  const activeGuide = DETAILED_PROTECT_GUIDE[selectedStageKey];

  const handleToggleCheck = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [`${selectedStageKey}-${item}`]: !prev[`${selectedStageKey}-${item}`],
    }));
  };

  const stageDraftMessages: Record<ProtectStageKey, string> = {
    P: 'Laporan Anda telah berhasil diregistrasi dalam sistem perlindungan santri secara aman dan rahasia. Tim petugas saat ini sedang memulai penelaahan awal.',
    R: 'Tim petugas sedang menelaah kelengkapan kronologi laporan Anda secara objektif. Bila ada klarifikasi tambahan yang diperlukan, kami akan mengabarkan melalui tiket ini.',
    O: 'Klasifikasi tingkat risiko telah ditetapkan secara proporsional. Langkah-langkah perlindungan dan pendampingan santri sedang disiapkan bersama pengasuhan.',
    T: 'Tindakan perlindungan terarah sedang dilaksanakan di lingkungan asrama secara beradab dan tertutup, tanpa membuka identitas atau sumber aduan.',
    E: 'Fase pendampingan empati dan pemulihan telah aktif. Konselor santri dan layanan pendampingan bilik aman siap mendampingi Anda.',
    C: 'Pemantauan berkala (*Continuity Monitor*) sedang berjalan untuk memastikan situasi asrama tetap kondusif dan mencegah terulangnya kejadian serupa.',
    T_FINAL: 'Penanganan aduan telah selesai secara tuntas sesuai tata tertib asrama dan SOP perlindungan pesantren. Berkas ditutup dengan tetap menjaga kehormatan semua pihak.',
  };

  return (
    <div
      className={`bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all ${className}`}
    >
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#00152d] via-[#122a46] to-[#002a3a] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-[#94f1fa] shrink-0">
            <span className="material-symbols-outlined text-[22px]">account_tree</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#94f1fa]/20 text-[#94f1fa] border border-[#94f1fa]/30">
                Rujukan Operasional Petugas
              </span>
              <span className="text-[11px] text-slate-300 hidden md:inline">SOP PROTECT Pesantren</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mt-0.5">
              Panduan Cepat Visual Protokol P-R-O-T-E-C-T
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isExpanded ? 'expand_less' : 'expand_more'}
            </span>
            <span>{isExpanded ? 'Ciutkan Panduan' : 'Buka Rujukan Cepat'}</span>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-5">
          {/* Interactive Stage Ribbon */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#00152d] uppercase tracking-wide flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#006970]">navigation</span>
                Pilih Tahap Protokol untuk Rujukan Petugas:
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                Klik huruf tahapan untuk melihat standar penanganan
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {stageKeys.map((key) => {
                const stage = PROTECT_STAGES[key];
                const isSelected = selectedStageKey === key;
                const isCurrent = currentReportStage === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedStageKey(key)}
                    className={`relative p-2 sm:p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer min-h-[64px] sm:min-h-[76px] ${
                      isSelected
                        ? 'bg-[#00152d] text-white border-[#00152d] shadow-md ring-2 ring-[#006970]/30'
                        : isCurrent
                        ? 'bg-[#eff4ff] text-[#00152d] border-[#006970] hover:bg-[#e2edff]'
                        : 'bg-slate-50 text-[#44474d] border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    {isCurrent && (
                      <span className="absolute -top-1.5 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white ring-1 ring-amber-400" title="Tahap saat ini pada laporan" />
                    )}

                    <span
                      className={`text-base sm:text-xl font-extrabold leading-none ${
                        isSelected ? 'text-[#94f1fa]' : isCurrent ? 'text-[#006970]' : 'text-[#00152d]'
                      }`}
                    >
                      {stage.letter}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold mt-1 line-clamp-1 max-w-full">
                      {stage.name.split(' ')[0]}
                    </span>
                    <span
                      className={`text-[9px] mt-0.5 hidden xs:inline ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {stage.code.replace('[', '').replace(']', '')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Guide Content Box */}
          {activeGuide && (
            <div className="bg-[#eff4ff] rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-4">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="w-8 h-8 rounded-xl bg-[#00152d] text-[#94f1fa] font-extrabold flex items-center justify-center text-sm shadow-xs">
                    {activeGuide.letter}
                  </span>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#00152d]">
                      {activeGuide.code} - {activeGuide.title}
                    </h4>
                    <span className="text-xs text-[#006970] font-medium">
                      Pelaksana SOP: <strong>{activeGuide.actor}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white text-slate-700 font-semibold border border-slate-200 shadow-2xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-amber-600">timer</span>
                    SLA: {activeGuide.sla}
                  </span>
                </div>
              </div>

              {/* Objective */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-2xs">
                <div className="text-xs font-bold text-[#00152d] uppercase tracking-wide mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-[#006970]">flag</span>
                  Tujuan Utama Tahap:
                </div>
                <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                  {activeGuide.objective}
                </p>
              </div>

              {/* Two-Column Grid: Checklist & Restrictions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Interactive Checklist for Officers */}
                <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/70 shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-[#00152d] uppercase tracking-wide flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-emerald-600">checklist</span>
                      Tindakan Wajib Petugas:
                    </div>
                    <span className="text-[10px] text-slate-400">Centang saat selesai</span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-[#44474d]">
                    {activeGuide.checklist.map((item, idx) => {
                      const isChecked = !!checkedItems[`${selectedStageKey}-${item}`];
                      return (
                        <li
                          key={idx}
                          onClick={() => handleToggleCheck(item)}
                          className={`flex items-start gap-2 p-1.5 rounded-lg cursor-pointer transition-colors ${
                            isChecked ? 'bg-emerald-50 text-emerald-900 font-medium' : 'hover:bg-slate-50'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-[18px] shrink-0 mt-0.5 ${
                              isChecked ? 'text-emerald-600' : 'text-slate-300'
                            }`}
                          >
                            {isChecked ? 'check_box' : 'check_box_outline_blank'}
                          </span>
                          <span className={isChecked ? 'line-through text-slate-500' : ''}>{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Do's & Don'ts / Privacy & Safety Restrictions */}
                <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/70 shadow-2xs space-y-2.5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-[#ba1a1a] uppercase tracking-wide flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-[#ba1a1a]">warning</span>
                      Hal yang DILARANG Dilakukan Petugas:
                    </div>
                    <div className="p-2.5 rounded-lg bg-red-50/70 border border-red-200/60 text-xs text-red-900 leading-relaxed space-y-1">
                      <p className="font-semibold">⚠️ Pantangan Mutlak:</p>
                      <p>
                        Dilarang mempertemukan korban dan terduga pelaku secara sepihak, dilarang berspekulasi tentang identitas pelapor, dan dilarang mengumumkan kronologi ke forum santri umum.
                      </p>
                    </div>

                    <div className="pt-1">
                      <span className="text-[11px] font-bold text-[#00152d] block mb-0.5">
                        Landasan Syar'i ({activeGuide.syariFoundation.split(':')[0]}):
                      </span>
                      <p className="text-xs text-[#44474d] italic">
                        {activeGuide.syariFoundation}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    Aturan Privasi: <span className="text-[#006970] font-medium">{activeGuide.privacyRule}</span>
                  </div>
                </div>
              </div>

              {/* Action Bar: Apply to Status & Copy Draft */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs text-[#00152d]">
                  <span className="material-symbols-outlined text-[16px] text-[#006970]">quickreply</span>
                  <span className="font-semibold">Draft Pesan Pelapor Tersedia</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {onApplyMessageDraft && (
                    <button
                      type="button"
                      onClick={() => onApplyMessageDraft(stageDraftMessages[selectedStageKey])}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#00152d] border border-slate-200 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px] text-[#006970]">content_copy</span>
                      <span>Salin Draf Pesan Publik</span>
                    </button>
                  )}

                  {onApplyStage && (
                    <button
                      type="button"
                      onClick={() => onApplyStage(selectedStageKey)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#006970] hover:bg-[#00152d] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">arrow_downward</span>
                      <span>Terapkan Tahap [{activeGuide.letter}] ke Formulir</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
