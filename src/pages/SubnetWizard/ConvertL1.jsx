import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  HiCheckCircle,
  HiOutlineLightningBolt,
  HiExclamation,
} from "react-icons/hi";
import { RiCopperDiamondLine } from "react-icons/ri";

const ConvertL1 = () => {
  const { setRunAction, isApiSuccess, isLoading } = useOutletContext();
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    "Submitting ConvertSubnetToL1Tx...",
    "Waiting for P-Chain finalization (~30s)...",
    "Registering bootstrap validators...",
    "Assigning ValidationIDs...",
    "Storing results in sidecar.json...",
  ];

  useEffect(() => {
    setRunAction(() => handleRunApi);
    return () => setRunAction(null);
  }, [setRunAction]);

  const handleRunApi = async () => {
    setProgress(0);
    setActiveStep(0);

    // Total duration ~ 5 seconds for simulation
    const interval = 50; // ms
    const increment = 1;

    return new Promise((resolve) => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + increment;

          // Map progress to steps
          if (next < 20) setActiveStep(0);
          else if (next < 40) setActiveStep(1);
          else if (next < 60) setActiveStep(2);
          else if (next < 80) setActiveStep(3);
          else if (next < 100) setActiveStep(4);

          if (next >= 100) {
            clearInterval(timer);
            setActiveStep(5); // All done
            resolve();
            return 100;
          }
          return next;
        });
      }, interval);
    });
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-[#0ea5e9]/20 flex items-center justify-center text-[#38bdf8]">
          <HiOutlineLightningBolt size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Convert Subnet to L1
          </h1>
          <p className="text-gray-400 text-sm max-w-3xl leading-relaxed font-normal">
            The most critical and irreversible transaction. Converts the subnet
            into a fully sovereign L1 and registers bootstrap validators. After
            this, the subnet is no longer governed by P-Chain stakers.
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-2 mb-8">
        <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold px-3 py-1 rounded border border-blue-500/20 uppercase tracking-wider">
          Automatic
        </span>
        <span className="bg-red-600/20 text-red-400 text-[10px] font-bold px-3 py-1 rounded border border-red-500/20 uppercase tracking-wider">
          IRREVERSIBLE
        </span>
        <span className="bg-purple-600/20 text-purple-400 text-[10px] font-bold px-3 py-1 rounded border border-purple-500/20 uppercase tracking-wider">
          Phase 2
        </span>
      </div>

      {/* Warning Box */}
      <div className="bg-red-600/5 border border-red-500/20 rounded-xl p-5 mb-8 flex gap-4">
        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0 border border-red-500/20">
          <HiExclamation size={20} />
        </div>
        <div>
          <h4 className="text-red-500 text-sm font-bold uppercase tracking-wide mb-1 flex items-center gap-2">
            This action is IRREVERSIBLE
          </h4>
          <p className="text-gray-400 text-[13px] leading-relaxed">
            Once converted, this subnet becomes a sovereign L1. You cannot
            revert to a standard subnet. All bootstrap validators will be
            permanently registered. Please confirm you have backed up your
            sidecar.json and genesis.json files.
          </p>
        </div>
      </div>

      {/* Progress Section */}
      {isLoading || isApiSuccess ? (
        <div className="space-y-6">
          {/* Progress Bar Container */}
          <div className="relative w-full h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Logs */}
          <div className="space-y-3 px-1">
            {steps.map((text, index) => {
              const isActive = index <= activeStep;
              const isCompleted =
                index < activeStep || (isApiSuccess && index === 4);

              if (!isActive) return null;

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-500"
                >
                  <div
                    className={`shrink-0 ${isCompleted ? "text-green-500" : "text-blue-500 animate-pulse"}`}
                  >
                    <HiCheckCircle size={18} />
                  </div>
                  <span
                    className={`text-[13px] font-medium ${isCompleted ? "text-gray-400" : "text-blue-400"}`}
                  >
                    {text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Result Card */}
          {isApiSuccess && (
            <div className="mt-8 bg-[#0f172a] border border-blue-500/20 rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-700">
              <div className="p-6 flex items-start gap-4 border-b border-[#1e293b]/50">
                <div className="w-12 h-12 bg-purple-600/10 rounded-lg border border-purple-500/20 flex items-center justify-center text-purple-500">
                  <RiCopperDiamondLine size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-0.5">
                    L1 is Now Sovereign
                  </h3>
                  <p className="text-gray-400 text-xs">
                    Subnet converted to sovereign L1 on RYT Mainnet
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                    Status
                  </span>
                  <span className="text-green-500 text-[11px] font-bold uppercase tracking-wider bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                    Sovereign L1 Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                    Validation ID 1
                  </span>
                  <span className="text-gray-300 text-xs font-mono">
                    2PsRaRBF...0
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                    Validation ID 2
                  </span>
                  <span className="text-gray-300 text-xs font-mono">
                    2PsRaRBF...1
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ConvertL1;
