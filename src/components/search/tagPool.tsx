import { useEffect } from "react";
import SearchStyle from "../../styles/search.module.css";

const TagPool = ({ tagPool }) => {

  return (
    <div className={SearchStyle.tagItems}>
       {tagPool.map((tag, index) => (
        //  <div className={SearchStyle.tagItem} key={index}>#{tag.name} {tag.posts.length} posts</div>
        <div className={SearchStyle.tagItem}>
          <div className={SearchStyle.tagItemName} key={index}>#{tag.name}</div>
          <div className={SearchStyle.tagItemCount} key={index}>{tag.posts.length} posts</div>
        </div>
       ))}
    </div>
  )
}

export default TagPool
