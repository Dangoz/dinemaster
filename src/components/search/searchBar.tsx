import MessageStyle from "../../styles/message/message.module.css";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import Search from "../../api/search";
import { useRouter } from "next/router";

const SearchBar = ({ setPosts, setTags, setIsLoading, setIsDefault }) => {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [query] = useDebounce(input, 1000);

  useEffect(() => {
    const { tags } = router.query;
    console.log("router", tags);
    parseQuery(tags);
  }, [router.query])

  const searchInput = async (event) => {
    await setInput(event.target.value);
  }

  const parseQuery = (tags?) => {
    setIsLoading(true);
    if (tags) setIsDefault(false);
    const queryList = tags
    ? tags.trim().split(" ").filter(word => word != "")
    : query.trim().split(" ").filter(word => word != "")
    Search.searchQuery(queryList)
      .then(({ tags, posts }) => {
        console.log("tags", tags, "posts", posts);
        setTags(tags);
        setPosts(posts);
        setIsLoading(false);
      })
  }

  useEffect(() => {
    if (query.trim() === '') return setIsDefault(true);

    setIsDefault(false);
    parseQuery();
  }, [query])

  return (
    <>
      <input onChange={searchInput}
        value={input} className={MessageStyle.search} type="text" placeholder="Search" maxLength={50} />
    </>
  )
}

export default SearchBar
