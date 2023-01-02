import { NextPage } from "next";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SideBar } from "../../components";
import Wrapper from "../../components/Wrapper/Wrapper";

const Home: NextPage = () => {
  return (
    <div>
      Home
    </div>
  )
}

export default Home;