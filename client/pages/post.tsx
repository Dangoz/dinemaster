import PostStyle from "../styles/post.module.css"
import Menu from "../components/menu";
import { requireAuthen } from "../api/require.authen";
import { useState, useEffect } from "react";
import Post from "../api/post";

const post = ({ user }) => {
 

  const submitPost = async (event) => {
    const url = await Post.createImagePost(event, user);
  }
  return (
    <>

      <form onSubmit={submitPost}>
        <input type="textarea" name="message" placeholder="Caption"></input>
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
