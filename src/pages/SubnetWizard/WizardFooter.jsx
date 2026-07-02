import React from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const WizardFooter = ({ currentStep = 1, totalSteps = 17, onNext, onBack }) => {
  return (
    <footer className="h-16 border-t border-[#1e293b] bg-[#0a0f1d] flex items-center justify-between px-6 sticky bottom-0 z-10">
      <button
        onClick={onBack}
        disabled={currentStep === 1}
        className="flex items-center gap-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
      >
        <HiArrowLeft />
        Back
      </button>

      <div className="text-gray-500 text-sm">
        Step {currentStep} of {totalSteps}
      </div>

      <button
        onClick={onNext}
        className="flex items-center gap-2 px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
      >
        Next
        <HiArrowRight />
      </button>
    </footer>
  );
};

export default WizardFooter;
