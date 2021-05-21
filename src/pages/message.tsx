import { GetServerSideProps } from "next";
import Menu from "../components/menu";
import { useEffect, useState, useRef } from "react";
import { requireAuthen } from "../api/require.authen";
import Content from "../components/home/content";
import MessageStyle from "../styles/message.module.css";
import Swiper from "../components/message/swiper";

const message = ({ user }) => {


  

  return (
    <>
      <div className={MessageStyle.wrapper}>
        <h2 className={MessageStyle.title}>Messages</h2>

        <input className={MessageStyle.search} type="text" placeholder="Search"></input>

        <div className={MessageStyle.closeFri}>
          <div className={MessageStyle.closeFriText}>Close Friends</div>
          <Swiper userId={user.id}/>
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

