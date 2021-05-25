import MessageStyle from "../../styles/message.module.css";

const Search = () => {
  return (
    <>
      <input className={MessageStyle.search} type="text" placeholder="Search"></input>
    </>
  )
}

export default Search
