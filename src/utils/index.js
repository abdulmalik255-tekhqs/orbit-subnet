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
  // { id: 1, title: "Validator Owner", phase: "CREATE" },
  { id: 1, title: "Config Defaults", phase: "CREATE" },
  { id: 2, title: "Network Details", phase: "CREATE" },
  { id: 3, title: "Bootstrap Validator Manifest", phase: "DEPLOY" },
  { id: 4, title: "Riff Registration", phase: "DEPLOY" },
  { id: 5, title: "Network Initialization", phase: "DEPLOY" },
  { id: 6, title: "Sovereignty", phase: "DEPLOY" },
  // { id: 7, title: "Deploy VMC", phase: "DEPLOY" },
  { id: 7, title: "Initialize VMC", phase: "DEPLOY" },
];
// Map routes to steps
export const stepRoutes = {
  // 1: "/validator-owner",
  1: "/config-defaults",
  2: "/chain-id",
  3: "/bootstrap-validators",
  4: "/create-riff-tx",
  5: "/create-chain-tx",
  6: "/convert-riff",
  // 7: "/deploy-vmc",
  7: "/initialize-vmc",
};
export const totalSteps = 7;

export const allLogs = [
  "Verifying bootstrap validator node synchronization...",
  // "Waiting for Riff block production (30–60s)...",
  "Initializing signature aggregation...",
  "Collecting validator signatures...",
  // "Invoking initialize() on the VMC proxy...",
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
  "Sets up the core of your Riff network on-chain.",
  "Network configuration is applied.",
  "Issues the unique identifiers used in the next steps.",
];

export const convertToRiffSteps = [
  "Converting your network to run under its own sovereign validator set.",
  "Registering the bootstrap validators that secure the network at launch.",
  "Assigning each validator a unique on-chain validation ID.",
];
export const riffRegistrationStep = [
  "Registering your Riff off-chain under sovereign control.",
  "Registering bootstrap validator set...",
  "Authorizing  the registration with your Ledger-derived control keys.",
  "Preparing your Riff for network initialization.",
];
