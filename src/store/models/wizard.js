import axiosInstance from "../../api/axios";

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
  },
  reducers: {
    setLoading(state, payload) {
      return { ...state, loading: payload };
    },
    setError(state, payload) {
      return { ...state, error: payload };
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
        await axiosInstance.post("/subnets/check-availability", payload);

        // Step 2: Create Subnet (if availability check passes)
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
            validatorManagerOwner: "0xA1b2C3d4E5f6789012345678901234567890AbCd",
            proxyContractOwner: "0xA1b2C3d4E5f6789012345678901234567890AbCd",
          },
          interoperability: {
            warp: true,
            icm: false,
          },
        };

        const response = await axiosInstance.post("/subnets", createPayload);

        // Store response data
        dispatch.wizard.updateStepData({ step: "subnet", data: response.data });
        return response.data;
      } catch (error) {
        dispatch.wizard.setError(error.message);
        throw error;
      } finally {
        dispatch.wizard.setLoading(false);
      }
    },
    async bootstrapValidators(payload, rootState) {
      dispatch.wizard.setLoading(true);
      try {
        const response = await axiosInstance.post(
          `/subnets/${payload.subnetId}/deploy`,
          payload,
        );
        dispatch.wizard.updateStepData({
          step: "bootstrap",
          data: response.data,
        });
        return response.data;
      } catch (error) {
        dispatch.wizard.setError(error.message);
        throw error;
      } finally {
        dispatch.wizard.setLoading(false);
      }
    },
    async createsubnetTx(payload, rootState) {
      dispatch.wizard.setLoading(true);
      try {
        const response = await axiosInstance.post(
          `/subnets/${payload.subnetId}/create-subnet-tx`,
          payload,
        );
        dispatch.wizard.updateStepData({
          step: "subnet",
          data: response.data,
        });
        return response.data;
      } catch (error) {
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
        dispatch.wizard.setError(error.message);
        throw error;
      } finally {
        dispatch.wizard.setLoading(false);
      }
    },
  }),
};
export default wizard;
