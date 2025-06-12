import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppLoader from "./components/AppLoader";

function App() {

  return (
    <BrowserRouter>
      <AppLoader>
        <AppRoutes />
      </AppLoader>
    </BrowserRouter>
  );
}

export default App;
