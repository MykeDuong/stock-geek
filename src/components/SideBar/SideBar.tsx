import type { NextComponentType } from "next";
import type { MouseEvent } from "react";
import { useRouter } from "next/router";
import { signOut } from 'next-auth/react'
import { AiOutlineHistory, AiOutlineHome, AiOutlineInfoCircle, AiOutlineLogout } from 'react-icons/ai';
import { BiMessageDetail, BiUserCircle } from 'react-icons/bi';
import { HiDocumentSearch, HiOutlinePresentationChartLine } from 'react-icons/hi';
import { RiStockLine } from 'react-icons/ri';
import { TbNotebook } from 'react-icons/tb'
import { ClipLoader } from "react-spinners";

import { trpc } from '../../utils/trpc';

const buttonIconStyle = {
  height: "30px",
  width: "30px",
}

const avatarIconStyle = {
  height: "4rem",
  width: "4rem",
  color: 'white',
}

const buttonStyle = `
  text-white text-left rounded-md flex flex-row items-center hover:bg-green-600
  text-lg h-10 gap-3 pl-3 
  2xl:gap-6 2xl:pl-4 2xl:h-14 2xl:text-2xl
`

const categoryStyle = `
  text-slate-400 uppercase
  text-lg ml-3 
  2xl:text-2xl 2xl:ml-4
`

const chosenButtonStyle = 'bg-beige-600 hover:bg-beige-600'

const SideBar: NextComponentType = () => {
  const router = useRouter();

  const { data: userData, isSuccess } = trpc.user.getUserInfo.useQuery();

  const handleNavButtonClicked = (e: MouseEvent<HTMLButtonElement>) => {
    const newDir = (e.target as HTMLButtonElement).id;
    router.push("/" + newDir);
  }

  return (
    <div  
      className="bg-green-700 w-sidebar h-screen fixed flex flex-col overflow-scroll"
    >
      {/* Logo */}
      <div
        className="w-100 my-10 mx-8 flex"
      >
        <h1
          className={`
            text-white font-pacifico text-3xl lg:text-4xl 2xl:text-5xl
          `}
        >
          Stock Geek
        </h1>
      </div>
      
      {/* User Info */}
      <div
        className="ml-8 flex flex-row h-16 gap-2 items-center mb-10"
      >
        <BiUserCircle style={avatarIconStyle} />
        {isSuccess ? 
          <div
            className="flex flex-col"
          >
            <h2
              className="text-white text-3xl"
            >
              {userData.username}
            </h2>
            <h3
              className="text-slate-400 text-lg"
            >
              Current cash: ${(new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(parseInt(userData.cash)))}
            </h3>
          </div> :
          <div>
            <ClipLoader 
              color="#FFFFFF"
            />
          </div>
        }
      </div>

      {/* Pages */}
      <div
        className='flex flex-col mx-4'
      >
        <h3
          className={`${categoryStyle}`}
        >
          My Portal
        </h3>
        <button
          id='home'
          className={`${buttonStyle} ${router.route.startsWith("/home") && chosenButtonStyle}`}
          onClick={handleNavButtonClicked}
        >
          <AiOutlineHome style={buttonIconStyle} />
          Home
        </button>
        <button
          id="portfolio"
          className={`${buttonStyle} ${router.route.startsWith("/portfolio") && chosenButtonStyle}`}
          onClick={handleNavButtonClicked}
        >
          <HiOutlinePresentationChartLine style={buttonIconStyle} />
          My Portfolio
        </button>
        <button
          id="history"
          className={`${buttonStyle} ${router.route.startsWith("/history") && chosenButtonStyle}`}
          onClick={handleNavButtonClicked}
        >
          <AiOutlineHistory style={buttonIconStyle} />
          Trade History
        </button>
        <button
          id="watchlist"
          className={`${buttonStyle} ${router.route.startsWith("/watchlist") && chosenButtonStyle}`}
          onClick={handleNavButtonClicked}
        >
          <TbNotebook style={buttonIconStyle} />
          Watchlist
        </button>
        <h3
          className={`${categoryStyle} mt-2`}
        >
          Discover
        </h3>
        <button
          id="screener"
          className={`${buttonStyle} ${router.route.startsWith("/screener") && chosenButtonStyle}`}
          onClick={handleNavButtonClicked}
        >
          <HiDocumentSearch style={buttonIconStyle} />
          Screener
        </button>
        <button
          id="simulator"
          className={`${buttonStyle} ${router.route.startsWith("/simulator") && chosenButtonStyle}`}
          onClick={handleNavButtonClicked}
        >
          <RiStockLine style={buttonIconStyle} />
          Trade Simulator
        </button>
        <button
          id="recommendation"
          className={`${buttonStyle} ${router.route.startsWith("/recommendation") && chosenButtonStyle}`}
          onClick={handleNavButtonClicked}
        >
          <BiMessageDetail style={buttonIconStyle} />
          Recommendations
        </button>
        <h3
          className={`${categoryStyle} mt-2`}
        >
          others
        </h3>
        <button
          id=""
          className={`${buttonStyle}`}
          onClick={handleNavButtonClicked}
        >
          <AiOutlineInfoCircle style={buttonIconStyle} />
          About us
        </button>
        <button
          className={`${buttonStyle} hover:bg-red-700`}
          onClick={() => signOut()}
        >
          <AiOutlineLogout style={buttonIconStyle} />
          Log out
        </button>
      </div>
    </div>
  )
}

export default SideBar;