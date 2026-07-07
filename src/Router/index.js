import React from "react";
import { Routes, Route } from "react-router-dom";
import WizardLayout from "../pages/SubnetWizard/WizardLayout.jsx";
import ValidatorOwner from "../pages/SubnetWizard/ValidatorOwner.jsx";
import ConfigDefaults from "../pages/SubnetWizard/ConfigDefaults.jsx";
import ChainID from "../pages/SubnetWizard/ChainID.jsx";
import BootstrapValidators from "../pages/SubnetWizard/BootstrapValidators.jsx";
import CreateSubnetTx from "../pages/SubnetWizard/CreateSubnetTx.jsx";
import CreateChainTx from "../pages/SubnetWizard/CreateChainTx.jsx";
import ConvertL1 from "../pages/SubnetWizard/ConvertL1.jsx";
import DeployVMC from "../pages/SubnetWizard/DeployVMC.jsx";
import InitializeVMC from "../pages/SubnetWizard/InitializeVMC.jsx";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<WizardLayout />}>
        <Route index element={<ValidatorOwner />} />
        <Route path="validator-owner" element={<ValidatorOwner />} />
        <Route path="config-defaults" element={<ConfigDefaults />} />
        <Route path="chain-id" element={<ChainID />} />
        <Route path="bootstrap-validators" element={<BootstrapValidators />} />
        <Route path="create-subnet-tx" element={<CreateSubnetTx />} />
        <Route path="create-chain-tx" element={<CreateChainTx />} />
        <Route path="convert-l1" element={<ConvertL1 />} />
        <Route path="deploy-vmc" element={<DeployVMC />} />
        <Route path="initialize-vmc" element={<InitializeVMC />} />
      </Route>
    </Routes>
  );
};

export default Index;
