import React from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const WizardFooter = ({ currentStep = 1, totalSteps = 11, onNext, onBack }) => {
  return (
    <footer className="h-20 border-t border-[#1e293b] bg-[#060914] flex items-center px-6 sticky bottom-0 z-10 w-full">
      <div className="flex items-center justify-between w-full mx-auto">
        <button
          onClick={onBack}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#1e293b] text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-[11px] font-bold uppercase tracking-wide"
        >
          <HiArrowLeft />
          Back
        </button>

        <div className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.2em]">
          Step {currentStep} of {totalSteps}
        </div>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold uppercase tracking-wide transition-all"
        >
          Next
          <HiArrowRight />
        </button>
      </div>
    </footer>
  );
};

export default WizardFooter;
