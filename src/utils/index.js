import { toast } from "react-toastify";

export const shortenString = (input, startLength = 8, endLength = 5) => {
  if (input?.length <= startLength + endLength) {
    return input; // No need to shorten
  }
  return `${input?.slice(0, startLength)}...${input?.slice(-endLength)}`;
};

export const handleCopy = (val, message) => {
  navigator.clipboard.writeText(val);
  toast.success(message);
};
export const steps = [
  { id: 1, title: "Validator Owner", phase: "CREATE" },
  { id: 2, title: "Config Defaults", phase: "CREATE" },
  { id: 3, title: "Chain ID", phase: "CREATE" },
  { id: 4, title: "Bootstrap Validators", phase: "DEPLOY" },
  { id: 5, title: "Create Orbit Tx", phase: "DEPLOY" },
  { id: 6, title: "Create Chain Tx", phase: "DEPLOY" },
  { id: 7, title: "Convert to Orbit", phase: "DEPLOY" },
  { id: 8, title: "Deploy VMC", phase: "DEPLOY" },
  { id: 9, title: "Initialize VMC", phase: "DEPLOY" },
];
// Map routes to steps
export const stepRoutes = {
  1: "/validator-owner",
  2: "/config-defaults",
  3: "/chain-id",
  4: "/bootstrap-validators",
  5: "/create-orbit-tx",
  6: "/create-chain-tx",
  7: "/convert-orbit",
  8: "/deploy-vmc",
  9: "/initialize-vmc",
};
export const totalSteps = 9;

export const allLogs = [
  "Checking bootstrap validator node sync...",
  "Waiting for Orbit EVM to produce blocks (30-60s)...",
  "Starting Signature Aggregator...",
  "Collecting BLS signatures from validators...",
  "Calling initialize() on VMC proxy...",
  "Finalizing deployment state...",
];
export const deployVmcSteps = [
  "Deploying Validator Manager implementation...",
  "Deploying Proxy Admin...",
  "Deploying Transparent Proxy...",
  "Linking implementation to proxy...",
  "Verifying contract source...",
];
export const createChainTxSteps = [
  "Submitting Create Chain Tx...",
  "Waiting for confirmation...",
  "Signing Create Chain transaction...",
  "Extracting Blockchain ID and VM ID...",
  "Storing in sidecar.json...",
];
export const convertToOrbitSteps = [
  "Submitting Convert to Orbit...",
  "Waiting for finalization (~30s)...",
  "Registering bootstrap validators...",
  "Assigning Validation IDs...",
  "Storing results in sidecar.json...",
];
