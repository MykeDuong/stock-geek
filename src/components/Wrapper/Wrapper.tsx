import type { NextComponentType } from "next";
import type { ReactElement } from "react";
import { useSession } from "next-auth/react";

import SideBar from "../SideBar/SideBar";
import Error from '../Error/Error';
import { useError } from "../../store";

interface Props {
  children:  ReactElement | ReactElement[];
}


const Wrapper: NextComponentType<any, any, Props> = ({ children }) => {
  const {  data: sessionData } = useSession({
    required: true,
  });

  const { errorAppear, message, setDisappear } = useError();

  return (sessionData && 
    <div
      className="flex flex-row"
    >
      <SideBar />
      <div
        className={`${errorAppear ? "pointer-events-none blur-sm" : ""} bg-beige-400 ml-[22.5%] w-main-screen min-h-screen`}
      >
        {children}
      </div>
      {errorAppear && 
        <Error message={message} onClose={() => setDisappear()} />
      }
    </div>
  )
}

export default Wrapper;