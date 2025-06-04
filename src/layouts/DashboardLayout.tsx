import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <div>dashboard nav</div>
      <main>
        <Outlet />
      </main>
      <div>dashboard footer</div>
    </div>
  );
};

export default DashboardLayout;
