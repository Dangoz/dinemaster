import ProfileStyle from "../styles/profile.module.css";
import { requireAuthen } from "../api/require.authen";
import { GetServerSideProps } from "next";
import Menu from "../components/menu";
import api from "../config/axios";
import ContentLoader from "react-content-loader";
import { useState } from "react";

const profile = ({ user }) => {
  const [postState, setPostState] = useState('post');
  const [postData, setPostData] = useState([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ]);
  return (
    <>
      <div className={ProfileStyle.wrapper}>
        <div className={ProfileStyle.imageBackground}>
          <div className={ProfileStyle.username}> {user.username} </div>
        </div>

        <div className={ProfileStyle.content}>
          <img className={ProfileStyle.thumbnail} src="/thumbnail.png"></img>

          <div className={ProfileStyle.follow}>
            <div className={ProfileStyle.follower}>100<br />Followers</div>
            <div className={ProfileStyle.following}>50<br />Following</div>
          </div>

          <div className={ProfileStyle.bio}>Are you hungry? <br /> let's find a place to eat!</div>

          <div className={ProfileStyle.posts}>
            <div className={ProfileStyle.options}>
              <button className={postState !== 'post' && ProfileStyle.optionInactive}
                onClick={() => {
                  setPostState('post')
                }}>Posts</button>
              <button className={postState !== 'visit' && ProfileStyle.optionInactive}
                onClick={() => {
                  setPostState('visit')
                }}>Visits</button>
            </div>

            <div className={ProfileStyle.post}>

              {postData.map(data => {
                <div className={ProfileStyle.post_post}>
                  <ContentLoader>
                    < rect y="0" x="0" width="200" height="150" rx="30px" />
                  </ContentLoader>
                </div>
              })}


              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect y="0" x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect y="0" x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect y="0" x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>
              <div className={ProfileStyle.post_post}>
                <ContentLoader>
                  < rect x="0" width="200" height="150" rx="30px" />
                </ContentLoader>
              </div>

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