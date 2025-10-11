import { Metadata } from "next";
import Image from "next/image";
import HomeButtonBar from "./HomeButtonbar";
import logo from "@/assets/images/logo.jpeg";
import wavingHand from "@/assets/images/waving-hand.png";

export const metadata: Metadata = {
  title: "Home | Shahram Roohani",
};

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="w-full flex justify-center sm:justify-start items-center">
          <Image
            src={logo}
            width={150}
            height={150}
            alt="Logo"
            className="w-[75px] sm:w-[150px] h-auto rounded-full"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <span className="text-2xl sm:text-3xl mb-2">
            Hi&nbsp;
            <Image
              src={wavingHand}
              height={32}
              width={32}
              alt="Waving hand"
              className="inline-block"
            />
          </span>
          <span className="text-2xl sm:text-3xl">My name is Shahram</span>
        </div>
      </div>
      <hr className="w-[75%] mt-4" />
      <p className="my-6 sm:my-32 sm:text-2xl text-center">
        I&apos;m a seasoned C and C++ developer with 24+ years of experience who
        also passionately explores the world of web technologies.
      </p>
      <HomeButtonBar />
    </>
  );
};

export default Home;
