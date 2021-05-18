import HomeStyle from "../../styles/home/home.module.css";
import ContentLoader from "react-content-loader";
import { useState, useEffect } from "react";
import Post from "../../api/post";
import StackGrid from "react-stack-grid";
import Item from "./item";
import { ContentTypeProfileList } from "aws-sdk/clients/cloudfront";

const Content = ({ userId }) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    Post.getPosts(userId)
      .then(data => setPosts(data))
  }, [])

  return (
    <>
      <StackGrid className={HomeStyle.content}
      columnWidth={200}
      gutterWidth={20}
      // appearDeplay={0}
      >

        {posts ? posts.map((post, index) => (
          <Item key={index} post={post} />
        )) :
          []
        }
      </StackGrid>


    </>
  )
}

export default Content
