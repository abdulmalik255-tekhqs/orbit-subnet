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
  const [runAction, setRunAction] = React.useState(null);
  const [isApiSuccess, setIsApiSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Map routes to steps
  const stepRoutes = {
    1: "/validator-owner",
    2: "/config-defaults",
    3: "/chain-id",
    4: "/bootstrap-validators",
    5: "/create-subnet-tx",
    6: "/create-chain-tx",
    7: "/convert-l1",
    8: "/deploy-vmc",
    9: "/initialize-vmc",
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === "/validator-owner" || path === "/") setCurrentStep(1);
    else if (path === "/config-defaults") setCurrentStep(2);
    else if (path === "/chain-id") setCurrentStep(3);
    else if (path === "/bootstrap-validators") setCurrentStep(4);
    else if (path === "/create-subnet-tx") setCurrentStep(5);
    else if (path === "/create-chain-tx") setCurrentStep(6);
    else if (path === "/convert-l1") setCurrentStep(7);
    else if (path === "/deploy-vmc") setCurrentStep(8);
    else if (path === "/initialize-vmc") setCurrentStep(9);
    // Add more as needed
  }, [location]);

  const handleRun = async () => {
    if (runAction) {
      setIsLoading(true);
      try {
        await runAction();
        setIsApiSuccess(true);
      } catch (error) {
        console.error("Action failed", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      const nextRoute = stepRoutes[nextStep];
      if (nextRoute) {
        navigate(nextRoute);
        setIsApiSuccess(false); // Reset for next step if it needs it
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      const prevRoute = stepRoutes[prevStep];
      if (prevRoute) {
        navigate(prevRoute);
        setIsApiSuccess(true); // Assuming previous steps are already "success"
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#060914] text-white overflow-hidden font-sans">
      <WizardNavbar
        currentStep={currentStep}
        onRun={handleRun}
        isLoading={isLoading}
        isApiSuccess={isApiSuccess}
      />

      <div className="flex flex-1 overflow-hidden">
        <WizardSidebar currentStep={currentStep} />

        <main className="flex-1 flex flex-col overflow-hidden relative bg-[#060914]">
          <div className="flex-1 overflow-y-auto p-2">
            <Outlet
              context={{
                currentStep,
                setCurrentStep,
                setRunAction,
                isApiSuccess,
                isLoading,
              }}
            />
          </div>

          <WizardFooter
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
            onRun={handleRun}
            isLoading={isLoading}
            isApiSuccess={isApiSuccess}
          />
        </main>
      </div>
    </div>
  );
};

export default WizardLayout;
