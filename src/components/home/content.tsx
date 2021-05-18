import HomeStyle from "../../styles/home/home.module.css";
import { useState, useEffect, useRef } from "react";
import Post from "../../api/post";
import StackGrid, { transitions } from "react-stack-grid";
import Item from "./item";

const Content = ({ userId }) => {
  const [posts, setPosts] = useState(null);
  const [animation, setAnimation] = useState(0);

  useEffect(() => {
    Post.getPosts(userId)
      .then(data => setPosts(data))

  }, [])

  return (
    <>
      <StackGrid className={HomeStyle.content}
        columnWidth={225}
        gutterWidth={15}
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
          <Item key={index} post={post}/>
        )) :
          []
        }
      </StackGrid>


    </>
  )
}

export default Content
