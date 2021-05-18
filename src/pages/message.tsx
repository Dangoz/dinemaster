import { GetServerSideProps } from "next";
import Menu from "../components/menu";
import { useEffect, useState, useRef } from "react";
import { requireAuthen } from "../api/require.authen";
import Content from "../components/home/content";

const message = ({ user }) => {


  

  return (
    <>
      <Content userId={user.id}/>
    
      <Menu />
    </>
  )
}

export const getServerSideProps = requireAuthen(async function(ctx, user) {

  return {
    props: {
      user
    }
  }
})

export default message

