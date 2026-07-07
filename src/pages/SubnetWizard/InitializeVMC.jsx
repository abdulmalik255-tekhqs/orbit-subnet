import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  HiOutlineLightBulb,
  HiOutlineInformationCircle,
  HiCheckCircle,
  HiRefresh,
} from "react-icons/hi";
import { LuRocket } from "react-icons/lu";
import { BsTrophy } from "react-icons/bs";

const InitializeVMC = () => {
  const { setRunAction, isApiSuccess, isLoading } = useOutletContext();
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  const allLogs = [
    "Checking bootstrap validator node sync...",
    "Waiting for L1 EVM to produce blocks (30-60s)...",
    "Starting Signature Aggregator...",
    "Collecting BLS signatures from validators...",
    "Calling initialize() on VMC proxy...",
    "Finalizing deployment state...",
  ];

  useEffect(() => {
    setRunAction(() => async () => {
      setProgress(0);
      setLogs([]);

      for (let i = 0; i < allLogs.length; i++) {
        setLogs((prev) => [...prev, allLogs[i]]);
        // Simulate progress increment
        const stepProgress = 100 / allLogs.length;
        for (let p = 0; p <= stepProgress; p += 10) {
          setProgress((prev) => Math.min(prev + 1.5, (i + 1) * stepProgress));
          await new Promise((r) => setTimeout(r, 100));
        }
        await new Promise((r) => setTimeout(r, 500));
      }
      setProgress(100);
    });
  }, [setRunAction]);

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-start gap-4 mb-2">
        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
          <HiOutlineLightBulb className="text-green-500 text-2xl" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">
            Initialize Validator Manager
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
            The final step — seed the VMC with bootstrap validators via BLS
            signatures. The CLI handles BLS signature collection automatically
            via the Signature Aggregator.
          </p>
          <div className="flex gap-2 mt-4">
            <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-wider">
              Automatic
            </span>
            <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-500 text-[10px] font-bold uppercase tracking-wider">
              Phase 2
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-wider">
              Final Step
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Info Box */}
        <div className="flex gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
          <HiOutlineInformationCircle className="text-blue-500 text-lg shrink-0 mt-0.5" />
          <p className="text-[12px] text-gray-400 leading-relaxed italic">
            This step calls{" "}
            <span className="text-white font-mono">initialize()</span> on the
            ValidatorManager contract. For PoM consensus, it calls
            <span className="text-white font-mono ml-1">
              InitializeProofOfAuthority()
            </span>
            . Bootstrap validators must have P2P port 9651 exposed.
          </p>
        </div>

        {/* Progress Section */}
        {(isLoading || isApiSuccess) && (
          <div className="space-y-6">
            <div className="relative h-1.5 w-full bg-[#0d1225] rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-3">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-emerald-500 animate-in fade-in slide-in-from-left-2 duration-300"
                >
                  <HiCheckCircle
                    className="text-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                    size={16}
                  />
                  <span className="text-[12px] font-medium tracking-wide">
                    {log}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-3 text-gray-500 ml-0.5 animate-pulse">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-700 border-t-blue-500 animate-spin" />
                  <span className="text-[12px]">
                    Processing current phase...
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Deployment Complete Card */}
        {isApiSuccess && (
          <div className="mt-8 animate-in zoom-in-95 duration-500">
            <div className="p-6 rounded-2xl bg-[#0d1225]/50 border border-white/5 flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <BsTrophy className="text-purple-500 text-xl" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Deployment Complete
                </h3>
                <p className="text-[11px] text-gray-500 mt-1">
                  Your L1 is fully live on RYT Mainnet
                </p>
              </div>
            </div>

            {/* Final Success Hero */}
            <div className="mt-16 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-[#0d1225] border border-blue-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.1)] relative group">
                <div className="absolute inset-0 bg-blue-600/10 rounded-3xl blur-xl group-hover:bg-blue-600/20 transition-all" />
                <LuRocket className="text-blue-500 text-4xl relative z-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Your Subnet is Live
                </h2>
                <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                  All 9 steps completed successfully. Your RYT L1 blockchain is
                  now operational on Mainnet with sovereign validator
                  management.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InitializeVMC;
