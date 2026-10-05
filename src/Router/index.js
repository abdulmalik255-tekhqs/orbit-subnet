import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login.jsx";
import { isAuthenticated, setAuthenticated } from "../utils/auth";
import WizardLayout from "../pages/SubnetWizard/WizardLayout.jsx";
// import ValidatorOwner from "../pages/SubnetWizard/ValidatorOwner.jsx";
import ConfigDefaults from "../pages/SubnetWizard/ConfigDefaults.jsx";
import ChainID from "../pages/SubnetWizard/ChainID.jsx";
import BootstrapValidators from "../pages/SubnetWizard/BootstrapValidators.jsx";
import CreateSubnetTx from "../pages/SubnetWizard/CreateSubnetTx.jsx";
import CreateChainTx from "../pages/SubnetWizard/CreateChainTx.jsx";
import ConvertL1 from "../pages/SubnetWizard/ConvertL1.jsx";
import DeployVMC from "../pages/SubnetWizard/DeployVMC.jsx";
import InitializeVMC from "../pages/SubnetWizard/InitializeVMC.jsx";

const Index = () => {
  const [authenticated, setIsAuthenticated] = React.useState(isAuthenticated);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
    setIsAuthenticated(true);
  };

  // The wizard steps stay mounted only behind the password gate.
  if (!authenticated) {
    return <Login onSuccess={handleLoginSuccess} />;
  }

  return (
    <Routes>
      <Route path="/" element={<WizardLayout />}>
        <Route index element={<ConfigDefaults />} />
        {/* <Route path="validator-owner" element={<ValidatorOwner />} /> */}
        <Route path="config-defaults" element={<ConfigDefaults />} />
        <Route path="chain-id" element={<ChainID />} />
        <Route path="bootstrap-validators" element={<BootstrapValidators />} />
        <Route path="create-riff-tx" element={<CreateSubnetTx />} />
        <Route path="create-chain-tx" element={<CreateChainTx />} />
        <Route path="convert-riff" element={<ConvertL1 />} />
        <Route path="deploy-vmc" element={<DeployVMC />} />
        <Route path="initialize-vmc" element={<InitializeVMC />} />
      </Route>
    </Routes>
  );
};

export default Index;
