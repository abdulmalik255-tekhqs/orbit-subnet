import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  HiOutlineLockClosed,
  HiOutlineKey,
  HiEye,
  HiEyeOff,
} from "react-icons/hi";
import { toast } from "react-toastify";
import { loginValue } from "../../app.config";

const Login = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values, { setFieldError }) => {
      // With no configured value there is nothing to check against, so refuse
      // rather than letting an empty comparison through.
      if (!loginValue) {
        const message =
          "Login is not configured. Set REACT_APP_LOGIN_VALUE and restart the dev server.";
        toast.error(message);
        setFieldError("password", message);
        return;
      }

      if (values.password !== loginValue) {
        const message = "Incorrect password. Please try again.";
        toast.error(message);
        setFieldError("password", message);
        return;
      }

      toast.success("Welcome to RYT RIFF!");
      onSuccess();
    },
  });

  const errorMessage = formik.touched.password && formik.errors.password;

  return (
    <div className="min-h-screen bg-[#060914] text-white font-sans flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center font-bold text-white text-lg">
            RY
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-white font-bold text-xl tracking-tight">
              RYT
            </span>
            <span className="text-blue-500 font-semibold text-xl animate-pulse">
              RIFF
            </span>
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-[#0a0f1d] border border-[#1e293b] rounded-2xl p-8"
        >
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
              <HiOutlineLockClosed size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Restricted Access
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed mt-1">
                Enter the access password to open the deployment wizard.
              </p>
            </div>
          </div>

          <label
            htmlFor="password"
            className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoFocus
              autoComplete="current-password"
              placeholder="Enter access password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(errorMessage)}
              className={`w-full bg-[#060914] border rounded-lg pl-4 pr-12 py-3 text-white focus:outline-none transition-colors ${
                errorMessage
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#1e293b] focus:border-blue-600"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all"
            >
              {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
            </button>
          </div>
          {errorMessage && (
            <p className="mt-2 text-[11px] text-red-400">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="mt-8 w-full flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[11px] font-bold uppercase tracking-wide transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)]"
          >
            <HiOutlineKey size={14} />
            Unlock Wizard
          </button>
        </form>

        <p className="text-center text-[11px] text-gray-600 mt-6">
          RYT Mainnet &middot; Authorized operators only
        </p>
      </div>
    </div>
  );
};

export default Login;
