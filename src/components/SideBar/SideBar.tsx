import { NextComponentType } from "next";
import { useSession } from "next-auth/react";
import { trpc } from '../../utils/trpc';
import { AiOutlineHistory, AiOutlineHome } from 'react-icons/ai';
import { BiMessageDetail, BiUserCircle } from 'react-icons/bi';
import { HiDocumentSearch, HiOutlinePresentationChartLine } from 'react-icons/hi';
import { RiStockLine } from 'react-icons/ri';
import { TbNotebook } from 'react-icons/tb'
import { useCurrentDir } from "../../store";
import { MouseEvent } from "react";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";


const buttonIconStyle = {
  height: "30px",
  width: "30px",
}

const avatarIconStyle = {
  height: "4rem",
  width: "4rem",
  color: 'white',
}

const buttonStyle = 'text-white text-left text-2xl h-16 pl-4 rounded-md flex flex-row items-center gap-6 hover:bg-green-600'

const chosenButtonStyle = 'bg-beige-600 hover:bg-beige-600'

const SideBar: NextComponentType = () => {

  const dirStore = useCurrentDir();
  const router = useRouter();

  const { data: userData, isSuccess } = trpc.user.getUserInfo.useQuery();

  console.log(userData);

  const handleNavButtonClicked = (e: MouseEvent<HTMLButtonElement>) => {
    const newDir = (e.target as HTMLButtonElement).id;
    dirStore.changeDir(newDir);
    router.push(newDir);
  }

  return (
    <div
      className="bg-green-700 w-sidebar h-screen sticky flex flex-col"
    >
      <div
        className="w-100 mt-12 mb-14 mx-12 flex"
      >
        <h1
          className="text-white font-pacifico text-6xl"
        >
          Stock Geek
        </h1>
      </div>
      <div
        className="ml-12 flex flex-row h-16 gap-2 items-center mb-10"
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
              Current account: ${(new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(parseInt(userData.cash)))}
            </h3>
          </div> :
          <div>
            <ClipLoader 
              color="#FFFFFF"
            />
          </div>
        }
      </div>
      <div
        className='flex flex-col mx-8 pt-4'
      >
        <h3
          className='text-slate-400 text-2xl ml-4 mb-2 uppercase'
        >
          My Portal
        </h3>
        <button
          id='home'
          className={`${buttonStyle} ${dirStore.currentDir === "home" && chosenButtonStyle}`}
          onClick={handleNavButtonClicked}
        >
          <AiOutlineHome style={buttonIconStyle} />
          Home
        </button>
        <button
          id="portfolio"
          className={`${buttonStyle} ${dirStore.currentDir === "portfolio" && chosenButtonStyle}`}
          onClick={handleNavButtonClicked}
        >
          <HiOutlinePresentationChartLine style={buttonIconStyle} />
          My Portfolio
        </button>
        <button
          id="history"
          className={`${buttonStyle} ${dirStore.currentDir === "history" && chosenButtonStyle}`}
          onClick={handleNavButtonClicked}
        >
          <AiOutlineHistory style={buttonIconStyle} />
          Trade History
        </button>
        <button
          id="watchlist"
          className={`${buttonStyle} ${dirStore.currentDir === "watchlist" && chosenButtonStyle}`}
          onClick={handleNavButtonClicked}
        >
          <TbNotebook style={buttonIconStyle} />
          Watchlist
        </button>
        <h3
          className='text-slate-400 text-2xl ml-4 mt-6 mb-2 uppercase'
        >
          Discover
        </h3>
        <button
          id="screener"
          className={`${buttonStyle} ${dirStore.currentDir === "screener" && chosenButtonStyle}`}
          onClick={handleNavButtonClicked}
        >
          <HiDocumentSearch style={buttonIconStyle} />
          Screener
        </button>
        <button
          id="simulator"
          className={`${buttonStyle} ${dirStore.currentDir === "simulator" && chosenButtonStyle}`}
          onClick={handleNavButtonClicked}
        >
          <RiStockLine style={buttonIconStyle} />
          Trade Simulator
        </button>
        <button
          id="recommendation"
          className={`${buttonStyle} ${dirStore.currentDir === "recommendation" && chosenButtonStyle}`}
          onClick={handleNavButtonClicked}
        >
          <BiMessageDetail style={buttonIconStyle} />
          Recommendations
        </button>
      </div>
    </div>
  )
}

export default SideBar;