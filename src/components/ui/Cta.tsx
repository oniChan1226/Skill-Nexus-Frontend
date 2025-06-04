import { Link } from "react-router-dom"
import Button from "../shared/Button"
import { IconArrowRight } from "@tabler/icons-react"

const Cta = () => {
  return (
          <section className="py-16 bg-gradient-to-r from-indigo-500 to-cyan-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Skill Journey?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners and teachers in our growing community. Your next skill is just a swap away.
          </p>
          <Link to="/signup">
            <Button variant="custom" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-2">
              <span className="flex items-center font-medium tracking-tight text-[1.05rem]">Get Started Today <IconArrowRight className="ml-2 h-5 w-5" /></span> 
            </Button>
          </Link>
        </div>
      </section>
  )
}

export default Cta