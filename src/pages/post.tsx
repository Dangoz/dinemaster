import Menu from "../components/menu";
import { GetServerSideProps } from "next";
import api from "../config/axios";
import { requireAuthen } from "../api/require.authen";

const post = () => {
  return (
    <>
      Post posttt
      <Menu />
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
export default post
