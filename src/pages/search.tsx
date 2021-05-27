import Menu from "../components/menu";
import SearchBar from "../components/search/searchBar";
import Tags from "../components/search/tags";
import TagPool from "../components/search/tagPool";
import Content from "../components/search/content";
import { requireAuthen } from "../api/require.authen";
import { useState, useEffect } from "react";
import SearchStyle from "../styles/search.module.css";
import { CircularProgress } from "@material-ui/core";
import Search from "../api/search";

const search = ({ user }) => {
  const [tagPool, setTagPool] = useState(null);
  const [tags, setTags] = useState(null);
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDefault, setIsDefault] = useState(true);

  const generateTagPool = () => {
    setIsLoading(true)
    Search.defaultTagPool()
      .then(tags => {
        setTagPool(tags);
        setIsLoading(false);
      })
  }

  useEffect(() => {
    if (isDefault) generateTagPool()
  }, [isDefault])

  return (
    <>
      <div className={SearchStyle.wrapper}>
        <div className={SearchStyle.searchWrapper}>
          <SearchBar setPosts={setPosts} setTags={setTags} setIsLoading={setIsLoading} setIsDefault={setIsDefault} />
        </div>

        {isLoading
          ? <div className={SearchStyle.CircularProgressContainer}>
            <CircularProgress className={SearchStyle.CircularProgress} value={100} color="inherit" size={33} />
          </div>

          : isDefault
            ? <div className={SearchStyle.tagPoolWrapper}>
              <TagPool tagPool={tagPool} />
            </div>
            : <div className={SearchStyle.contentWrapper}>
              <Tags tags={tags} />
              <Content userId={user.id} posts={posts} />
            </div>
        }

      </div>

      <Menu />
    </>
  )
}

export const getServerSideProps = requireAuthen(async function (ctx, user) {

  return {
    props: {
      user
    }
  }
})

export default search;

