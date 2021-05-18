import ProfileStyle from "../../styles/profile.module.css";
import { useState, useEffect } from "react";
import Post from "../../api/post";
import StackGrid, { transitions } from "react-stack-grid";
import Item from "../home/item";
const { fadeUp, scaleDown } = transitions;

const Content = ({ userId }) => {
  const [posts, setPosts] = useState(null);
  const [animation, setAnimation] = useState(0);

  useEffect(() => {
    Post.getPosts(userId)
      .then(data => setPosts(data))

  }, [])

  return (
    <>
      <StackGrid className={ProfileStyle.postContent}
        columnWidth={200}
        gutterWidth={60}
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
          <Item key={index} post={post}/>
        )) :
          []
        }
      </StackGrid>


    </>
  )
}

export default Content