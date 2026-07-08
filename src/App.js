import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router/index";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
