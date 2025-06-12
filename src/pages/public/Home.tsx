import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { CommunitySpotlight, Cta, Features, Hero, HowItWorks } from "../../components/ui/home"
import { Navigate } from "react-router-dom";


const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main className="bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 dark:bg-dark-600 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <Hero />
      <Features />
      <HowItWorks />
      <CommunitySpotlight />
      <Cta />
    </main>
  )
}

export default Home