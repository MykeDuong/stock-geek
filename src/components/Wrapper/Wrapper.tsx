import { NextComponentType } from "next";
import { ReactElement } from "react";
import SideBar from "../SideBar/SideBar";

interface Props {
  children:  ReactElement | ReactElement[];
}


const Wrapper: NextComponentType<any, any, Props> = ({ children }) => {
  return (
    <div
      className="flex flex-row"
    >
      <SideBar />
      <div
        className='bg-beige-400 w-main-screen min-h-screen'
      >
        {children}
      </div>
    </div>
  )
}

export default Wrapper;