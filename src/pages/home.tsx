import { useEffect, useState } from "react";
import Menu from "../components/menu";
import { GetServerSideProps } from "next";
import Post from "../api/post";
import { requireAuthen } from "../api/require.authen";
import Swiper from "../components/home/swiper";
import Content from "../components/home/content";
import HomeStyle from "../styles/home/home.module.css";


const home = ({ user }) => {
  console.log(`suggesting for5 : ${user.id}`);
  return (
    <>
      <div>
        <img className={HomeStyle.logo} src="/logo_black_horizontal.svg"></img>

        <div className={HomeStyle.userRec}>
          <div className={HomeStyle.userRecText}>Recommended User</div>

          <Swiper userId={user.id}/>
        </div>
      </div>

      <Content userId={user.id}/>

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

export default home

