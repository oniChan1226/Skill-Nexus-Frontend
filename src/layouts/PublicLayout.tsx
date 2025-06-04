import { Outlet } from "react-router-dom"
import PublicHeader from "../components/ui/header/PublicHeader"
import PublicFooter from "../components/ui/footer/PublicFooter"


const Publiclayout = () => {
  return (
    <div>
        <PublicHeader />
        <Outlet />
        <PublicFooter />
    </div>
  )
}

export default Publiclayout