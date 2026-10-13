import React, { useEffect } from 'react';

export const QuickExit: React.FC = () => {
  const handleEscape = () => {
    window.location.replace('https://kemenag.go.id');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleEscape();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 max-w-[calc(100vw-1.5rem)]">
      <button
        onClick={handleEscape}
        className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2.5 bg-[#00152d]/95 backdrop-blur-md text-white rounded-full shadow-xl hover:bg-[#122a46] hover:shadow-[#00152d]/30 transition-all active:scale-95 text-[11px] sm:text-xs font-semibold border border-slate-700/80 cursor-pointer"
        title="Bilik Aman: Langsung bersihkan layar dan beralih ke portal Kementerian Agama RI (Tekan Esc)"
        type="button"
      >
        <span className="material-symbols-outlined text-[15px] sm:text-[18px] text-[#94f1fa] shrink-0">power_settings_new</span>
        <span className="truncate">Bilik Aman (Esc)</span>
      </button>
    </div>
  );
};
