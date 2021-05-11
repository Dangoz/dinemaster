import api from "../config/axios";
import { GetServerSideProps } from "next";
import { response } from "express";
import router from "next/router";

export const requireAuthen: (cb) => GetServerSideProps = (cb) => {
  return async (ctx) => {

    // using cookie to request a user
    const response = await api({
      method: 'get',
      url: '/user',
      headers: ctx.req.headers.cookie ? { cookie: ctx.req.headers.cookie } : undefined
    })

    // user not found back to login page
    if (response.status != 200) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    return await cb(ctx, response.data);
  }
}

export const checkUser: () => void = () => {

  // using cookie to request a user
  console.log('checking user...');
  api({
    method: 'get',
    url: '/user',
    withCredentials: true
  }).then(response => {

    console.log(response.status);

    if (response.status == 200) {
      console.log('USER already logged in')
      return router.push('/home')
    }
  })
}