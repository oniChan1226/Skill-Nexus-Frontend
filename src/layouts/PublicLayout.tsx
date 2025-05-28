import { Outlet } from "react-router-dom"


const Publiclayout = () => {
  return (
    <div>
        <div>public nav</div>
        <Outlet />
        <div>public footer</div>
    </div>
  )
}

export default Publiclayout