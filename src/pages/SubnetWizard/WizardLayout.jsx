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
    5: "/create-orbit-tx",
    6: "/create-chain-tx",
    7: "/convert-l1",
    8: "/deploy-vmc",
    9: "/initialize-vmc",
  };

  useEffect(() => {
    const path = location.pathname;
    let step = 1;
    if (path === "/validator-owner" || path === "/") step = 1;
    else if (path === "/config-defaults") step = 2;
    else if (path === "/chain-id") step = 3;
    else if (path === "/bootstrap-validators") step = 4;
    else if (path === "/create-orbit-tx") step = 5;
    else if (path === "/create-chain-tx") step = 6;
    else if (path === "/convert-l1") step = 7;
    else if (path === "/deploy-vmc") step = 8;
    else if (path === "/initialize-vmc") step = 9;

    if (step !== currentStep) {
      setCurrentStep(step);
      setIsApiSuccess(false);
      setIsLoading(false);
    }
  }, [location, currentStep]);

  const handleRun = async () => {
    if (runAction) {
      const startingStep = currentStep;
      setIsLoading(true);
      setIsApiSuccess(false);
      try {
        await runAction();

        // If the action moved us to a new step, we don't want to mark the NEW step as success
        // Use a functional update to get the latest currentStep
        setCurrentStep((latestStep) => {
          if (latestStep === startingStep) {
            setIsApiSuccess(true);
          }
          return latestStep;
        });
      } catch (error) {
        console.error("Action failed", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNext = async () => {
    if (isLoading) return;

    // If there's a runAction for the current step, execute it first
    // We check for runAction and only proceed to navigation if it succeeds
    if (runAction && ![5, 6, 7, 8, 9].includes(currentStep)) {
      setIsLoading(true);
      try {
        await runAction();
      } catch (error) {
        console.error("Action failed, staying on current step", error);
        setIsLoading(false);
        return; // Stop here if action fails
      }
      setIsLoading(false);
    }

    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      const nextRoute = stepRoutes[nextStep];
      if (nextRoute) {
        navigate(nextRoute);
        setIsApiSuccess(false);
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
