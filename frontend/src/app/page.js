"use client";
import Head from "next/head";
import { useEffect } from "react";
import SignIn from "./auth/sign-in/page";
import TaskListing from "./task-listing/page";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function Home() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;700&display=swap"
        />
      </Head>
      <Provider store={store}>
      {typeof window !== "undefined" && localStorage.getItem("token") ? <TaskListing /> : <SignIn />}
      </Provider>
    </>
  );
}
