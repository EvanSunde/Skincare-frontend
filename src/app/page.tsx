'use client'
import Navbar from "@/components/Navbar";
import HeroSection from "./landing/HeroSection";
import WhoWeAre from "./landing/WhoWeAre";
import WhatWeBelieve from "./landing/WhatWeBelieve";
import Feedback from "./landing/Feedback";
import Services from "./landing/Services";
import Footer from "@/components/Footer";
import { useUserStore } from "@/stores/userStore";
import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useLoadingStore } from "@/stores/LoadingStore";
import Loader from "@/components/Loader";
import { useAuthorizedStore } from "@/stores/AuthorizedStore";
import FAQ from "./landing/FAQ";

const GET_USER_INFO = gql`
  query GetUserInfoByToken {
    getUserInfoByToken {
    status
    message
    user {
      email
      phoneNumber
      photo
      country
      city
      name
      age
      gender
    }
  }
    }`

const Home = () => {
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const isLoading = useLoadingStore((state) => state.isLoading);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const isAuthorized = useAuthorizedStore((state) => state.isAuthorized);
  const setIsAuthorized = useAuthorizedStore((state) => state.setIsAuthorized);

  const [getUserInfoByToken] = useLazyQuery(GET_USER_INFO, {
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    const getUserInfo = async () => {
      if (!isAuthorized) {
        const response = await getUserInfoByToken();
        console.log(response, "from useeffect from landing")
        const { status, message, user } = response.data.getUserInfoByToken;
        if (user) {
          setIsAuthorized(true);
          setUserInfo({ email: user.email || '', name: user.name || '', photo: user.photo || '', gender: user.gender || '', age: user.age || 0, city: user.city || '', country: user.country || '', phoneNumber: user.phoneNumber || '' })
        }
      }
    }
    getUserInfo()
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="bg-white  w-full h-screen">
      {isLoading ? <Loader />
        :
        <div className='w-full h-auto flex flex-col  justify-center items-center  '>
          <Navbar />
          <HeroSection />
          <Services />
          <WhoWeAre />
          <WhatWeBelieve />
          <Feedback />
          <FAQ />
          <Footer />
        </div>
      }

    </main>
  );
};

export default Home;
