import React, { useEffect } from "react";
import { MdOutlineFingerprint } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const ChainID = () => {
  const { setRunAction } = useOutletContext();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      networkName: "",
      chainId: "",
      symbol: "",
      description: "",
    },
    validationSchema: Yup.object({
      networkName: Yup.string()
        .trim()
        .required("Network Name is required")
        .matches(/^\S+$/, "Network Name must not contain spaces")
        .max(20, "Network Name must be 20 characters or less"),
      chainId: Yup.string()
        .required("Chain ID is required")
        .matches(/^\d{4}$/, "Chain ID must be exactly 4 digits"),
      symbol: Yup.string()
        .trim()
        .required("Token Symbol is required")
        .max(10, "Token Symbol must be 10 characters or less"),
      description: Yup.string().trim().required("Description is required"),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      await dispatch.wizard.postSubnetData({
        networkName: values.networkName.trim(),
        chainId: Number(values.chainId),
        tokenSymbol: values.symbol.trim().toUpperCase(),
        description: values.description.trim(),
      });
    },
  });

  const hasFieldError = (fieldName) =>
    formik.touched[fieldName] && formik.errors[fieldName];

  useEffect(() => {
    setRunAction(() => async () => {
      const errors = await formik.validateForm();

      formik.setTouched(
        {
          networkName: true,
          chainId: true,
          symbol: true,
          description: true,
        },
        true,
      );

      if (Object.keys(errors).length > 0) {
        const firstError = Object.values(errors)[0];
        // toast.error(firstError);
        throw new Error(firstError);
      }

      await formik.submitForm();
    });

    return () => setRunAction(null);
  }, [setRunAction]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500 animate-float mt-2">
          <MdOutlineFingerprint size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Network Details</h1>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
            Specify your network name and EVM chain identifier. The Chain ID
            must be a positive integer and globally unique to prevent replay
            attacks.
          </p>
        </div>
      </div>

      <div className="mb-4">
        <span className="border border-red-400 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          Required
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
        <div className="w-full mb-2">
          <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-[2px]">
            Network Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="networkName"
            value={formik.values.networkName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="e.g. My Custom Network"
            className={`w-full bg-[#0a0f1d] border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
              hasFieldError("networkName")
                ? "border-red-500 focus:border-red-500"
                : "border-[#1e293b] focus:border-blue-600"
            }`}
          />
          {hasFieldError("networkName") && (
            <p className="mt-1 text-[11px] text-red-400">
              {formik.errors.networkName}
            </p>
          )}
        </div>
        <div className="w-full mb-2">
          <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-[2px]">
            Chain ID <span className="text-red-500">*</span>
          </label>
          <input
            placeholder="1234"
            type="text"
            inputMode="numeric"
            name="chainId"
            value={formik.values.chainId}
            onChange={(e) => {
              const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 4);
              formik.setFieldValue("chainId", digitsOnly);
            }}
            onBlur={formik.handleBlur}
            className={`w-full bg-[#0a0f1d] border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
              hasFieldError("chainId")
                ? "border-red-500 focus:border-red-500"
                : "border-[#1e293b] focus:border-blue-600"
            }`}
          />
          {hasFieldError("chainId") && (
            <p className="mt-1 text-[11px] text-red-400">
              {formik.errors.chainId}
            </p>
          )}
        </div>
        <div className="w-full mb-2">
          <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-[2px]">
            Token Symbol <span className="text-red-500">*</span>
          </label>
          <input
            placeholder="MYTKN"
            type="text"
            name="symbol"
            value={formik.values.symbol}
            onChange={(e) =>
              formik.setFieldValue("symbol", e.target.value.toUpperCase())
            }
            onBlur={formik.handleBlur}
            className={`w-full bg-[#0a0f1d] border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
              hasFieldError("symbol")
                ? "border-red-500 focus:border-red-500"
                : "border-[#1e293b] focus:border-blue-600"
            }`}
          />
          {hasFieldError("symbol") && (
            <p className="mt-1 text-[11px] text-red-400">
              {formik.errors.symbol}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-2">
        <div className="w-full mb-2">
          <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-[2px]">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Added to the genesis config as a comment for reference."
            as="textarea"
            rows={4}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full bg-[#0a0f1d] border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors ${
              hasFieldError("description")
                ? "border-red-500 focus:border-red-500"
                : "border-[#1e293b] focus:border-blue-600"
            }`}
          />
          {hasFieldError("description") && (
            <p className="mt-1 text-[11px] text-red-400">
              {formik.errors.description}
            </p>
          )}
        </div>
      </div>

      <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-4 flex items-start gap-3 mb-8">
        <IoInformationCircleOutline
          className="text-blue-400 shrink-0 mt-0.5"
          size={20}
        />
        <p className="text-blue-400/90 text-[13px] leading-relaxed">
          <span className="font-bold">Mainnet Rules:</span> Use a different
          Chain ID than your testnet deployment to prevent replay attacks. The
          CLI will warn if a conflict is detected.
          {/* A separate mainnet override
          (sidecar.OrbitEVMMainnetChainID) can be applied at deploy time. */}
        </p>
      </div>

      {/* <div className="bg-[#0a0f1d] border border-[#1e293b] rounded-lg overflow-hidden max-w-md">
        <div className="grid grid-cols-2 p-4 border-b border-[#1e293b]/50">
          <span className="text-gray-500 text-[11px] font-medium">
            Stored as
          </span>
          <span className="text-gray-400 text-[11px] font-mono text-right">
            genesis.config.chainId
          </span>
        </div>
        <div className="grid grid-cols-2 p-4">
          <span className="text-gray-500 text-[11px] font-medium">
            Mainnet override
          </span>
          <span className="text-gray-400 text-[11px] font-mono text-right">
            sidecar.OrbitEVMMainnetChainID
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default ChainID;
