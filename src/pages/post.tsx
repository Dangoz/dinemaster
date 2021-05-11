import Menu from "../components/menu";
import api from "../config/axios";
import { requireAuthen } from "../api/require.authen";
import { useState, useEffect } from "react";
import Post from "../api/post";

const post = ({ user }) => {


  return (
    <>

      <form onSubmit={async (event) => {
        const url = await Post.createImagePost(event, user);
      }}>
        <input type="textarea" name="message"></input>
        <input type="file" accept="image/*" name="image"></input>
        <br/><button type="submit" value="Create">Create</button>
      </form>

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
export default post
