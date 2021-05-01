import React, { Component } from "react";
import Head from "next/head";
import { useRouter } from "next/router"

import Header from "../components/header";
import Task from "../components/task";

export default function index() {
  console.log("THIS IS b");
  const router = useRouter().query;
  const id = router.id;
  console.log(id);


  return (
  <div>

      <Header/>
      <style jsx>
        {`
          .firstPage {
            color: red;
          }
        `}
      </style>
      <Head>
        <title>BBBBBBBBBBB id</title>
      </Head> <br/>
    VBBBBBBBBBBBBBB : lalala {id} dadada<br/>

    < Task />

  </div>)};

index.getInitialProps = async () => {
  return {};
};
