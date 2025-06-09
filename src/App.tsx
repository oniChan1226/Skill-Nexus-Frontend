import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import AppLoader from "./components/AppLoader";

function App() {
  // use slice for it?
  const theme = localStorage.getItem("theme") || "light";

  return (
    <BrowserRouter>
      <AppLoader>
        <ToastContainer theme={theme ? "dark" : "light"} />
        <AppRoutes />
      </AppLoader>
    </BrowserRouter>
  );
}

export default App;
