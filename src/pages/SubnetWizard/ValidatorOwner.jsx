import React, { useState } from "react";
import { LuKey, LuFolder, LuPlus } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";

const ValidatorOwner = () => {
  const [method, setMethod] = useState("manual");
  const [address, setAddress] = useState(
    "0x833261B00C173896A7E0e8C7a6e884929442d1AF",
  );

  const selectionCards = [
    {
      id: "existing",
      title: "Select existing key",
      description: "Choose from keys stored in ~/.ryt-cli/key/",
      icon: <LuFolder size={20} />,
    },
    {
      id: "new",
      title: "Create new key",
      description: "Generate a new Ed25519 key pair on this device",
      icon: <LuPlus size={20} />,
    },
    {
      id: "manual",
      title: "Enter address manually",
      description: "Input an existing 0x EVM address",
      icon: <FiEdit size={20} />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500 animate-float mt-2">
          <LuKey size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Orbit Creator</h1>
          <p className="text-gray-400 text-sm">
            This EVM address will have admin control over the ValidatorManager
            contract — it can add or remove validators once the Orbit is live.
          </p>
        </div>
      </div>

      <div className="mb-4">
        <span className="border border-red-400 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
          Required
        </span>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {selectionCards.map((card) => (
          <div
            key={card.id}
            onClick={() =>
              card.id !== "existing" && card.id !== "new" && setMethod(card.id)
            }
            className={`cursor-pointer p-4 rounded-xl border transition-all ${
              method === card.id
                ? "bg-blue-600/10 border-blue-600/50 ring-1 ring-blue-600/50"
                : "bg-[#0f172a] border-[#1e293b] hover:border-gray-500"
            } ${card.id !== "manual" ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    method === card.id
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-600"
                  }`}
                >
                  {method === card.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <span
                  className={`text-sm font-semibold ${method === card.id ? "text-white" : "text-gray-300"}`}
                >
                  {card.title}
                </span>
              </div>
              <div
                className={
                  method === card.id ? "text-blue-500" : "text-gray-500"
                }
              >
                {card.icon}
              </div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div> */}

      {method === "manual" && (
        <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="block text-gray-400 text-xs font-medium mb-2">
            Owner Address<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-[#0f172a] border border-[#1e293b] rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="0x..."
            disabled={true}
          />
        </div>
      )}

      {/* <div className="bg-orange-900/10 border border-orange-500/20 rounded-lg p-4 flex items-start gap-4">
        <div className="text-orange-500 mt-0.5">
        </div>
        <div className="text-sm">
          <p className="text-gray-300">
            <span className="text-orange-400 font-semibold">
              P-Chain (P-ryt1...) or X-Chain addresses are not accepted.
            </span>{" "}
            Must be an EVM 0x format address.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default ValidatorOwner;
