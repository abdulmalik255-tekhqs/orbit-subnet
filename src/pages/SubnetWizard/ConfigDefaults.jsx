import React, { useState } from "react";
import { FiSettings, FiFlask } from "react-icons/fi";
import { MdOutlineFactory } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";

const ConfigDefaults = () => {
  const [selectedPreset, setSelectedPreset] = useState("production");

  const presets = [
    {
      id: "test",
      title: "Test Environment",
      description:
        "1M tokens to ewoq test address, low gas, constant fees, ICM enabled, open permissions. Skips custom Steps 6-9.",
      //   icon: <FiFlask size={24} />,
      badge: "Fast setup",
      badgeColor: "text-blue-400 bg-blue-900/40 border-none",
    },
    {
      id: "production",
      title: "Production Environment",
      description:
        "1M tokens to newly created key, low gas, constant fees, ICM enabled, open permissions. Skips custom Steps 6-9.",
      icon: <MdOutlineFactory size={24} />,
      badge: "Recommended",
      badgeColor: "text-green-500 bg-green-900/40 border-none",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-500">
          <FiSettings size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Blockchain Configuration Defaults
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl">
            Choose a preset to drive the remaining configuration. Test and
            Production presets skip the advanced custom settings. Selecting
            "Custom" will show Steps 6-9 for fine-grained control.
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-8">
        <span className="bg-red-900/40 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          Required
        </span>
        <span className="bg-orange-900/40 text-orange-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
          Branches
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {presets.map((preset) => (
          <div
            key={preset.id}
            onClick={() => setSelectedPreset(preset.id)}
            className={`cursor-pointer rounded-xl p-8 transition-all border flex flex-col h-[280px] ${
              selectedPreset === preset.id
                ? "bg-[#0f172a] border-blue-600 ring-1 ring-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.1)]"
                : "bg-[#0a0f1d] border-[#1e293b] hover:border-gray-700"
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    selectedPreset === preset.id
                      ? "border-blue-600 bg-blue-600"
                      : "border-gray-600"
                  }`}
                >
                  {selectedPreset === preset.id && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <span
                  className={`text-lg font-semibold transition-colors ${
                    selectedPreset === preset.id
                      ? "text-white"
                      : "text-gray-400"
                  }`}
                >
                  {preset.title}
                </span>
              </div>
              {preset.icon && (
                <div
                  className={`transition-colors ${
                    selectedPreset === preset.id
                      ? "text-blue-500"
                      : "text-gray-600"
                  }`}
                >
                  {preset.icon}
                </div>
              )}
            </div>
            <p className="text-gray-500 text-[13px] mb-8 leading-relaxed flex-grow">
              {preset.description}
            </p>
            <div>
              <span
                className={`text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider ${preset.badgeColor}`}
              >
                {preset.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedPreset === "production" && (
        <div className="mt-8 bg-blue-900/10 border border-blue-500/20 rounded-lg p-4 flex items-center gap-3">
          <IoInformationCircleOutline
            className="text-blue-400 shrink-0"
            size={20}
          />
          <p className="text-blue-400/90 text-[13px]">
            Production preset selected. Steps 6-9 will be skipped. 1M tokens to
            newly created key.
          </p>
        </div>
      )}
    </div>
  );
};

export default ConfigDefaults;
