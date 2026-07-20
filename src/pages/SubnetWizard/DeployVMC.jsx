import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  HiOutlineDocumentText,
  HiOutlineInformationCircle,
  HiChevronDown,
  HiCheckCircle,
} from "react-icons/hi";
import { toast } from "react-toastify";

const DeployVMC = () => {
  const { setRunAction, isApiSuccess, isLoading } = useOutletContext();
  const [deploymentTarget, setDeploymentTarget] = useState("external");
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    "Deploying Validator Manager implementation...",
    "Deploying ProxyAdmin...",
    "Deploying TransparentProxy...",
    "Linking implementation to proxy...",
    "Verifying contract source...",
  ];

  // Mock deployment logic
  useEffect(() => {
    setRunAction(() => handleRunApi);
    return () => setRunAction(null);
  }, [setRunAction]);

  const handleRunApi = async () => {
    setProgress(0);
    setActiveStep(0);

    const interval = 30;
    const increment = 1;

    return new Promise((resolve) => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + increment;

          if (next < 20) setActiveStep(0);
          else if (next < 40) setActiveStep(1);
          else if (next < 60) setActiveStep(2);
          else if (next < 80) setActiveStep(3);
          else if (next < 100) setActiveStep(4);

          if (next >= 100) {
            clearInterval(timer);
            setActiveStep(5);
            toast.success("VMC deployed successfully!");
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
                  Deploy to Orbit itself
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

        {/* Progress Section */}
        {(isLoading || isApiSuccess) && (
          <div className="space-y-6">
            <div className="relative w-full h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-3 px-1">
              {steps.map((text, index) => {
                const isActive = index <= activeStep;
                const isCompleted = index < activeStep || isApiSuccess;

                if (!isActive && !isApiSuccess) return null;

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
                      className={`text-[13px] font-medium ${isCompleted ? "text-emerald-500" : "text-blue-400"}`}
                    >
                      {text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeployVMC;
