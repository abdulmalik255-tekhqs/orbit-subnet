import React from "react";
import { HiOutlineKey, HiPlay, HiRefresh } from "react-icons/hi";
// import { LuWand2 } from "react-icons/lu";

const WizardNavbar = ({ currentStep, onRun, isLoading, isApiSuccess }) => {
  return (
    <nav className="h-16 border-b border-[#1e293b] bg-[#0a0f1d] flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center font-bold text-white text-lg">
          RY
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-white font-bold text-lg tracking-tight">
            RYT
          </span>
          <span className="text-blue-500 font-semibold text-lg">Orbit</span>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-600/50 bg-blue-600/10 text-blue-400 text-xs font-bold ring-1 ring-blue-600/20">
            {/* <LuWand2 size={14} className="mt-0.5" /> */}
            CREATE
          </div>
          <div className="w-20 h-[1px] bg-gradient-to-r from-blue-600/50 to-gray-700"></div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-800 bg-gray-900/50 text-gray-500 text-xs font-bold">
            <HiOutlineKey size={14} />
            DEPLOY
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-green-950/20 px-3 py-1.5 rounded-md border border-green-500/20">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-green-500 text-[10px] font-bold uppercase tracking-wider">
            Titan Testnet
          </span>
        </div>
      </div>
    </nav>
  );
};

export default WizardNavbar;
