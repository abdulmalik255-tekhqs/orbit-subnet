import React from "react";
import { Routes, Route } from "react-router-dom";
import WizardLayout from "../pages/SubnetWizard/WizardLayout.jsx";
import ValidatorOwner from "../pages/SubnetWizard/ValidatorOwner.jsx";
import ConfigDefaults from "../pages/SubnetWizard/ConfigDefaults.jsx";
import ChainID from "../pages/SubnetWizard/ChainID.jsx";
import BootstrapValidators from "../pages/SubnetWizard/BootstrapValidators.jsx";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<WizardLayout />}>
        <Route index element={<ValidatorOwner />} />
        <Route path="validator-owner" element={<ValidatorOwner />} />
        <Route path="config-defaults" element={<ConfigDefaults />} />
        <Route path="chain-id" element={<ChainID />} />
        <Route path="bootstrap-validators" element={<BootstrapValidators />} />
      </Route>
    </Routes>
  );
};

export default Index;
