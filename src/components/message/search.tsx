import MessageStyle from "../../styles/message/message.module.css";
import Message from "../../api/message";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

const Search = ({ setUsers, setIsLoading, setIsDefault }) => {
  const [input, setInput] = useState('');
  const [query] = useDebounce(input, 1000);

  const searchInput = async (event) => {
    await setInput(event.target.value);
  }

  const parseQuery = () => {
    setIsLoading(true);

    const queryList = query.trim().split(" ").filter(word => word != "")
    Message.searchUser(queryList)
      .then(users => {
        setUsers(users);
        setIsLoading(false);
      })
  }

  useEffect(() => {
    console.log('query', query);
    if (query.trim() === '') return setIsDefault(true);

    setIsDefault(false);
    parseQuery();
  }, [query])

  return (
    <>
      <div className={MessageStyle.messageSearch}>
        <input onChange={searchInput}
          value={input} className={MessageStyle.search} type="text" placeholder="Search" maxLength={50} />
      </div>
    </>
  )
}

export default Search
