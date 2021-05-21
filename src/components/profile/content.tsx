import ProfileStyle from "../../styles/profile.module.css";

import { useState, useEffect } from "react";
import Post from "../../api/post";
import StackGrid, { transitions } from "react-stack-grid";
import ImageItem from "../imageItem";
const { fadeUp, scaleDown } = transitions;

const Content = ({ userId }) => {
  const [isMobile, setIsMobile] = useState(null);
  const [posts, setPosts] = useState(null);
  const [animation, setAnimation] = useState(0.1);

  useEffect(() => {
    Post.getUserPosts(userId)
      .then(data => setPosts(data))

    // detect if device is mobile
    setIsMobile(require("../../config/isMobile")(navigator.userAgent));
  }, [])

  return (
    <>
      <StackGrid className={ProfileStyle.postContent}
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
          <ImageItem key={index} post={post} userId={userId} />
        )) :
          []
        }
      </StackGrid>


    </>
  )
}

export default Content