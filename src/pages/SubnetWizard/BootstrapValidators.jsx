import React, { useEffect } from "react";
import { HiOutlineServer, HiQuestionMarkCircle } from "react-icons/hi";
import { BsDatabase } from "react-icons/bs";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import NetworkSummary from "../../components/NetworkSummary";

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

    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
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
      {/* <div>
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
      </div> */}
    </div>
    {/* <div className="mb-6">
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
    </div> */}

    {/* <div>
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
    </div> */}
  </div>
);

const BootstrapValidators = () => {
  const { setRunAction, setStepValidator } = useOutletContext();
  const dispatch = useDispatch();
  const subnetId = useSelector((state) => state.wizard.createSubnetTxID);
  const networkDetails = useSelector((state) => state.wizard.networkDetails);

  const createEmptyValidator = () => ({
    nodeId: "",
    weight: "100",
    blsPublicKey: "",
    blsProofOfPossession: "",
    presetId: "",
  });

  const formik = useFormik({
    initialValues: {
      numValidators: "1",
      nodeOption: "own",
      validators: [createEmptyValidator()],
    },
    validationSchema: Yup.object({
      numValidators: Yup.number()
        .typeError("Validator count must be a number")
        .integer("Validator count must be a whole number")
        .min(1, "At least 1 validator is required")
        .required("Validator count is required"),
      validators: Yup.array().of(
        Yup.object({
          nodeId: Yup.string().trim().required("Node ID is required"),
          weight: Yup.string().trim().required("Weight is required"),
          blsPublicKey: Yup.string()
            .trim()
            .required("BLS public key is required"),
          blsProofOfPossession: Yup.string()
            .trim()
            .required("BLS proof of possession is required"),
        }),
      ),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const payload = {
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
        numNodes: Number(values.numValidators),
        nonSov: {
          sameControlKey: true,
          threshold: 0,
          controlKeys: [],
          subnetAuthKeys: [],
        },
        bootstrapValidators: {
          validators: values.validators.map((v) => ({
            nodeId: v.nodeId,
            service: "rytNode1.service",
            configFile: "/home/admin/testNetwork/config/node1.json",
            weight: Number(v.weight || 100),
            balance: 1000000000,
            blsPublicKey: v.blsPublicKey,
            blsProofOfPossession: v.blsProofOfPossession,
            changeOwnerAddr: "",
          })),
          jsonFilePath: "",
          generateNodeId: values.nodeOption === "generate",
          bootstrapEndpoints: [],
          numBootstrapValidators: Number(values.numValidators),
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
    },
  });

  // const syncValidatorList = (nextCountValue) => {
  //   const rawCount = Number(nextCountValue);
  //   const count = Number.isFinite(rawCount) && rawCount > 0 ? rawCount : 0;
  //   const currentValidators = Array.isArray(formik.values.validators)
  //     ? formik.values.validators
  //     : [];

  //   if (count <= 0) {
  //     formik.setFieldValue("validators", [createEmptyValidator()]);
  //     return;
  //   }

  //   const nextValidators = Array.from({ length: count }, (_, index) => {
  //     return currentValidators[index] || createEmptyValidator();
  //   });

  //   formik.setFieldValue("validators", nextValidators);
  // };

  const handleValidatorChange = (index, field, value) => {
    formik.setFieldValue(`validators[${index}].${field}`, value);
  };

  const handlePresetSelect = (index, presetId) => {
    if (!presetId) {
      formik.setFieldValue(`validators[${index}].presetId`, "");
      return;
    }

    const selectedPreset = PRESET_VALIDATORS.find((v) => v.id === presetId);
    if (!selectedPreset) return;

    const nextValidator = {
      ...(formik.values.validators[index] || createEmptyValidator()),
      presetId: selectedPreset.id,
      nodeId: selectedPreset.nodeId,
      weight: selectedPreset.weight,
      blsPublicKey: selectedPreset.blsPublicKey,
      blsProofOfPossession: selectedPreset.blsProofOfPossession,
    };

    formik.setFieldValue(`validators[${index}]`, nextValidator);
  };

  useEffect(() => {
    const validateStep = async () => {
      const errors = await formik.validateForm();
      const touchedState = {
        numValidators: true,
        validators: (formik.values.validators || []).map(() => ({
          nodeId: true,
          weight: true,
          blsPublicKey: true,
          blsProofOfPossession: true,
        })),
      };

      formik.setTouched(touchedState, true);

      if (Object.keys(errors).length > 0) {
        const firstError = Object.values(errors)
          .flatMap((value) => {
            if (Array.isArray(value)) {
              return value.flatMap((nested) => {
                if (typeof nested === "string") return [nested];
                return Object.values(nested || {});
              });
            }
            return [value];
          })
          .find(Boolean);

        toast.error(firstError || "Please review the validator fields");
        throw new Error(firstError || "Please review the validator fields");
      }

      return true;
    };

    setRunAction(() => async () => {
      await validateStep();
      await formik.submitForm();
    });

    setStepValidator(() => validateStep);

    return () => {
      setRunAction(null);
      setStepValidator(null);
    };
  }, [setRunAction, setStepValidator]);

  const validators = formik.values.validators || [];
  const nodeOption = formik.values.nodeOption;
  const numValidators = formik.values.numValidators;

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-green-600/20 flex items-center justify-center text-green-500 animate-float mt-2">
          <HiOutlineServer size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">
            Bootstrap Validator Manifest
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

      <NetworkSummary network={networkDetails} />

      <div className="w-full mb-4 max-w-2xl">
        <label className="block text-[14px] font-bold text-white capitalize tracking-wider mb-2">
          <span className="group relative inline-flex">
            <HiQuestionMarkCircle
              aria-label="What does 1-of-1 authorization threshold mean?"
              className="text-cyan-400 cursor-help"
              size={15}
            />
            <span className="pointer-events-none absolute bottom-full left-0 z-20 mb-2 hidden w-72 rounded-lg border border-cyan-500/30 bg-[#060914] p-3 text-left text-xs font-normal normal-case leading-relaxed text-gray-300 shadow-xl group-hover:block group-focus-within:block">
              Bootstrap Validators are the initial trusted nodes that help your
              network start and establish communication with other validators.
              The details provided here are used to identify and connect these
              validators during network deployment
            </span>
          </span>
          Initial Validator Count <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={numValidators}
          onChange={(e) =>
            formik.setFieldValue("numValidators", e.target.value)
          }
          onBlur={formik.handleBlur}
          className="w-full bg-[#0a0f1d] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors"
        />
        {formik.touched.numValidators && formik.errors.numValidators && (
          <p className="mt-2 text-[11px] text-red-400">
            {formik.errors.numValidators}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4 max-w-2xl">
        <div
          onClick={() => formik.setFieldValue("nodeOption", "own")}
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
                Specify the Node IDs used to initialize the validator set.
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
