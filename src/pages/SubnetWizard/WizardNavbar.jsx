import React from "react";
import { IoRocketOutline } from "react-icons/io5";
import { HiOutlineKey } from "react-icons/hi";

const WizardNavbar = () => {
  return (
    <nav className="h-16 border-b border-[#1e293b] bg-[#0a0f1d] flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white">
            RY
          </div>
          <span className="text-white font-semibold whitespace-nowrap">
            RYT Orbit
          </span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center border border-[#1e293b] rounded-full p-1 bg-[#111827]">
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e293b] text-white text-sm font-medium">
            <IoRocketOutline className="text-lg" />
            CREATE
          </button>
          <div className="w-10 h-[1px] bg-[#1e293b]"></div>
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-full text-gray-500 text-sm font-medium hover:text-gray-300">
            <HiOutlineKey className="text-lg" />
            DEPLOY
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-2 bg-[#111827] px-3 py-1.5 rounded-full border border-[#1e293b]">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-white text-xs font-medium">
            Titan Testnet Explorer
          </span>
        </div>
      </div>
    </nav>
  );
};

export default WizardNavbar;
