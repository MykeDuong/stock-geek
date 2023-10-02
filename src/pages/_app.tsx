'use client'

import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { usePathname } from 'next/navigation'
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import { AppWrap } from "../components";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}) => {
  const pathname = usePathname()

  return (
    <SessionProvider session={session}>
      {([`/auth`, `/`].includes(pathname || "")) ?
        <Component {...pageProps} /> :
        <AppWrap>
          <Component {...pageProps} />
        </AppWrap>
      }
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
