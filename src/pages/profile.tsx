import ProfileStyle from "../styles/profile.module.css";
import { requireAuthen } from "../api/require.authen";
import Bio from "../components/profile/bio";
import Menu from "../components/menu";
import Photo from "../components/profile/photo";
import Content from "../components/profile/content";
import Post from "../api/post";
import ContentLoader from "react-content-loader";
import { useState, useEffect } from "react";

import IUser from "../interface/user.interface"

const profile = ({ user }) => {
  const [postState, setPostState] = useState('post');
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    Post.getUserPosts(user.id)
      .then(data => setPosts(data))
  }, [])


  return (
    <>
      <div className={ProfileStyle.wrapper}>
        <div className={ProfileStyle.imageBackground}>
          <div className={ProfileStyle.username}> {user.username} </div>
        </div>

        <div className={ProfileStyle.content}>
          <Photo id={user.id} photo={user.photo} />

          <div className={ProfileStyle.follow}>
            <div className={ProfileStyle.follower}>{}<br />Followers</div>
            <div className={ProfileStyle.following}>{}<br />Following</div>
          </div>

          <Bio id={user.id} bio={user.bio} />

          <div className={ProfileStyle.posts}>
            <div className={ProfileStyle.options}>
              <button className={postState !== 'post' ? ProfileStyle.optionInactive : undefined}
                onClick={() => {
                  setPostState('post')
                }}>Posts</button>
              <button className={postState !== 'visit' ? ProfileStyle.optionInactive : undefined}
                onClick={() => {
                  setPostState('visit')
                }}>Visits</button>
            </div>


            <Content userId={user.id}/>

          </div>

        </div>

      </div>


      <Menu />
    </>
  )
}

export default profile

export const getServerSideProps = requireAuthen(async function (ctx, user) {

  return {
    props: {
      user
    }
  }
})