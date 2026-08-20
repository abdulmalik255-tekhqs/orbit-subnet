import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import WizardNavbar from "./WizardNavbar";
import WizardSidebar from "./WizardSidebar";
import WizardFooter from "./WizardFooter";
import { totalSteps, stepRoutes } from "../../utils";

const WizardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [runAction, setRunAction] = React.useState(null);
  const [stepValidator, setStepValidator] = React.useState(null);
  const [isApiSuccess, setIsApiSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const path = location.pathname;
    let step = 1;

    if (
      path === "/" ||
      path === "/validator-owner" ||
      path === "/config-defaults"
    ) {
      step = 1;
    } else if (path === "/chain-id") {
      step = 2;
    } else if (path === "/bootstrap-validators") {
      step = 3;
    } else if (path === "/create-orbit-tx") {
      step = 4;
    } else if (path === "/create-chain-tx") {
      step = 5;
    } else if (path === "/convert-orbit") {
      step = 6;
    } else if (path === "/initialize-vmc") {
      step = 7;
    }

    if (step !== currentStep) {
      setCurrentStep(step);
      setStepValidator(null);
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

    const isActionStep = [4, 5, 6, 7].includes(currentStep);
    if (isActionStep && !isApiSuccess) {
      return;
    }

    if (stepValidator) {
      try {
        await stepValidator();
      } catch (error) {
        return;
      }
    }

    if (runAction && !isActionStep) {
      setIsLoading(true);
      try {
        await runAction();
      } catch (error) {
        return;
      } finally {
        setIsLoading(false);
      }
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
                setStepValidator,
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
