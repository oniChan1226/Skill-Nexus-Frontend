import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 dark:bg-dark-600 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex justify-center items-center flex-col min-h-[100vh]">
    <div className="min-h-[70vh] w-full max-w-7xl bg-no-repeat bg-center" style={{ backgroundImage: "url('/Images/404Error.svg')" }}>
    </div>
        <Link to={"/"}
        className="border-gray-300 text-black/80 dark:text-white border-2 px-3 py-2 rounded-md font-semibold hover:bg-gray-300/20 duration-200"
        >
        BACK TO HOME
        </Link>
    </section>
  )
}

export default NotFound