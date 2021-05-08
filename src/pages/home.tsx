import React, { Component } from 'react';
import Menu from "../components/menu";
import { GetServerSideProps } from "next";
import api from "../config/axios";
import { requireAuthen } from "../api/require.authen";

export class home extends Component {
  static propTypes = {

  }

  render() {
    return (
      <>
      HOME home
        <Menu/>
      </>
    )
  }
}

export const getServerSideProps = requireAuthen(async function(ctx, user) {

  return {
    props: {
      user
    }
  }
})

export default home

