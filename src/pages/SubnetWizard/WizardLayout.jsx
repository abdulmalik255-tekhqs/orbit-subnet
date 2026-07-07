import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import WizardNavbar from "./WizardNavbar";
import WizardSidebar from "./WizardSidebar";
import WizardFooter from "./WizardFooter";
import { totalSteps } from "../../utils";

const WizardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = React.useState(1);

  // Map routes to steps
  const stepRoutes = {
    1: "/validator-owner",
    2: "/config-defaults",
    3: "/chain-id",
    4: "/bootstrap-validators",
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === "/validator-owner") setCurrentStep(1);
    else if (path === "/config-defaults") setCurrentStep(2);
    else if (path === "/chain-id") setCurrentStep(3);
    else if (path === "/bootstrap-validators") setCurrentStep(4);
    // Add more as needed
  }, [location]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      const nextRoute = stepRoutes[nextStep];
      if (nextRoute) {
        navigate(nextRoute);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      const prevRoute = stepRoutes[prevStep];
      if (prevRoute) {
        navigate(prevRoute);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#060914] text-white overflow-hidden font-sans">
      <WizardNavbar />

      <div className="flex flex-1 overflow-hidden">
        <WizardSidebar currentStep={currentStep} />

        <main className="flex-1 flex flex-col overflow-hidden relative bg-[#060914]">
          <div className="flex-1 overflow-y-auto p-12">
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
