import { Outlet } from "react-router-dom"


const DashboardLayout = () => {
  return (
    <div>
        <div>dashboard nav</div>
        <Outlet />
        <div>dashboard footer</div>
    </div>
  )
}

export default DashboardLayout