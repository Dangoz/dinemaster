import { useEffect } from "react";
import SearchStyle from "../../styles/search.module.css";
import router from "next/router";

const Tags = ({ tags }) => {

  const getTag = (event, tagName) => {
    router.push({
      pathname: `/search`,
      query: { tags: tagName }
    })
  }

  return (
    <div className={SearchStyle.tags}>
       {tags.map((tag, index) => (
         <div className={SearchStyle.individualTag} key={index} onClick={(e) => getTag(e, tag.name)}>#{tag.name}</div>
       ))}
    </div>
  )
}

export default Tags
