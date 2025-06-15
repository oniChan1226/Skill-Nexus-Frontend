import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppLoader from "./components/AppLoader";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <BrowserRouter>
    <ToastContainer theme="light"/>
      <AppLoader>
        <AppRoutes />
      </AppLoader>
    </BrowserRouter>
  );
}

export default App;
