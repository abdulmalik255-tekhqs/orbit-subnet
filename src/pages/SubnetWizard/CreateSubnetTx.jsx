import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
  HiOutlineDocumentText,
  HiCheckCircle,
  HiRefresh,
} from "react-icons/hi";

const CreateSubnetTx = () => {
  const { setRunAction, isApiSuccess, isLoading } = useOutletContext();

  useEffect(() => {
    setRunAction(() => handleRunApi);
    return () => setRunAction(null);
  }, [setRunAction]);

  const handleRunApi = async () => {
    console.log("Calling CreateSubnetTx API...");
    return new Promise((resolve) => setTimeout(resolve, 3000));
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex items-start gap-4 mb-2">
        <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500">
          <HiOutlineDocumentText size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white ">CreateSubnetTx</h1>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed font-normal">
            Register the orbit on the RYT Chain. This is an automatic step — the
            CLI submits the transaction. Ledger approval required.
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <span className="border border-blue-400 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          Automatic
        </span>
        <span className="border border-green-400 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          Phase 2 — Deploy
        </span>
      </div>
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-cyan-500/40 bg-[#111827] px-4 py-3">
        <svg
          className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v6M12 7h.01" strokeLinecap="round" />
        </svg>

        <p className="text-sm leading-6 text-gray-400">
          This transaction registers your orbit with sovereign L1 control.
          Threshold is <span className="text-gray-200">1-of-1</span> for
          sovereign deployment. Control keys are auto-set from your Ledger.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Right Column: Status */}
        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl flex flex-col min-h-[300px]">
          <div className="px-6 py-4 border-b border-[#1e293b] bg-[#111827]/50">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Transaction Status
            </h3>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            {!isLoading && !isApiSuccess && (
              <>
                <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-600/20">
                  <HiOutlineDocumentText size={32} className="text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Ready to Deploy
                </h3>
                <p className="text-gray-400 text-sm max-w-xs">
                  Your Subnet configuration is validated and ready for
                  deployment.
                </p>
              </>
            )}

            {isLoading && (
              <>
                <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-600/20">
                  <HiRefresh size={32} className="text-blue-500 animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Executing Transaction
                </h3>
                <p className="text-gray-400 text-sm max-w-xs">
                  Generating and sending the CreateSubnet transaction to the
                  Titan Testnet...
                </p>
              </>
            )}

            {isApiSuccess && (
              <>
                <div className="w-16 h-16 bg-green-600/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-600/20">
                  <HiCheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 text-green-500">
                  Deployment Successful
                </h3>
                <p className="text-gray-400 text-sm max-w-xs mb-6">
                  Subnet created. Transaction hash recorded below.
                </p>
                <div className="bg-[#0a0f1d] border border-[#1e293b] rounded-lg p-4 text-left w-full">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Transaction Hash
                  </div>
                  <div className="text-xs text-blue-400 font-mono break-all">
                    0x742d35Cc6634C0532925a3b844Bc454e4438f44e78a63442
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSubnetTx;
