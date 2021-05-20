import { GetServerSidePropsContext } from "next";
import ProfileStyle from "../../../styles/profile.module.css";
import User from "../../../api/user";
import { requireAuthen } from "../../../api/require.authen";
import Bio from "../../../components/profile/bio";
import Menu from "../../../components/menu";
import Photo from "../../../components/profile/photo";
import Content from "../../../components/profile/content";
import { useState, useEffect } from "react";

const profile = ({ user, visitor }) => {
  const [postState, setPostState] = useState('post');
  const visitorStatus = user.id !== visitor.id;

  return (
    <>
      <div className={ProfileStyle.wrapper}>
        <div className={ProfileStyle.imageBackground}>
          <div className={ProfileStyle.username}> {user.username} </div>
        </div>

        <div className={ProfileStyle.content}>
          <Photo id={user.id} photo={user.photo} visitorStatus={visitorStatus} />

          <div className={ProfileStyle.follow}>
            <div className={ProfileStyle.follower}>{user.follower.length}<br />Followers</div>
            <div className={ProfileStyle.following}>{user.following.length}<br />Following</div>
          </div>

          <Bio id={user.id} bio={user.bio} visitorStatus={visitorStatus} />

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


            <Content userId={user.id} />

          </div>

        </div>

      </div>


      <Menu />
    </>
  )
}

export default profile

export const getServerSideProps = requireAuthen(async function (context: GetServerSidePropsContext, visitor) {
  // fetch user profile from server
  const id: string = context.params.uid.toString();
  const user = await User.getUser(context, id);

  return {
    props: {
      user,
      visitor
    }
  }
})