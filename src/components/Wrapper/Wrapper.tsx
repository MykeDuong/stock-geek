import type { NextComponentType } from "next";
import type { ReactElement } from "react";
import { useSession } from "next-auth/react";

import SideBar from "../SideBar/SideBar";

interface Props {
  children:  ReactElement | ReactElement[];
}


const Wrapper: NextComponentType<any, any, Props> = ({ children }) => {
  const {  data: sessionData } = useSession({
    required: true,
  });

  return (sessionData && 
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