import { NextPage } from "next";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SideBar } from "../../components/SideBar";

const Home: NextPage = () => {
  const { data: sessionData }  = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!sessionData) {
      router.push('/auth');
    }
  }, []);

  return (
    <div
      className="flex flex-row"
    >
      <SideBar />
      Home
    </div>
  )
}

export default Home;