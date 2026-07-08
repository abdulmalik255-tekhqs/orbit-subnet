import React, { useState, useEffect } from "react";
import { MdOutlineFingerprint } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ChainID = () => {
  const { setRunAction } = useOutletContext();
  const dispatch = useDispatch();
  const [chainId, setChainId] = useState(73821);
  const [networkName, setNetworkName] = useState("");
  const [symbol, setSymbol] = useState("MYTKN");

  useEffect(() => {
    setRunAction(() => async () => {
      if (!networkName || networkName.trim() === "") {
        toast.error("Network Name is required");
        throw new Error("Network Name is required");
      }
      if (!chainId || chainId <= 0) {
        toast.error("Valid Chain ID is required");
        throw new Error("Valid Chain ID is required");
      }

      await dispatch.wizard.postSubnetData({
        networkName,
        chainId,
        tokenSymbol: symbol,
      });
    });

    return () => setRunAction(null);
  }, [networkName, chainId, symbol, dispatch, setRunAction]);

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
        <div className="w-full mb-2">
          <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-[2px]">
            Network Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={networkName}
            onChange={(e) => setNetworkName(e.target.value)}
            placeholder="e.g. My Custom Network"
            className="w-full bg-[#0a0f1d] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>
        <div className="w-full mb-2">
          <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-[2px]">
            Chain ID <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={chainId}
            onChange={(e) => setChainId(Number(e.target.value))}
            className="w-full bg-[#0a0f1d] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
        <div className="w-full  mb-2">
          <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-[2px]">
            Token Symbol <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="w-full bg-[#0a0f1d] border border-[#1e293b] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600 transition-colors uppercase"
            maxLength={8}
          />
        </div>
      </div>

      <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-4 flex items-start gap-3 mb-8">
        <IoInformationCircleOutline
          className="text-blue-400 shrink-0 mt-0.5"
          size={20}
        />
        <p className="text-blue-400/90 text-[13px] leading-relaxed">
          <span className="font-bold">Mainnet rules:</span> Use a different
          Chain ID than your testnet deployment to prevent replay attacks. The
          CLI will warn if a conflict is detected. A separate mainnet override
          (sidecar.SubnetEVMMainnetChainID) can be applied at deploy time.
        </p>
      </div>

      <div className="bg-[#0a0f1d] border border-[#1e293b] rounded-lg overflow-hidden max-w-md">
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
            sidecar.SubnetEVMMainnetChainID
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChainID;
