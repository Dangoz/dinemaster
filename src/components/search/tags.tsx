import { useEffect } from "react";

const Tags = ({ tags }) => {
  return (
    <div>
       {tags.map((tag, index) => (
         <div key={index}>#{tag.name}</div>
       ))}
    </div>
  )
}

export default Tags
