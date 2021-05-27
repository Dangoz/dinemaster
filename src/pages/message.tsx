import Menu from "../components/menu";
import { useEffect, useState, useRef } from "react";
import { requireAuthen } from "../api/require.authen";
import MessageStyle from "../styles/message/message.module.css";
import Swiper from "../components/message/swiper";
import RecentChats from "../components/message/recentChats";
import router from "next/router";
import Link from "next/link";

const message = ({ user }) => {

  const openChat = async (event, userId) => {

  }

  return (
    <>
        <h2 className={MessageStyle.title}>Messages</h2>
        <div className={MessageStyle.swipper}><Swiper userId={user.id} userFollowing={user.following} /></div>
        <RecentChats userId={user.id} />
      <Menu />
    </>
  )
}

export const getServerSideProps = requireAuthen(async function (ctx, user) {

  return {
    props: {
      user
    }
  }
})

export default message

