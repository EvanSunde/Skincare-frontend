'use client'
import Navbar from "@/components/navbar/Navbar";
import HeroSection from "./HeroSection";
import WhoWeAre from "./WhoWeAre";
import Feedback from "./Feedback";
import Features from "./Features";
import Footer from "@/components/Footer";
import FAQ from "./FAQ";
import PremiumCareInfosAndImages from "./PremiumCareInfosAndImages";

const LandingPageContainer = () => {
  return (
    <main className="bg-[#f9fdff]  w-screen h-auto min-h-screen flex flex-col items-center overflow-x-hidden justify-center">
      <div className='w-full h-auto flex flex-col  justify-center items-center'>
        <Navbar item="Home"/>
        <HeroSection />
        <Features />
        <WhoWeAre />
        <PremiumCareInfosAndImages />
        <Feedback />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
};

export default LandingPageContainer;
