import Menu from "../components/menu";
import { useEffect, useState, useRef } from "react";
import { requireAuthen } from "../api/require.authen";
import MessageStyle from "../styles/message/message.module.css";
import Swiper from "../components/message/swiper";
import router from "next/router";
import Link from "next/link";

import socket from "../config/socket";

const message = ({ user }) => {

  // useEffect(() => {

  // }, [])

  const openChat = async (event, userId) => {
    console.log('opened chat');

    // router.push(`/message/${userId}`)
  }

  return (
    <>
      <div className={MessageStyle.wrapper}>
        <h2 className={MessageStyle.title}>Messages</h2>



        <div className={MessageStyle.closeFri}>
          <div className={MessageStyle.closeFriText}>{}</div>
          <Swiper userId={user.id} userFollowing={user.following}/>
        </div>

        <div className={MessageStyle.item} onClick={e => {openChat(e, '123')}}>
          
          <img className={MessageStyle.itemImg}/>
          <div className={MessageStyle.itemName}>{}</div>
          {/* <div className={MessageStyle.itemTime}>{new Date().toString()}</div> */} 
        </div>

        <div className={MessageStyle.item}>
          <div className={MessageStyle.itemImg}>img</div>
          <div className={MessageStyle.itemName}>Name</div>
          <div className={MessageStyle.itemTime}>Time</div>
        </div>
        <div className={MessageStyle.item}>
          <div className={MessageStyle.itemImg}>img</div>
          <div className={MessageStyle.itemName}>Name</div>
          <div className={MessageStyle.itemTime}>Time</div>
        </div>
      </div>
    
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

