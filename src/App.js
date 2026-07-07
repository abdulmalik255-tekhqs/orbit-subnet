import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/index";
import { ToastContainer } from "react-toastify";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";
import "react-toastify/dist/ReactToastify.css";
import { config } from "./wagmi.js";

const queryClient = new QueryClient();
const App = () => {
  return (
    <ApolloProvider client={client}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Router />
            <ToastContainer />
          </BrowserRouter>
        </QueryClientProvider>
      </WagmiProvider>
    </ApolloProvider>
  );
};

export default App;
