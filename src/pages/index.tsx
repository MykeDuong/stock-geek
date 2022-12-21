import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (sessionData) {
      router.push('/home');
    } else {
      router.push("/auth");
    }
  }, []);

  return (
    <div></div>
  );
};

export default Home;
