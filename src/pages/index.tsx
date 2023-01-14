import type { NextComponentType, NextPage } from "next";
import Image from 'next/image'
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import { AiOutlineStock } from "react-icons/ai";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useAuthType } from "../store";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { setAuthSignIn, setAuthSignUp } = useAuthType();
  const router = useRouter();

  const handleSignIn = () => {
    setAuthSignIn();
    router.push('/auth');
  }

  const handleSignUp = () => {
    setAuthSignUp();
    router.push('/auth');
  }

  return (
    <div
      className="min-h-screen bg-green-600 overflow-x-hidden"
    >
      <div
        className='w-screen max-w-screen h-screen bg-green-700'
      >
        <div
          className="relative max-w-screen w-screen min-h-[26rem] overflow-hidden"
        >
          <Image src="/assets/landing-page-image.png" alt="landing-page-image" fill style={{ objectFit: 'cover' }} />
          <div
            className="absolute left-16 top-10 z-10 flex flex-col gap-8"
          >
            <h1
              className="text-white text-[6rem] font-pacifico"
            >
              Stock Geek
            </h1>
            <h2
              className="text-white font-raleway text-3xl font-semibold uppercase"
            >
              Stock Market Simulator
            </h2>
          </div>
          <div
            className="absolute right-10 bottom-10 z-10"
          >
            {(!sessionData) ? 
              <div
                className="flex flex-row gap-10"
              >
                <button
                  className="bg-slate-400 text-white uppercase font-raleway text-xl w-40 py-3 rounded-md hover:scale-105"
                  onClick={handleSignUp}
                >
                  Sign up
                </button>
                <button
                  className="bg-green-700 text-white uppercase font-raleway text-xl w-40 py-3 rounded-md hover:scale-105"
                  onClick={handleSignIn}
                >
                  Log in
                </button>
              </div>
              :
              <TradeButton />
            }
          </div>
        </div>
        <div
          className="flex flex-row mt-16 mx-40 text-center items-center"
        >
          <div
            className="w-3/5 pr-32"
          >
            <h1
              className="text-6xl text-white font-pacifico mb-10"
            >
              Stock Geek
            </h1>
            <p
              className="font-raleway text-white text-2xl"
            >
              We provide you with a stock market simulator to practice trading with virtual money and sharpen your investing knowledge before risking your own money. 
            </p>
          </div>
          <div
            className="relative w-2/5 min-h-[26rem] overflow-hidden mr-10"
          >
            <Image src="/assets/trading-guy.png" alt="trading person" fill style={{ objectFit: 'contain', position: 'absolute',  }} />
          </div>
        </div>
      </div>

      <div
        className="w-screen min-h-screen pb-20"
      >
        <div
          className="relative w-full min-h-[32rem]"
        >
          <Image src="/assets/portfolio-mac.png" alt="portfolio-mac" fill style={{ objectFit: 'contain'}} />
        </div>

        <div
          className="mx-60 px-20 pt-6 pb-10 bg-beige-400 rounded-xl min-h-fit flex flex-row gap-28 shadow-landing-box"
        >
          <div
            className="flex flex-col items-center"
          >
            <AiOutlineStock color="#395144" style={{ height: '6rem', width: '6rem'}} />
            <h2
              className="text-3xl font-bold font-raleway text-green-700 text-center mb-6"
            >
              Practice stock trading with virtual money
            </h2>
            <p
              className="text-2xl font-raleway text-center"
            >
              Whether you are a beginner or an experienced investor testing more complex trading strategies in a safe environment, we can help you!
            </p>
          </div>
          <div
            className="flex flex-col items-center"
          >
            <RiMoneyDollarCircleLine color="#395144" style={{ height: '6rem', width: '6rem'}} />
            <h2
              className="text-3xl font-bold font-raleway text-green-700 text-center mb-6"
            >
              Navigate the market in a risk-free environment
            </h2>
            <p
              className="text-2xl font-raleway text-center"
            >
              Our investing tools are designed to help you make informed investing decisions and watch the results without risking your own money.
            </p>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col"
      >
        <ImageInfo
          side="left"
          header="My Portfolio"
          description="Manage your portfolio effectively with real-time performance tracking and key statistics."
          imgSrc="/assets/portfolio.png"
        />

        <ImageInfo
          side="right"
          header='Trade Simulator'
          description="Practice stock trading with virtual money and sharpen your knowledge with technical and fundamental analysis."
          imgSrc="/assets/simulator.png"
        />

        <ImageInfo
          side="left"
          header='Stock Recommendation'
          description="Diversify your portfolio with recommended stocks featuring real-time statistics to help inform your decision."
          imgSrc="/assets/recommendation.png"
        />

        <ImageInfo
          side="right"
          header='Stock Screener'
          description="Decide which stocks worth your attention in thousands available in market exchange. "
          imgSrc="/assets/screener.png"
        />
      </div>
      <div
        className="w-screen text-center py-6 bg-green-700"      
      >
        <p
          className="font-raleway text-lg text-white"
        >
          Copyright @ Vy Vo &hearts; Minh Duong
        </p>
        <p
          className="font-raleway text-lg text-white"
        >
          All rights reserved.
        </p>
      </div>

    </div>
  );
};

const TradeButton: NextComponentType = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (!sessionData) {
      router.push('/auth')
    } else {
      router.push('/home')
    }
  }

  return (
    <button
      className="bg-beige-600 w-44 py-4 rounded-lg text-white font-raleway text-lg uppercase hover:scale-105"
      onClick={handleClick}
    >
      Start Trading
    </button>
  )
}

interface ImageInfoInterface {
  side: "left" | "right";
  header: string;
  description: string;
  imgSrc: string;
}

const ImageInfo: NextComponentType<any, any, ImageInfoInterface>= ({ side, header, description, imgSrc}) => {
  
  if (side === "left")
    return (
      <div
        className="flex flex-row items-center px-32 py-20 bg-green-700"
      >
        <div
        className="relative w-1/2 min-h-[32rem]"
      >
        <Image src={imgSrc} alt="portfolio" fill style={{ objectFit: "contain" }} />
        </div>  
        <div
        className="w-1/2 flex flex-col gap-4 pl-20"
      >
        <h2
          className="font-raleway text-4xl text-white font-bold"
        >
          {header}
        </h2>
        <p
          className="font-raleway text-2xl text-white mb-6"
        >
          {description}
        </p>
        <TradeButton />
        </div>
      </div>
    )

  if (side === "right")
    return (
      <div
        className="flex flex-row items-center px-32 py-20"
      >
        <div
          className="w-1/2 flex flex-col gap-4 pr-20"
        >
          <h2
            className="font-raleway text-4xl text-white font-bold"
          >
            {header}
          </h2>
          <p
            className="font-raleway text-2xl text-white mb-6"
          >
            {description}
          </p>
          <TradeButton />
        </div>
        <div
          className="relative w-1/2 min-h-[32rem]"
        >
          <Image src={imgSrc} alt="portfolio" fill style={{ objectFit: "contain" }} />
        </div>
      </div>
    )

  return <></>
}

export default Home;