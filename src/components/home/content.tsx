import HomeStyle from "../../styles/home/home.module.css";
import { useState, useEffect, useRef } from "react";
import Post from "../../api/post";
import StackGrid, { transitions } from "react-stack-grid";
import ImageItem from "../imageItem";

const Content = ({ userId }) => {
  const [isMobile, setIsMobile] = useState(null);
  const [posts, setPosts] = useState(null);
  const [animation, setAnimation] = useState(0);

  useEffect(() => {
    Post.getPosts(userId)
      .then(data => setPosts(data))

    // detect if device is mobile
    setIsMobile(require("../../config/isMobile")(navigator.userAgent));
  }, [])

  return (
    <>
      <StackGrid className={HomeStyle.content}
        columnWidth={isMobile ? 155: 205}
        gutterWidth={25}
        gutterHeight={13}
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
