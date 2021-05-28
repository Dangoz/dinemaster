import { useEffect } from "react";
import SearchStyle from "../../styles/search.module.css";
import router from "next/router";

const TagPool = ({ tagPool }) => {

  const getTag = (event, tagName) => {
    router.push({
      pathname: `/search`,
      query: { tags: tagName }
    })
  }

  return (
    <div className={SearchStyle.tagItems}>
       {tagPool.map((tag, index) => (
        //  <div className={SearchStyle.tagItem} key={index}>#{tag.name} {tag.posts.length} posts</div>
        <div key={index} className={SearchStyle.tagItem} onClick={(e) => getTag(e, tag.name)}>
          <div className={SearchStyle.tagItemName}>#{tag.name}</div>
          <div className={SearchStyle.tagItemCount}>{tag.posts.length} posts</div>
        </div>
       ))}
    </div>
  )
}

export default TagPool
