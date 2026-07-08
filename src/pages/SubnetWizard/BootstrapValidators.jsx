import React, { useEffect, useState } from "react";
import { HiOutlineServer } from "react-icons/hi";
import { BsDatabase } from "react-icons/bs";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";

const ValidatorForm = ({ index }) => (
  <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-6 mb-4">
    <div className="flex items-center gap-2 mb-6">
      <BsDatabase className="text-blue-500" size={16} />
      <span className="text-white font-semibold">Validator {index + 1}</span>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
          Node ID
        </label>
        <input
          type="text"
          placeholder="NodeID-Abc123..."
          className="w-full bg-[#0a0f1d] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors"
        />
      </div>
      <div>
        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
          Weight
        </label>
        <input
          type="text"
          defaultValue="100"
          className="w-full bg-[#0a0f1d] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors"
        />
      </div>
    </div>

    <div className="mb-6">
      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
        BLS Public Key (48 bytes)
      </label>
      <input
        type="text"
        placeholder="0x<96 hex chars>"
        className="w-full bg-[#0a0f1d] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors"
      />
    </div>

    <div>
      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
        BLS Proof of Possession (96 bytes)
      </label>
      <input
        type="text"
        placeholder="0x<192 hex chars>"
        className="w-full bg-[#0a0f1d] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors"
      />
    </div>
  </div>
);

const BootstrapValidators = () => {
  const [numValidators, setNumValidators] = useState("1");
  const [nodeOption, setNodeOption] = useState("own");
  const { setRunAction } = useOutletContext();
  const dispatch = useDispatch();

  useEffect(() => {
    setRunAction(() => async () => {
      let payload = {
        network: "local",
        walletId: "",
        numNodes: Number(numValidators),
        subnetOnly: false,
        convertOnly: false,
        controlKeys: [],
        threshold: 0,
        sameControlKey: false,
        bootstrapValidators: {
          mode: "auto",
          count: 0,
          endpoints: [],
          balanceAvax: Number(numValidators),
          weight: 0,
        },
        interchainMessaging: {
          skipIcmDeploy: false,
          skipRelayerDeploy: false,
        },
        proofOfStake: {
          minimumStakeAmount: 0,
          maximumStakeAmount: 1000,
          minimumDelegationFeeBips: 1,
          maximumStakeMultiplier: 1,
          weightToValueFactor: 1,
        },
      };

      await dispatch.wizard.bootstrapValidators({ payload });
    });

    return () => setRunAction(null);
  }, [numValidators, nodeOption, dispatch, setRunAction]);
  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-green-600/20 flex items-center justify-center text-green-500 animate-float mt-2">
          <HiOutlineServer size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">
            Bootstrap Validator Setup
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed font-normal">
            Provide node info for the initial validators. These validators
            register in the Convert Orbit and must have P2P port 9651 exposed
            with public-ip set.
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <span className="border border-red-400 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          Required
        </span>
        <span className="border border-blue-400 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          Phase 2
        </span>
      </div>

      <div className="w-full mb-4 max-w-2xl">
        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
          Number of bootstrap validators <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={numValidators}
          onChange={(e) => setNumValidators(e.target.value)}
          className="w-full bg-[#0a0f1d] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 max-w-2xl">
        <div
          onClick={() => setNodeOption("own")}
          className={`cursor-pointer rounded-xl p-6 border transition-all ${
            nodeOption === "own"
              ? "bg-[#0f172a] border-blue-600 ring-1 ring-blue-600"
              : "bg-[#0a0f1d] border-[#1e293b]"
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`w-5 h-5 rounded-full border border-blue-600 flex items-center justify-center mt-1 shrink-0 ${nodeOption === "own" ? "bg-blue-600" : ""}`}
            >
              {nodeOption === "own" && (
                <div className="w-2 h-2 rounded-full bg-white transition-all scale-100" />
              )}
            </div>
            <div>
              <div className="text-white font-semibold mb-1">
                I have my own nodes
              </div>
              <div className="text-gray-500 text-xs leading-relaxed">
                Provide Node IDs and BLS keys from your running nodes
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setNodeOption("generate")}
          className={`cursor-pointer rounded-xl p-6 border border-[#1e293b] hover:border-gray-700 transition-all ${
            nodeOption === "generate"
              ? "bg-[#0f172a] border-blue-600 ring-1 ring-blue-600"
              : "bg-[#0a0f1d] border-[#1e293b]"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center mt-1 shrink-0"></div>
            <div>
              <div className="text-gray-400 font-semibold mb-1">
                Generate for me
              </div>
              <div className="text-gray-500 text-xs leading-relaxed">
                CLI auto-generates Node IDs and BLS keys
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl">
        {[...Array(parseInt(numValidators) || 0)].map((_, i) => (
          <ValidatorForm key={i} index={i} />
        ))}
      </div>
    </div>
  );
};

export default BootstrapValidators;
