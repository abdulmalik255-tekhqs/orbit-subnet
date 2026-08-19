import React, { useEffect, useState } from "react";
import { HiOutlineServer } from "react-icons/hi";
import { BsDatabase } from "react-icons/bs";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const PRESET_VALIDATORS = [
  {
    id: "validator-node-1",
    label: "Validator Node 1",
    nodeId: "NodeID-EAYeSnMjfPwa5icwfVEiEcwMmGRAJQJoL",
    weight: "20",
    blsPublicKey:
      "0x93dec875b66f52a9a349cdae963ed194b2287f76fc15cec7be23bc936ab6a2e8f1f91ebd8aa89666e1334fd407c3a346",
    blsProofOfPossession:
      "0x828499204d8275e23e5165c9b498b287551c9ab563aca94ed04723fd89850b38e45011b7238a6278f62d9da5e3d09fee13476290d9b393d869df86b8ffba1bfd631887a66fed04f53e0397bec486a8651ec16b354831d7643038c575b2621682",
  },
];

const ValidatorForm = ({
  index,
  data = {},
  onChange,
  onSelectPreset,
  presetOptions,
}) => (
  <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-6 mb-4">
    <div className="flex items-center gap-2 mb-6">
      <BsDatabase className="text-blue-500" size={16} />
      <span className="text-white font-semibold">Validator {index + 1}</span>
    </div>

    <div className="mb-6">
      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
        Preset Validator
      </label>
      <select
        value={data?.presetId || ""}
        onChange={(e) => onSelectPreset(index, e.target.value)}
        className="w-full bg-[#0a0f1d] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors cursor-pointer"
      >
        <option value="">Custom</option>
        {presetOptions.map((preset) => (
          <option key={preset.id} value={preset.id}>
            {preset.label}
          </option>
        ))}
      </select>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
          Node ID
        </label>
        <input
          type="text"
          placeholder="Enter Node ID"
          value={data?.nodeId || ""}
          onChange={(e) => onChange(index, "nodeId", e.target.value)}
          className="w-full bg-[#0a0f1d] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors"
        />
      </div>
      <div>
        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
          Weight
        </label>
        <input
          placeholder="Enter Weight"
          type="text"
          value={data?.weight || ""}
          onChange={(e) => onChange(index, "weight", e.target.value)}
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
        placeholder="Enter BLS Public Key (0x<96 hex chars>)"
        value={data?.blsPublicKey || ""}
        onChange={(e) => onChange(index, "blsPublicKey", e.target.value)}
        className="w-full bg-[#0a0f1d] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors"
      />
    </div>

    <div>
      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
        BLS Proof of Possession (96 bytes)
      </label>
      <input
        type="text"
        placeholder="Enter BLS Proof of Possession (0x<192 hex chars>)"
        value={data?.blsProofOfPossession || ""}
        onChange={(e) =>
          onChange(index, "blsProofOfPossession", e.target.value)
        }
        className="w-full bg-[#0a0f1d] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors"
      />
    </div>
  </div>
);

const BootstrapValidators = () => {
  const [numValidators, setNumValidators] = useState("1");
  const [nodeOption, setNodeOption] = useState("own");
  const [validators, setValidators] = useState([
    {
      nodeId: "",
      weight: "",
      blsPublicKey: "",
      blsProofOfPossession: "",
      presetId: "",
    },
  ]);
  const { setRunAction } = useOutletContext();
  const dispatch = useDispatch();
  const subnetId = useSelector((state) => state.wizard.createSubnetTxID);

  useEffect(() => {
    const count = parseInt(numValidators) || 0;
    setValidators((prev) => {
      const next = [...prev];
      if (count > next.length) {
        for (let i = next.length; i < count; i++) {
          next.push({
            nodeId: "",
            weight: "100",
            blsPublicKey: "",
            blsProofOfPossession: "",
            presetId: "",
          });
        }
      } else {
        return next.slice(0, count);
      }
      return next;
    });
  }, [numValidators]);

  const handleValidatorChange = (index, field, value) => {
    setValidators((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handlePresetSelect = (index, presetId) => {
    setValidators((prev) => {
      if (!prev[index]) return prev;

      const next = [...prev];

      if (!presetId) {
        next[index] = {
          ...next[index],
          presetId: "",
        };
        return next;
      }

      const selectedPreset = PRESET_VALIDATORS.find((v) => v.id === presetId);
      if (!selectedPreset) return prev;

      next[index] = {
        ...next[index],
        presetId: selectedPreset.id,
        nodeId: selectedPreset.nodeId,
        weight: selectedPreset.weight,
        blsPublicKey: selectedPreset.blsPublicKey,
        blsProofOfPossession: selectedPreset.blsProofOfPossession,
      };

      return next;
    });
  };

  useEffect(() => {
    setRunAction(() => async () => {
      const count = parseInt(numValidators);
      if (isNaN(count) || count < 1) {
        const errorMsg =
          "Please enter a valid number of validators (at least 1).";
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }

      if (nodeOption === "own") {
        const isValid = validators.every(
          (v) =>
            v.nodeId.trim() !== "" &&
            v.weight.trim() !== "" &&
            v.blsPublicKey.trim() !== "" &&
            v.blsProofOfPossession.trim() !== "",
        );

        if (!isValid) {
          const errorMsg = "Please fill in all validator fields.";
          toast.error(errorMsg);
          throw new Error(errorMsg);
        }
      }

      let payload = {
        network: "private",
        walletName: "rytkey",
        avalanchegoVersion: "v1.13.5",
        useLedger: false,
        ledgerAddresses: [],
        subnetOnly: false,
        convertOnly: false,
        subnetId: subnetId || "",
        outputTxPath: "",
        mainnetChainId: 0,
        numNodes: count,
        nonSov: {
          sameControlKey: true,
          threshold: 0,
          controlKeys: [],
          subnetAuthKeys: [],
        },
        bootstrapValidators: {
          validators: validators.map((v) => ({
            nodeId: v.nodeId,
            service: "rytNode1.service",
            configFile: "/home/admin/testNetwork/config/node1.json",
            weight: Number(v.weight),
            balance: 1000000000,
            blsPublicKey: v.blsPublicKey,
            blsProofOfPossession: v.blsProofOfPossession,
            changeOwnerAddr: "",
          })),
          jsonFilePath: "",
          generateNodeId: nodeOption === "generate",
          bootstrapEndpoints: [],
          numBootstrapValidators: count,
          deployBalanceAvax: 0,
          deployWeight: 0,
          changeOwnerAddress: "",
        },
        localMachine: {
          useLocalMachine: null,
          partialSync: null,
          nodeBinaryPath: "",
          httpPorts: [],
          stakingPorts: [],
          stakingTlsKeyPaths: [],
          stakingCertKeyPaths: [],
          stakingSignerKeyPaths: [],
        },
        icm: {
          skipIcmDeploy: false,
          skipRelayer: true,
          icmVersion: "",
          relayerVersion: "",
          relayerBinPath: "",
          relayerLogLevel: "",
          relayerAmount: 0,
          relayerKeyName: "",
          icmKeyName: "",
          cchainIcmKeyName: "",
          relayCchain: null,
          cchainFundingKey: "",
          relayerAllowPrivateIps: null,
          messengerContractAddressPath: "",
          messengerDeployerAddressPath: "",
          messengerDeployerTxPath: "",
          registryBytecodePath: "",
        },
        vmc: {
          atL1: true,
          blockchainName: "",
          cChain: false,
          blockchainId: "",
          privateKey: "",
          privateKeyName: "",
          useGenesisKey: false,
        },
        proofOfStake: {
          minimumStakeAmount: 0,
          maximumStakeAmount: 0,
          minimumStakeDuration: 0,
          minimumDelegationFee: 0,
          maximumStakeMultiplier: 0,
          weightToValueFactor: 0,
        },
        signatureAggregator: {
          logLevel: "",
          logToStdout: false,
          endpoint: "",
          version: "",
        },
      };

      console.log("Bootstrap Validators Payload:", payload);
      await dispatch.wizard.bootstrapValidators(payload);
    });

    return () => setRunAction(null);
  }, [numValidators, nodeOption, validators, dispatch, setRunAction, subnetId]);
  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-green-600/20 flex items-center justify-center text-green-500 animate-float mt-2">
          <HiOutlineServer size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">
            Validator Set Initialization
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed font-normal">
            Configure validator identities from active nodes.
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
        <label className="block text-[14px] font-bold text-white capitalize tracking-wider mb-2">
          Initial Validator Count <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={numValidators}
          onChange={(e) => setNumValidators(e.target.value)}
          className="w-full bg-[#0a0f1d] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4 max-w-2xl">
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
              {/* <div className="text-white font-semibold mb-1">
                I have my own nodes
              </div> */}
              <div className="text-white font-semibold mb-1 leading-relaxed">
                Specify the Node IDs and BLS public keys used to initialize the
                validator set.
              </div>
            </div>
          </div>
        </div>

        {/* <div
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
        </div> */}
      </div>

      <div className="max-w-2xl">
        {validators.map((data, i) => (
          <ValidatorForm
            key={i}
            index={i}
            data={data}
            onChange={handleValidatorChange}
            onSelectPreset={handlePresetSelect}
            presetOptions={PRESET_VALIDATORS}
          />
        ))}
      </div>
    </div>
  );
};

export default BootstrapValidators;
