import ProfileStyle from "../../styles/profile.module.css";
import { useState, useEffect } from "react";
import Post from "../../api/post";
import StackGrid, { transitions } from "react-stack-grid";
import ImageItem from "../imageItem";
import { CircularProgress } from "@material-ui/core";

const Content = ({ userId, hostId, postState }) => {
  const [isMobile, setIsMobile] = useState(null);
  const [animation, setAnimation] = useState(0.1);
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    // detect if device is mobile
    setIsMobile(require("../../config/isMobile")(navigator.userAgent));
  }, [])

  useEffect(() => {
    if (postState === 'like') return getUserLikes();
    getUserPosts();

  }, [postState])

  const getUserPosts = () => {
    setIsLoading(true);
    Post.getUserPosts(userId, hostId)
      .then(posts => {
        console.log(JSON.stringify(posts, null, 2))
        setPosts(posts);
        setIsLoading(false);
      })
  }
  const getUserLikes = () => {
    setIsLoading(true);
    Post.getUserLikes(userId, hostId)
      .then(posts => {
        console.log(JSON.stringify(posts, null, 2))
        setPosts(posts);
        setIsLoading(false); 
      })
  }

  return (
    <>
      { isLoading
        ? <div className={ProfileStyle.circularProgressContent}><CircularProgress className={ProfileStyle.circularProgress} value={100} color="inherit" size={35}/></div>
        : <StackGrid className={ProfileStyle.postContent}
          columnWidth={isMobile ? 150 : 200}
          gutterWidth={isMobile ? 20 : 60}
          gutterHeight={20}
          component="div"
          itemComponent="div"
          vendorPrefix={true}
          monitorImagesLoaded={true}
          // appear={fadeUp.leaved}
          // appear={scaleDown.appear}
          // appeared={scaleDown.appeared}
          // enter={scaleDown.enter}
          // entered={scaleDown.entered}
          // leaved={scaleDown.leaved}
          duration={animation}
        >

          {posts ? posts.map((post, index) => (
            <ImageItem key={index} post={post} userId={userId === hostId ? userId : hostId} />
          )) :
            []
          }
        </StackGrid>}
    </>
  )
}

export default Content