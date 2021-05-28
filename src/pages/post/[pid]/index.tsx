import Menu from "../../../components/menu";
import { useState, useEffect } from "react";
import IPost from "../../../interface/post.interface";
import { GetServerSidePropsContext } from "next";
import { requireAuthen } from "../../../api/require.authen";
import Content from "../../../components/search/content";
import Post from "../../../api/post";
import DPostStyle from "../../../styles/post/dpost.module.css";
import { CircularProgress } from "@material-ui/core";

const DPost = ({ post, visitor }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    console.log("first rendering!");
    generateContent(post.tags);

  }, [])

  useEffect(() => {
    console.log("first rendering!");
    generateContent(post.tags);
  }, [post])

  const generateContent = async (tags: string[]) => {
    setIsLoading(true);
    const posts = await Post.getPostsByTags(tags, post.id);
    console.log(JSON.stringify(posts, null, 2));
    setPosts(posts);
    setIsLoading(false);
  }
  return (
    <>
      {/* <div className={DPostStyle.wrapper}> */}

        <img className={DPostStyle.postSource} src={post.source}/>
      {/* </div> */}

      {/* {isLoading
        ? <div className={DPostStyle.CircularProgressContainer}>
          <CircularProgress className={DPostStyle.CircularProgress} value={100} color="inherit" size={50} />
        </div>
        : <Content userId={visitor.id} posts={posts} />} */}

      <Menu />
    </>
  )
}

export default DPost;

export const getServerSideProps = requireAuthen(async function (context: GetServerSidePropsContext, visitor) {
  // fetch user profile from server
  const pid: string = context.params.pid.toString();
  const post: IPost = await Post.getPostById(context, pid);
  console.log("serverside prop~~")

  return {
    props: {
      post,
      visitor
    }
  }
})