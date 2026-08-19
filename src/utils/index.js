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
  { id: 5, title: "CreateOrbitTx", phase: "DEPLOY" },
  { id: 6, title: "CreateChainTx", phase: "DEPLOY" },
  { id: 7, title: "Orbit Isolation", phase: "DEPLOY" },
  // { id: 8, title: "Deploy VMC", phase: "DEPLOY" },
  { id: 8, title: "Initialize VMC", phase: "DEPLOY" },
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
  // 8: "/deploy-vmc",
  8: "/initialize-vmc",
};
export const totalSteps = 8;

export const allLogs = [
  "Verifying bootstrap validator node synchronization...",
  "Waiting for Orbit block production (30–60s)...",
  "Initializing BLS signature aggregation...",
  "Collecting validator BLS signatures...",
  "Invoking initialize() on the VMC proxy...",
  "Finalizing deployment state...",
];

export const deployVmcSteps = [
  "Deploying Validator Manager implementation...",
  "Deploying Proxy Admin contract...",
  "Deploying Transparent Proxy contract...",
  "Binding implementation to proxy...",
  "Verifying deployed contract source...",
];

export const createChainTxSteps = [
  "Submitting CreateChainTx...",
  "Awaiting transaction confirmation...",
  "Authorizing Create Chain transaction...",
  "Resolving Blockchain ID and VM ID...",
  "Persisting deployment metadata to sidecar.json...",
];

export const convertToOrbitSteps = [
  "Submitting ConvertToOrbit transaction...",
  "Awaiting transaction finalization (~30s)...",
  "Registering bootstrap validator set...",
  "Assigning validator validation IDs...",
  "Persisting deployment metadata to sidecar.json...",
];
