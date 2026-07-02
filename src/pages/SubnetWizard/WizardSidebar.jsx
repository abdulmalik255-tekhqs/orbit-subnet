import React from "react";

const steps = [
  { id: 1, title: "Select VM", phase: "CREATE" },
  { id: 2, title: "Validator Owner", phase: "CREATE" },
  { id: 3, title: "Config Defaults", phase: "CREATE" },
  { id: 4, title: "Chain ID", phase: "CREATE" },
  { id: 5, title: "Token Symbol", phase: "CREATE" },
  { id: 6, title: "Token Allocation", phase: "CREATE" },
  { id: 7, title: "Transaction Fees", phase: "CREATE" },
  { id: 8, title: "Cross-Chain ICM", phase: "CREATE" },
  { id: 9, title: "Permissioning", phase: "CREATE" },
  { id: 10, title: "Signing Key", phase: "DEPLOY" },
  { id: 11, title: "Chain ID Confirm", phase: "DEPLOY" },
  { id: 12, title: "Bootstrap Validators", phase: "DEPLOY" },
  { id: 13, title: "CreateSubnetTx", phase: "DEPLOY" },
  { id: 14, title: "CreateChainTx", phase: "DEPLOY" },
  { id: 15, title: "Convert to L1", phase: "DEPLOY" },
  { id: 16, title: "Deploy VMC", phase: "DEPLOY" },
  { id: 17, title: "Initialize VMC", phase: "DEPLOY" },
];

const WizardSidebar = ({ currentStep = 1 }) => {
  const createSteps = steps.filter((s) => s.phase === "CREATE");
  const deploySteps = steps.filter((s) => s.phase === "DEPLOY");

  return (
    <aside className="w-64 bg-[#0a0f1d] border-r border-[#1e293b] flex flex-col h-full overflow-y-auto">
      <div className="p-6">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
          Phase 1 — Create
        </div>
        <div className="space-y-1">
          {createSteps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                currentStep === step.id
                  ? "bg-[#1e293b] text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  currentStep === step.id
                    ? "bg-blue-500 text-white"
                    : "bg-[#1e293b] text-gray-400"
                }`}
              >
                {step.id}
              </div>
              <span className="text-sm">{step.title}</span>
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
                  ? "bg-[#1e293b] text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  currentStep === step.id
                    ? "bg-blue-500 text-white"
                    : "bg-[#1e293b] text-gray-400"
                }`}
              >
                {step.id}
              </div>
              <span className="text-sm">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default WizardSidebar;
