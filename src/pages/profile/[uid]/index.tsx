import { GetServerSidePropsContext } from "next";
import ProfileStyle from "../../../styles/profile.module.css";
import User from "../../../api/user";
import { requireAuthen } from "../../../api/require.authen";
import Bio from "../../../components/profile/bio";
import Menu from "../../../components/menu";
import Photo from "../../../components/profile/photo";
import Content from "../../../components/profile/content";
import { useState, useEffect } from "react";

const profile = ({ userId, visitor }) => {
  const [postState, setPostState] = useState('post');
  const [user, setUser] = useState(null)
  const [visitorStatus, setVisitorStatus] = useState(null);

  useEffect(() => {
    // fetch user profile from server
    User.getUser(userId)
      .then(user => {
        setUser(user);
        setVisitorStatus(user.id !== visitor.id);
      })
  }, [])

  // if(!user) {
  //   return (
  //     <div>
  //       HELLO LOADING
  //     </div>
  //   )
  // }

  return (
    <>
      <div className={ProfileStyle.wrapper}>
        <div className={ProfileStyle.imageBackground}>
        {user&&<div className={ProfileStyle.username}> {user.username} </div>}
        </div>

        <div className={ProfileStyle.content}>
        {user&&<Photo id={user.id} photo={user.photo} visitorStatus={visitorStatus} />}

          <div className={ProfileStyle.follow}>
          {user&&<div className={ProfileStyle.follower}>{user.follower.length}<br />Followers</div>}
            {user&&<div className={ProfileStyle.following}>{user.following.length}<br />Following</div>}
          </div>

          {user&&<Bio id={user.id} bio={user.bio} visitorStatus={visitorStatus} />}

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


            {user&& <Content userId={user.id} />}

          </div>

        </div>

      </div>


      <Menu />
    </>
  )
}

export default profile

export const getServerSideProps = requireAuthen(async function (context: GetServerSidePropsContext, visitor) {
  const userId: string = context.params.uid.toString();

  return {
    props: {
      userId,
      visitor
    }
  }
})