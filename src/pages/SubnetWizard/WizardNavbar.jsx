import React from "react";
import { HiOutlineKey } from "react-icons/hi";
import { VscGitPullRequestCreate } from "react-icons/vsc";

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
          <span className="text-blue-500 font-semibold text-lg animate-pulse">
            Orbit
          </span>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="flex items-center gap-3">
          {/* Phase 1: CREATE */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-600/50 bg-blue-600/10 text-blue-400 text-xs font-bold ring-1 ring-blue-600/20 shadow-[0_0_10px_rgba(37,99,235,0.2)] transition-all duration-500">
            <VscGitPullRequestCreate size={14} className="mt-0.5" />
            CREATE
          </div>

          {/* Connector Line with sliding animation */}
          <div className="w-20 h-[1px] relative bg-gray-700/50 overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 transition-transform duration-1000 ease-in-out ${
                currentStep >= 4 ? "translate-x-0" : "-translate-x-full"
              }`}
            />
          </div>

          {/* Phase 2: DEPLOY */}
          <div
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-500 text-xs font-bold ${
              currentStep >= 4
                ? "border-blue-600/50 bg-blue-600/10 text-blue-400 ring-1 ring-blue-600/20 shadow-[0_0_10px_rgba(37,99,235,0.2)]"
                : "border-gray-800 bg-gray-900/50 text-gray-500"
            }`}
          >
            <HiOutlineKey
              size={14}
              className={currentStep >= 4 ? "animate-pulse" : ""}
            />
            DEPLOY
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-green-950/20 px-3 py-1.5 rounded-md border border-green-500/20">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-500 text-[10px] font-bold uppercase tracking-wider">
            Titan Testnet
          </span>
        </div>
      </div>
    </nav>
  );
};

export default WizardNavbar;
