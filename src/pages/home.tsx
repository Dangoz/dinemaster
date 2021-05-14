import { useEffect, useState } from "react";
import Menu from "../components/menu";
import { GetServerSideProps } from "next";
import Post from "../api/post";
import { requireAuthen } from "../api/require.authen";
import Swiper from "../components/home/swiper";
import HomeStyle from "../styles/home/home.module.css";
import IPost from "../interface/post.interface"
import ContentLoader from "react-content-loader";

const home = ({ user }) => {
  const [posts, setposts] = useState(null);
  let load = [];
  for (let i = 0; i < 20; i++) {
    load.push(<div key={i} className={HomeStyle.post_post}>
      <ContentLoader>
        < rect y="0" x="0" width="200" height="150" rx="30px" />
      </ContentLoader>
    </div>);
  }

  useEffect(() => {
    Post.getPosts(user.id)
      .then(data => setposts(data))
  }, [])

  return (
    <>
      <div>
        <img className={HomeStyle.logo} src="/logo_black_horizontal.svg"></img>

        <div className={HomeStyle.userRec}>
          <div className={HomeStyle.userRecText}>Recommended User</div>
          <Swiper />
        </div>

        <div className={HomeStyle.post}>
          {posts ? posts.map((post, index) => (
           <img key={index} className={HomeStyle.post_post} src={post.source} />
          )) :
          load
          }
          {/* {posts ? <img className={HomeStyle.post_post} src={posts[0].source} />
            : <div className={HomeStyle.post_post}>
            <ContentLoader>
              < rect y="0" x="0" width="200" height="150" rx="30px" />
            </ContentLoader>
          </div>}
          {posts ? <img className={HomeStyle.post_post} src={posts[1].source} />
            : <div className={HomeStyle.post_post}>
            <ContentLoader>
              < rect y="0" x="0" width="200" height="150" rx="30px" />
            </ContentLoader>
          </div>} */}

        </div>

      </div>

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

