import api from "../config/axios";
import { GetServerSideProps } from "next";
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

export const login = (event) => {
  event.preventDefault();
  api.post('/auth/login', {
    email: event.target[0].value,
    password: event.target[1].value
  },
    { withCredentials: true }).then(response => {

      console.log(response.status);
      if (response.status == 200) {
        return router.push('/home');
      }

      event.target.reset();
      return response.data.err;
    })
}

export const register = (event) => {
  event.preventDefault();
  api.post('/auth/register', {
    email: event.target[1].value,
    password: event.target[2].value,
    username: event.target[0].value,
  },
    { withCredentials: true }).then(response => {

      console.log(response.status);
      if (response.status == 200) { 
        return router.push('/passport/signin');
      }

      event.target.reset();
      return response.data.err;
    })
}