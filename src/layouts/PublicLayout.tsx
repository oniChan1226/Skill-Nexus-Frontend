import { Outlet } from "react-router-dom"
import PublicHeader from "../components/ui/header/PublicHeader"
import PublicFooter from "../components/ui/footer/PublicFooter"


const Publiclayout = () => {
  return (
    <div className="selection:bg-indigo-200 dark:selection:bg-indigo-500">
        <PublicHeader />
        <Outlet />
        <PublicFooter />
    </div>
  )
}

export default Publiclayout