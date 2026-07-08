import React from "react";
import {
  HiArrowLeft,
  HiArrowRight,
  HiPlay,
  HiRefresh,
  HiCheckCircle,
} from "react-icons/hi";

const WizardFooter = ({
  currentStep = 1,
  totalSteps = 9,
  onNext,
  onBack,
  onRun,
  isLoading = false,
  isApiSuccess = false,
}) => {
  return (
    <footer className="h-20 border-t border-[#1e293b] bg-[#060914] flex items-center px-6 sticky bottom-0 z-10 w-full">
      <div className="flex items-center justify-between w-full mx-auto">
        <button
          onClick={onBack}
          disabled={currentStep === 1 || isLoading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#1e293b] text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[11px] font-bold uppercase tracking-wide"
        >
          <HiArrowLeft />
          Back
        </button>

        <div className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.2em]">
          Step {currentStep} of {totalSteps}
        </div>

        {[5, 6, 7, 8, 9].includes(currentStep) && !isApiSuccess ? (
          <button
            onClick={onRun}
            disabled={isLoading}
            className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white text-[11px] font-bold uppercase tracking-wide transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)]"
          >
            {isLoading ? (
              <>
                <HiRefresh className="animate-spin" />
                {currentStep >= 8 ? "Deploying..." : "Running..."}
              </>
            ) : (
              <>
                <HiPlay />
                {currentStep >= 8
                  ? currentStep === 8
                    ? "Deploy VMC"
                    : "Initialize"
                  : "Run"}
              </>
            )}
          </button>
        ) : currentStep === 9 && isApiSuccess ? (
          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold uppercase tracking-wide transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            Finish
            <HiCheckCircle className="text-sm" />
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={
              ([5, 6, 7, 8, 9].includes(currentStep) && !isApiSuccess) ||
              isLoading
            }
            className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold uppercase tracking-wide transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(37,99,235,0.2)]"
          >
            {isLoading ? (
              <>
                <HiRefresh className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Next
                <HiArrowRight />
              </>
            )}
          </button>
        )}
      </div>
    </footer>
  );
};

export default WizardFooter;
