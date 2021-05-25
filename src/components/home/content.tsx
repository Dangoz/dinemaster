import HomeStyle from "../../styles/home/home.module.css";
import { useState, useEffect, useRef } from "react";
import Post from "../../api/post";
import StackGrid, { transitions } from "react-stack-grid";
import ImageItem from "../imageItem";
import { CircularProgress } from "@material-ui/core";

const Content = ({ userId }) => {
  const [isMobile, setIsMobile] = useState(null);
  const [animation, setAnimation] = useState(0.45);
  const gridRef = useRef(null);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [size, setSize] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // detect if device is mobile
    setIsMobile(require("../../config/isMobile")(navigator.userAgent));
    loadMorePosts();
  }, [])

  const loadMorePosts = () => {
    setIsLoading(true);

    Post.getPosts(userId, size, 10)
      .then(data => {

        console.log("posts",posts,"data",data);
        setPosts(posts => [...posts, ...data]);
        setSize(size + 1);
        setHasMore(data.length > 9);
        gridRef.current.updateLayout();
        setIsLoading(false);
      })

  }

  return (
    <>
      <StackGrid className={HomeStyle.content}
        gridRef={element => gridRef.current = element}
        columnWidth={isMobile ? 155 : 205}
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
        // duration={animation}
      >

        {posts ? posts.map((post, index) => (
          <ImageItem key={index} post={post} userId={userId} />
        )) :
          []
        }
      </StackGrid>

      <div className={HomeStyle.loadMore}>
        {!hasMore
          ? <button className={HomeStyle.theEndButton}>Reached the End</button>
          : isLoading
            ? <CircularProgress className={HomeStyle.loadMoreProgress} value={100} color="inherit" size={33} />
            : <button className={HomeStyle.loadMoreButton} onClick={loadMorePosts}>Load More</button>}
      </div>
    </>
  )
}

export default Content
