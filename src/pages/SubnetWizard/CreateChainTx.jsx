import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { HiOutlineLink, HiCheckCircle } from "react-icons/hi";
import { toast } from "react-toastify";

const CreateChainTx = () => {
  const { setRunAction, isApiSuccess, isLoading } = useOutletContext();
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    "Submitting Create Chain Tx...",
    "Waiting for confirmation...",
    "Signing Create Chain transaction...",
    "Extracting Blockchain ID and VM ID...",
    "Storing in sidecar.json...",
  ];

  useEffect(() => {
    setRunAction(() => handleRunApi);
    return () => setRunAction(null);
  }, [setRunAction]);

  const handleRunApi = async () => {
    setProgress(0);
    setActiveStep(0);

    // Total duration ~ 3 seconds for simulation
    const interval = 30; // ms
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
            toast.success("Chain transaction created successfully!");
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
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500 animate-float mt-2">
          <HiOutlineLink size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white ">CreateChainTx</h1>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed font-normal">
            Create your sovereign Orbit chain on the newly created Orbit. This
            step registers the chain infrastructure and initial genesis state.
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <span className="border border-blue-400 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          Automatic
        </span>
        <span className="border border-green-400 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          Phase 2 — Deploy
        </span>
      </div>

      <div className="mb-6 flex items-start gap-3 rounded-xl border border-cyan-500/40 bg-[#111827] px-4 py-3">
        <svg
          className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v6M12 7h.01" strokeLinecap="round" />
        </svg>

        <p className="text-sm leading-6 text-gray-400">
          This transaction finalizes the chain creation. The chain will be
          linked to Orbit ID:
          <span className="text-gray-200 ml-1 font-mono text-xs">
            2tZ...z4K
          </span>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        {/* Left Column: Progress Steps */}
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

export default CreateChainTx;
