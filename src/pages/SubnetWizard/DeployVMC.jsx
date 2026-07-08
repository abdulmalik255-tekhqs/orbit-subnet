import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  HiOutlineDocumentText,
  HiOutlineInformationCircle,
  HiChevronDown,
} from "react-icons/hi";

const DeployVMC = () => {
  const { setRunAction, isApiSuccess } = useOutletContext();
  const [deploymentTarget, setDeploymentTarget] = useState("external");

  // Mock deployment logic
  useEffect(() => {
    setRunAction(() => async () => {
      console.log("Deploying VMC...");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log("VMC Deployed!");
    });
  }, [setRunAction]);

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center animate-float mt-2">
          <HiOutlineDocumentText className="text-emerald-500 text-2xl" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">
            Deploy Validator Manager Contract
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
            Deploy the ValidatorManager + TransparentProxy to EVM. The VMC
            manages the validator set on-chain.
          </p>
          <div className="flex gap-2 mt-4">
            <span className="px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-bold uppercase tracking-wider">
              Semi-Auto
            </span>
            <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-500 text-[10px] font-bold uppercase tracking-wider">
              Phase 2
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* 16a Deployment Target */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            16a — Deployment Target
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setDeploymentTarget("l1")}
              className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                deploymentTarget === "l1"
                  ? "bg-blue-600/5 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                  : "bg-[#0d1225] border-white/5 hover:border-white/10"
              }`}
            >
              <div
                className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center ${
                  deploymentTarget === "l1"
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-600"
                }`}
              >
                {deploymentTarget === "l1" && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <div>
                <div className="text-[13px] font-bold text-white">
                  Deploy to L1 itself
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  Default, recommended
                </div>
              </div>
            </button>

            <button
              onClick={() => setDeploymentTarget("external")}
              className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                deploymentTarget === "external"
                  ? "bg-blue-600/5 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                  : "bg-[#0d1225] border-white/5 hover:border-white/10"
              }`}
            >
              <div
                className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center ${
                  deploymentTarget === "external"
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-600"
                }`}
              >
                {deploymentTarget === "external" && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <div>
                <div className="text-[13px] font-bold text-white">
                  External blockchain
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  Shared validator management
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* 16b Gas Key */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            16b — Gas Key for Contract Deployment
          </h2>
          <div className="relative">
            <div className="w-full bg-[#0d1225] border border-white/5 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-white/10 transition-colors">
              <span className="text-[13px] text-white">
                Use genesis key (pre-funded)
              </span>
              <HiChevronDown className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="flex gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
          <HiOutlineInformationCircle className="text-blue-500 text-lg shrink-0 mt-0.5" />
          <p className="text-[12px] text-gray-400 leading-relaxed">
            Contracts deployed:{" "}
            <span className="text-white font-medium">ValidatorManager</span>{" "}
            (impl),{" "}
            <span className="text-white font-medium">TransparentProxy</span>{" "}
            (upgradeable),{" "}
            <span className="text-white font-medium">ProxyAdmin</span> (upgrade
            authority). The Proxy address is what all subsequent calls use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeployVMC;
