import ProfileStyle from "../styles/profile.module.css";
import { requireAuthen } from "../api/require.authen";
import Bio from "../components/profile/bio";
import Menu from "../components/menu";
import Photo from "../components/profile/photo";
import Content from "../components/profile/content";
import { useState, useEffect } from "react";
import { VisibilityOffRounded } from "@material-ui/icons";

const profile = ({ user }) => {
  const [postState, setPostState] = useState('post');

  return (
    <>
      <div className={ProfileStyle.wrapper}>
        <div className={ProfileStyle.imageBackground}>
          <div className={ProfileStyle.username}> {user.username} </div>
        </div>

        <div className={ProfileStyle.content}>
          <Photo id={user.id} photo={user.photo} />

          <div className={ProfileStyle.follow}>
            <div className={ProfileStyle.follower}>{user.follower.length}<br />Followers</div>
            <div className={ProfileStyle.following}>{user.following.length}<br />Following</div>
          </div>

          <Bio id={user.id} bio={user.bio} />

          <div className={ProfileStyle.posts}>
            <div className={ProfileStyle.options}>
              <button className={postState !== 'post' ? ProfileStyle.optionInactive : undefined}
                onClick={() => {
                  setPostState('post')
                }}>Posts</button>
              <button className={postState !== 'like' ? ProfileStyle.optionInactive : undefined}
                onClick={() => {
                  setPostState('like')
                }}>Likes</button>
            </div>


            <Content userId={user.id} hostId={user.id}postState={postState}/>

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