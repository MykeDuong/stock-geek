import { NextComponentType } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import SideBar from "../SideBar/SideBar";

interface Props {
  children:  ReactElement | ReactElement[];
}


const Wrapper: NextComponentType<any, any, Props> = ({ children }) => {
  const router = useRouter()
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (!sessionData) {
      router.push('/auth')
    }
  }, [sessionData]);

  return (
    <div
      className="flex flex-row"
    >
      <SideBar />
      <div
        className='bg-beige-400 ml-[22.5%] w-main-screen min-h-screen'
      >
        {children}
      </div>
    </div>
  )
}

export default Wrapper;