import landingStyles from "../../styles/landing/landing.module.css";
import Link from "next/link";
import router from "next/router"
import { checkUser, login } from "../../api/require.authen";
import { useEffect } from "react";

const signin = () => {
  useEffect(() => {
    checkUser();
  }, [])

  return (
    <div className={landingStyles.wrapper}>

      <div className={landingStyles.head}>
        <img className={landingStyles.logo} src="/logo_white_vertical.svg" alt="logo" />
        <br />Stay Posted, Stay Fresh
        <br />with other restaurants
      </div>

      <div className={landingStyles.options}>

        <form className={landingStyles.signinForm} onSubmit={login} >

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
