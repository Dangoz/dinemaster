import landingStyles from "../../styles/landing/landing.module.css";
import Link from "next/link";
import router from "next/router"
import { checkUser, login } from "../../api/require.authen";
import { useState, useEffect } from "react";

const signin = () => {
  const [message, setMessage] = useState(null);
  useEffect(() => {
    checkUser();
  }, [])

  const signin = async (event) => {
    const msg = await login(event);
    setMessage(msg);
  }

  return (
    <div className={landingStyles.wrapper}>

      <div className={landingStyles.head}>
        <img className={landingStyles.logo} src="/logo_white_vertical.svg" alt="logo" />
        <br />Stay Posted, Stay Fresh
        <br />with other restaurants
      </div>

      <div className={landingStyles.options}>

        <form className={landingStyles.signinForm} onSubmit={signin} >
        {message && <span className={landingStyles.errMessage}>{message}</span>}
          <input className={landingStyles.landingInput}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          /> <br />

          <input className={landingStyles.landingInput}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          /> <br />


          <input className={landingStyles.coloredLink}
            type="submit"
            value="Log In"
          />

          <Link href="/passport/signup" ><div className={landingStyles.black}>new User? Sign Up</div></Link>
        </form>


      </div>
    </div>
  )
}

export default signin
