import Menu from "../components/menu";
// import 
import { requireAuthen } from "../api/require.authen";
import Content from "../components/search/content";
import { useState } from "react";
import SearchStyle from "../styles/search.module.css"


const search = ({ user }) => {
  const [query, setQuery] = useState('');

  const parseQuery = async (event) => {
    setQuery(event.target.value);

  }

  return (
    <>
      <div className={SearchStyle.wrapper}>
        <input className={SearchStyle.search} type="text" placeholder="Search" value={query} onChange={parseQuery}></input>
        <h3 className={SearchStyle.title}>See What Others Are Posting</h3>
        <Content userId={user.id} />
      </div>

      <Content userId={user.id} />
        <Menu/>
      </>
  )
}

export const getServerSideProps = requireAuthen(async function(ctx, user) {

  return {
    props: {
      user
    }
  }
})

export default search;

