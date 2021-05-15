import { GetServerSideProps } from "next";
import Menu from "../components/menu";
import { useEffect, useState, useRef } from "react";
import { requireAuthen } from "../api/require.authen";
import api from "../config/axios";

const message = ({ id, username, data }) => {
  // const [count, setCount] = useState(0);
  // const [userData, setUserData] = useState(id)
  // const [effectData, setEffectData] = useState({ id: '', username: '' });
  // const [like, setLike] = useState(false);


  // useEffect(() => {
  //   let newEffectDataId = userData + ' 1';
  //   setUserData(newEffectDataId);
  //   // alert(effectData.id)
  // }, [count])

  // useEffect(() => {
  //   api({
  //     method: 'get',
  //     url: '/profile/123',
  //     withCredentials: true
  //   }).then(res => {
  
  //     setEffectData({
  //       id: res.data.id,
  //       username: res.data.username
  //     });
  //   })
  // }, [])


  

  return (
    <>
      MESSAGE message: 
      {/* {count}
      <br/><button onClick={() => {
        if (count >= 10) {
          return setCount(0);
        }
        return setCount(count + 1)
      }}>increase</button>
      <br/>
      ID: {effectData.id}<br/>
      UserName: {effectData.username} <br/>
      Data: {userData}
      <br/>useEffectData: {JSON.stringify(effectData)}

      <br/><br/> <button onClick={() => {
        like ? setLike(false) : setLike(true)
      }}>like({like ? 'red' : 'white'})</button> */}


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

export default message

