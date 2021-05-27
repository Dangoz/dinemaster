import { useEffect } from "react";

const TagPool = ({ tagPool }) => {

  return (
    <div>
       {tagPool.map((tag, index) => (
         <div key={index}>#{tag.name} posts count:{tag.posts.length}</div>
       ))}
    </div>
  )
}

export default TagPool
