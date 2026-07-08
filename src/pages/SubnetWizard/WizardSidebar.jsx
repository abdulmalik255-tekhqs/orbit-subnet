import React from "react";

const steps = [
  { id: 1, title: "Validator Owner", phase: "CREATE" },
  { id: 2, title: "Config Defaults", phase: "CREATE" },
  { id: 3, title: "Chain ID", phase: "CREATE" },
  { id: 4, title: "Bootstrap Validators", phase: "DEPLOY" },
  { id: 5, title: "CreateSubnetTx", phase: "DEPLOY" },
  { id: 6, title: "CreateChainTx", phase: "DEPLOY" },
  { id: 7, title: "Convert to L1", phase: "DEPLOY" },
  { id: 8, title: "Deploy VMC", phase: "DEPLOY" },
  { id: 9, title: "Initialize VMC", phase: "DEPLOY" },
];

const PhaseHeader = ({ children }) => (
  <div className="flex items-center gap-2 px-4 pt-2.5 pb-1.5">
    <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#64748B] whitespace-nowrap">
      {children}
    </span>
    <span className="h-px flex-1 bg-gradient-to-r from-[#1A2438] to-transparent" />
  </div>
);

const StepItem = ({ step, currentStep }) => {
  const isActive = currentStep === step.id;
  const isDone = currentStep > step.id;

  return (
    <div
      className={`flex items-center gap-2.5 h-11 pl-3 pr-3.5 cursor-pointer transition-all border-l-2 ${
        isActive
          ? "border-[#3B82F6] bg-[#3B82F6]/[0.06]"
          : "border-transparent hover:bg-[#3B82F6]/[0.04]"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-medium shrink-0 border transition-all ${
          isActive
            ? "bg-[#3B82F6] border-[#3B82F6] text-white shadow-[0_0_12px_rgba(59,130,246,0.35)]"
            : isDone
              ? "bg-[#10B981]/15 border-[#10B981] text-[#10B981]"
              : "bg-[#161F2E] border-[#1A2438] text-[#64748B]"
        }`}
      >
        {isDone ? "✓" : step.id}
      </div>
      <span
        className={`text-xs truncate ${
          isActive
            ? "text-[#F0F4FF] font-medium"
            : isDone
              ? "text-[#94A3B8]"
              : "text-[#64748B]"
        }`}
      >
        {step.title}
      </span>
    </div>
  );
};

const WizardSidebar = ({ currentStep = 1 }) => {
  const createSteps = steps.filter((s) => s.phase === "CREATE");
  const deploySteps = steps.filter((s) => s.phase === "DEPLOY");

  return (
    <aside className="w-[250px] shrink-0 h-full overflow-y-auto bg-[#0B1120] border-r border-[#1A2438] py-3 font-sans">
      <PhaseHeader>Phase 1 — Create</PhaseHeader>
      {createSteps.map((step) => (
        <StepItem key={step.id} step={step} currentStep={currentStep} />
      ))}

      <div className="mt-4">
        <PhaseHeader>Phase 2 — Deploy</PhaseHeader>
      </div>
      {deploySteps.map((step) => (
        <StepItem key={step.id} step={step} currentStep={currentStep} />
      ))}
    </aside>
  );
};

export default WizardSidebar;
