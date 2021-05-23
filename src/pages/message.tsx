import Menu from "../components/menu";
import { useEffect, useState, useRef } from "react";
import { requireAuthen } from "../api/require.authen";
import MessageStyle from "../styles/message.module.css";
import Swiper from "../components/message/swiper";
import router from "next/router";
import Link from "next/link";

import socket from "../config/socket";

const message = ({ user }) => {

  useEffect(() => {
    socket.emit('connection');

  }, [])

  const openChat = async (event, userId) => {
    console.log('opened chat');
    if( user.id = '666ba4a2-d434-4dbb-9d01-8fda07305eb7')
      userId = '6632082d-a426-441f-a8bb-7d9949540c29';
    if ( user.id = '6632082d-a426-441f-a8bb-7d9949540c29')
      userId = '666ba4a2-d434-4dbb-9d01-8fda07305eb7';
    router.push(`/message/${userId}`)
  }

  return (
    <>
      <div className={MessageStyle.wrapper}>
        <h2 className={MessageStyle.title}>Messages</h2>

        <input className={MessageStyle.search} type="text" placeholder="Search"></input>

        <div className={MessageStyle.closeFri}>
          <div className={MessageStyle.closeFriText}>{}</div>
          <Swiper userId={user.id}/>
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

