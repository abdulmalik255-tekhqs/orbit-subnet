import React from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";

const NetworkSummary = ({ network = {} }) => {
  const details = [
    { label: "Network Name", value: network.networkName },
    { label: "Chain ID", value: network.chainId },
    { label: "Token Symbol", value: network.tokenSymbol },
  ];

  if (
    !details.some((detail) => detail.value !== undefined && detail.value !== "")
  ) {
    return null;
  }

  return (
    <div className="mb-6 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
      <div className="flex items-start gap-3">
        <HiOutlineInformationCircle
          className="mt-0.5 shrink-0 text-blue-400"
          size={18}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-300">
              Orbit Configuration
            </h2>
            <span className="text-[11px] text-gray-500">
              These details stay with your deployment
            </span>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="min-w-0 rounded-lg border border-white/5 bg-[#060914]/70 px-3 py-2"
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {detail.label}
                </div>
                <div className="mt-1 truncate font-mono text-xs font-medium text-white">
                  {detail.value || "--"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSummary;
