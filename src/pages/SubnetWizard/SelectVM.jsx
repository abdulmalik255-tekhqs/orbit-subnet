import React from "react";
import { LuCpu } from "react-icons/lu";
import { BiCodeBlock } from "react-icons/bi";

const SelectVM = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500">
          <LuCpu size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Select Virtual Machine
          </h1>
          <p className="text-gray-400 text-sm">
            Choose the execution engine for your blockchain. Subnet-EVM provides
            full EVM compatibility with Solidity smart contract support.
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-8">
        <span className="bg-red-900/40 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
          Required
        </span>
        <span className="bg-blue-900/40 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
          Automatic
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subnet-EVM Option */}
        <div className="bg-[#0f172a] border-2 border-blue-600 rounded-xl p-6 relative overflow-hidden group cursor-pointer transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                checked
                readOnly
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <span className="text-lg font-semibold text-white">
                Subnet-EVM
              </span>
            </div>
            <div className="text-blue-500">
              <span className="bg-blue-900/30 text-blue-400 text-[10px] border border-blue-800 px-2 py-1 rounded tracking-widest uppercase">
                EVM
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Full EVM compatibility. Supports Solidity, MetaMask, and all
            standard EVM tooling. The recommended choice for most deployments.
          </p>
          <span className="bg-green-900/30 text-green-500 text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wide">
            Recommended
          </span>
        </div>

        {/* Custom VM Option */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-6 relative overflow-hidden group cursor-pointer hover:border-[#334155] transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                disabled
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <span className="text-lg font-semibold text-gray-500">
                Custom VM
              </span>
            </div>
            <div className="text-gray-600">
              <BiCodeBlock size={20} />
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Bring your own VM binary or GitHub repository. For advanced custom
            execution environments with specialized requirements.
          </p>
          <span className="bg-orange-900/30 text-orange-500 text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wide">
            Advanced
          </span>
        </div>
      </div>

      <div className="mt-8 bg-blue-900/10 border border-blue-500/20 rounded-lg p-4 flex items-center gap-3">
        <div className="text-blue-500">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <p className="text-gray-300 text-sm italic">
          Proof of Majority (PoM) consensus is automatically selected as the
          default consensus mechanism for all standard deployments. No
          additional configuration required.
        </p>
      </div>
    </div>
  );
};

export default SelectVM;
