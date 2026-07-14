import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";

const wizard = {
  state: {
    steps: {
      subnet: {},
      validators: [],
      vmc: {},
      bootstrap: {},
      chain: {},
    },
    loading: false,
    error: null,
    createSubnetTxID: null,
    deployedBootstrapValidatorID: null,
  },
  reducers: {
    setLoading(state, payload) {
      return { ...state, loading: payload };
    },
    setError(state, payload) {
      return { ...state, error: payload };
    },
    setCreateSubnetTxID(state, payload) {
      return { ...state, createSubnetTxID: payload };
    },
    setDeployedBootstrapValidatorID(state, payload) {
      return { ...state, deployedBootstrapValidatorID: payload };
    },
    updateStepData(state, { step, data }) {
      return {
        ...state,
        steps: {
          ...state.steps,
          [step]: {
            ...state.steps[step],
            ...data,
          },
        },
      };
    },
    resetWizard(state) {
      return {
        steps: {
          subnet: {},
          validators: [],
          vmc: {},
          bootstrap: {},
          chain: {},
        },
        loading: false,
        error: null,
      };
    },
  },
  effects: (dispatch) => ({
    async postSubnetData(payload, rootState) {
      dispatch.wizard.setLoading(true);
      try {
        // Step 1: Check availability
        const res = await axiosInstance.post("/subnets/check", payload);
        if (res?.data && res?.data?.available === false) {
          const errorMsg =
            "Network Name and Chain ID already exist, please choose another one";
          throw new Error(errorMsg);
        }
        if (res) {
          // Step 2: Create orbit (if availability check passes)
          const createPayload = {
            networkName: payload.networkName,
            vm: {
              type: "subnet_evm",
              chainId: payload.chainId,
              tokenSymbol: payload.tokenSymbol || "MGT",
              version: "latest",
              defaults: "production",
            },
            sovereign: true,
            validatorManagement: {
              type: "proof_of_majority",
              validatorManagerOwner: "",
              proxyContractOwner: "",
              rewardBasisPoints: 0,
            },
            interoperability: {
              warp: true,
              icm: false,
              externalGasToken: false,
              icmRegistryAtGenesis: false,
            },
            force: false,
            enableDebugging: true,
            initialTokenAllocation: [
              {
                address: "0xCA3fd9482efC96A4CADf2e67047513D2BE94d2dB",
                amount: 1000000,
              },
            ],
          };
          const response = await axiosInstance.post("/subnets", createPayload);
          toast.success("Orbit created successfully!");
          // Store response data
          dispatch.wizard.setCreateSubnetTxID(response?.data?.id);
          dispatch.wizard.updateStepData({
            step: "subnet",
            data: response.data,
          });
          return response.data;
        }
      } catch (error) {
        console.error(
          "Error in postSubnetData:",
          error?.response?.data?.error?.message || error.response,
        );
        toast.error(error?.response?.data?.error?.message || error.message);
        dispatch.wizard.setError(error.message);
        throw error;
      } finally {
        dispatch.wizard.setLoading(false);
      }
    },
    async bootstrapValidators(payload, rootState) {
      dispatch.wizard.setLoading(true);
      console.log("Bootstrapping validators with payload:", payload);
      try {
        const response = await axiosInstance.post(
          `/subnets/${rootState.wizard.createSubnetTxID}/deploy`,
          payload,
        );
        if (response) {
          console.log("Bootstrap validators response:", response);
          toast.success("Bootstrap validators deployed successfully!");
          dispatch.wizard.setDeployedBootstrapValidatorID(
            response?.data?.jobId,
          );
          dispatch.wizard.updateStepData({
            step: "bootstrap",
            data: response.data,
          });
          return response.data;
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
        dispatch.wizard.setError(error.message);
        throw error;
      } finally {
        dispatch.wizard.setLoading(false);
      }
    },
    async createsubnetTx(payload, rootState) {
      dispatch.wizard.setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/jobs/${rootState.wizard.deployedBootstrapValidatorID}`,
        );
        if (response?.data?.state === "pending") {
          toast.success("Orbit transaction created successfully!");
        }
        dispatch.wizard.updateStepData({
          step: "subnet",
          data: response.data,
        });
        return response.data;
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
        dispatch.wizard.setError(error.message);
        throw error;
      } finally {
        dispatch.wizard.setLoading(false);
      }
    },
    async createChainTx(payload, rootState) {
      dispatch.wizard.setLoading(true);
      try {
        const response = await axiosInstance.post(
          `/subnets/${payload.subnetId}/create-chain-tx`,
          payload,
        );
        dispatch.wizard.updateStepData({
          step: "chain",
          data: response.data,
        });
        return response.data;
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
        dispatch.wizard.setError(error.message);
        throw error;
      } finally {
        dispatch.wizard.setLoading(false);
      }
    },
    async convertL1(payload, rootState) {
      dispatch.wizard.setLoading(true);
      try {
        const response = await axiosInstance.post(
          `/subnets/${payload.subnetId}/convert-l1`,
          payload,
        );
        dispatch.wizard.updateStepData({
          step: "convert",
          data: response.data,
        });
        return response.data;
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
        dispatch.wizard.setError(error.message);
        throw error;
      } finally {
        dispatch.wizard.setLoading(false);
      }
    },
    async deployVMC(payload, rootState) {
      dispatch.wizard.setLoading(true);
      try {
        const response = await axiosInstance.post(
          `/subnets/${payload.subnetId}/deploy-vmc`,
          payload,
        );
        dispatch.wizard.updateStepData({
          step: "vmc",
          data: response.data,
        });
        return response.data;
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
        dispatch.wizard.setError(error.message);
        throw error;
      } finally {
        dispatch.wizard.setLoading(false);
      }
    },
    async initializeVMC(payload, rootState) {
      dispatch.wizard.setLoading(true);
      try {
        const response = await axiosInstance.post(
          `/subnets/${payload.subnetId}/initialize-vmc`,
          payload,
        );
        dispatch.wizard.updateStepData({
          step: "vmc",
          data: response.data,
        });
        return response.data;
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
        dispatch.wizard.setError(error.message);
        throw error;
      } finally {
        dispatch.wizard.setLoading(false);
      }
    },
  }),
};
export default wizard;
