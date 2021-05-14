import Menu from "../components/menu";
import api from "../config/axios";
import { requireAuthen } from "../api/require.authen";

const search = ({ user }) => {
  return (
    <>
      <input type="text" placeholder="Search"></input>
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

