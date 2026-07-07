import React from "react";

const steps = [
  // { id: 1, title: "Select VM", phase: "CREATE" },
  { id: 1, title: "Validator Owner", phase: "CREATE" },
  { id: 2, title: "Config Defaults", phase: "CREATE" },
  { id: 3, title: "Chain ID", phase: "CREATE" },
  // { id: 4, title: "Token Symbol", phase: "CREATE" },
  // { id: 5, title: "Token Allocation", phase: "CREATE" },
  // { id: 6, title: "Transaction Fees", phase: "CREATE" },
  // { id: 8, title: "Cross-Chain ICM", phase: "CREATE" },
  // { id: 9, title: "Permissioning", phase: "CREATE" },
  // { id: 10, title: "Signing Key", phase: "DEPLOY" },
  // { id: 11, title: "Chain ID Confirm", phase: "DEPLOY" },
  { id: 4, title: "Bootstrap Validators", phase: "DEPLOY" },
  { id: 5, title: "CreateSubnetTx", phase: "DEPLOY" },
  { id: 6, title: "CreateChainTx", phase: "DEPLOY" },
  { id: 7, title: "Convert to L1", phase: "DEPLOY" },
  { id: 8, title: "Deploy VMC", phase: "DEPLOY" },
  { id: 9, title: "Initialize VMC", phase: "DEPLOY" },
];

const WizardSidebar = ({ currentStep = 1 }) => {
  const createSteps = steps.filter((s) => s.phase === "CREATE");
  const deploySteps = steps.filter((s) => s.phase === "DEPLOY");

  return (
    <aside className="w-72 bg-[#0a0f1d] border-r border-[#1e293b] flex flex-col h-full overflow-y-auto">
      <div className="p-4">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
          Phase 1 — Create
        </div>
        <div className="space-y-1">
          {createSteps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                currentStep === step.id
                  ? "bg-[#111827] text-white"
                  : "text-gray-500"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentStep === step.id
                    ? "bg-blue-600 text-white"
                    : currentStep > step.id
                      ? "bg-green-600/20 text-green-500"
                      : "bg-gray-800/50 text-gray-500"
                }`}
              >
                {step.id}
              </div>
              <span
                className={`text-xs ${currentStep === step.id ? "text-blue-400 font-medium" : ""}`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-8 mb-4">
          Phase 2 — Deploy
        </div>
        <div className="space-y-1">
          {deploySteps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                currentStep === step.id
                  ? "bg-[#111827] text-white"
                  : "text-gray-500"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentStep === step.id
                    ? "bg-blue-600 text-white"
                    : currentStep > step.id
                      ? "bg-green-600/20 text-green-500"
                      : "bg-gray-800/50 text-gray-500"
                }`}
              >
                {step.id}
              </div>
              <span
                className={`text-xs ${currentStep === step.id ? "text-blue-400 font-medium" : ""}`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default WizardSidebar;
