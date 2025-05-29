import CommunitySpotlight from "../../components/ui/CommunitySpotlight"
import Cta from "../../components/ui/Cta"
import Features from "../../components/ui/Features"
import Hero from "../../components/ui/Hero"
import HowItWorks from "../../components/ui/HowItWorks"

const Home = () => {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <CommunitySpotlight />
      <Cta />
    </main>
  )
}

export default Home