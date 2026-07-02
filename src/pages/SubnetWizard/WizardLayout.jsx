import React from "react";
import { Outlet } from "react-router-dom";
import WizardNavbar from "./WizardNavbar";
import WizardSidebar from "./WizardSidebar";
import WizardFooter from "./WizardFooter";

const WizardLayout = () => {
  // In a real app, this might come from a context or state manager
  const [currentStep, setCurrentStep] = React.useState(1);
  const totalSteps = 17;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col h-screen bg-[#060914] text-white overflow-hidden">
      <WizardNavbar />

      <div className="flex flex-1 overflow-hidden">
        <WizardSidebar currentStep={currentStep} />

        <main className="flex-1 flex flex-col overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-4">
            {/* The actual wizard content will be rendered here via Outlet */}
            <Outlet context={{ currentStep, setCurrentStep }} />
          </div>

          <WizardFooter
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
          />
        </main>
      </div>
    </div>
  );
};

export default WizardLayout;
