import ProfileStyle from "../styles/profile.module.css";
import { requireAuthen } from "../api/require.authen";
import Bio from "../components/profile/bio";
import Menu from "../components/menu";
import Photo from "../components/profile/photo"
import Post from "../api/post";
import ContentLoader from "react-content-loader";
import { useState, useEffect } from "react";

const profile = ({ user }) => {
  const [postState, setPostState] = useState('post');
  const [posts, setposts] = useState(null);
  let load = [];
  for (let i = 0; i < 20; i++) {
    load.push(<div key={i} className={ProfileStyle.post_post}>
      <ContentLoader>
        < rect y="0" x="0" width="200" height="150" rx="30px" />
      </ContentLoader>
    </div>);
  }

  useEffect(() => {
    Post.getUserPosts(user.id)
      .then(data => setposts(data))
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
            <div className={ProfileStyle.follower}>100<br />Followers</div>
            <div className={ProfileStyle.following}>50<br />Following</div>
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


            <div className={ProfileStyle.post}>
              {posts ? posts.map((post, index) => (
                <img key={index} className={ProfileStyle.post_post} src={post.source} />
              )) :
                load
              }
            </div>

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