import { useEffect } from "react";
import SearchStyle from "../../styles/search.module.css";

const Tags = ({ tags }) => {
  return (
    <div className={SearchStyle.tags}>
       {tags.map((tag, index) => (
         <div className={SearchStyle.individualTag} key={index}>#{tag.name}</div>
       ))}
    </div>
  )
}

export default Tags
