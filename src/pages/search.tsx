import Menu from "../components/menu";
import Search from "../components/search/search";
import { requireAuthen } from "../api/require.authen";
import Content from "../components/search/content";
import { useState } from "react";

const search = ({ user }) => {
  const [query, setQuery] = useState('');

  const parseQuery = async (event) => {
    setQuery(event.target.value);

  }

  return (
    <>
      {/* <Search /> */}

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

