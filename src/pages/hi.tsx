import React from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";

export default function index() {
  console.log("yo yo hello world");
  return (
  <div>
      < Header title="I'm index header"/>

      <style jsx>
        {`
          .firstPage {
            color: red;
          }
        `}
      </style>
      <Head>
        <title>First Page</title>
      </Head>
    First Page lalala <br/>
    <Link href="/hello">To HELLO</Link> <br/>
  </div>)};