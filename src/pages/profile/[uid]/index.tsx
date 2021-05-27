import { GetServerSidePropsContext } from "next";
import ProfileStyle from "../../../styles/profile.module.css";
import User from "../../../api/user";
import { requireAuthen } from "../../../api/require.authen";
import Bio from "../../../components/profile/bio";
import Menu from "../../../components/menu";
import Photo from "../../../components/profile/photo";
import Content from "../../../components/profile/content";
import FollowUnfollow from "../../../components/shared/followUnfollow";
import { useState, useEffect } from "react";

const profile = ({ user, visitor }) => {
  const [followerCount, setFollowerCount] = useState(user.follower.length);
  const [postState, setPostState] = useState('post');
  const visitorStatus = user.id !== visitor.id;

  const changeCount = async (changeToggle: boolean) => {
    changeToggle ? setFollowerCount(followerCount + 1) : setFollowerCount(followerCount - 1); 
  }

  useEffect(() => { console.log(JSON.stringify(user, null, 2)) }, [])
  return (
    <>
      <div className={ProfileStyle.wrapper}>
        <div className={ProfileStyle.imageBackground}>
          <div className={ProfileStyle.username}> {user.username} </div>
        </div>

        <div className={ProfileStyle.content}>
          <Photo id={user.id} photo={user.photo} visitorStatus={visitorStatus} />

          {/* {<FollowUnfollow user={user} hostId={visitor.id} style={ProfileStyle}/>} */}

          <div className={ProfileStyle.follow}>
            {<FollowUnfollow user={user} hostId={visitor.id} style={ProfileStyle} changeCount={changeCount}/>}
            <div className={ProfileStyle.follower}>{followerCount}<br />Followers</div>
            <div className={ProfileStyle.following}>{user.following.length}<br />Following</div>
          </div>

          <Bio id={user.id} bio={user.bio} visitorStatus={visitorStatus} />

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


            <Content userId={user.id} hostId={visitor.id} postState={postState}/>

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