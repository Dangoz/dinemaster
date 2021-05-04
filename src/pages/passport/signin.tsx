import landingStyles from "../../styles/landing/landing.module.css";
import Link from "next/link";

const signin = () => {
  return (
    <div className={landingStyles.wrapper}>

      {/* <img className={landingStyles.logo} src="/logo_white_vertical.svg" alt="BG" /> */}
      <div className={landingStyles.head}>
        <img className={landingStyles.logo} src="/logo_white_vertical.svg" alt="logo" />
        <br />Stay Posted, Stay Fresh
        <br />with other restaurants
      </div>

      <div className={landingStyles.options}>

        <form className={landingStyles.signinForm} method="POST" action="/login">

          <input className={landingStyles.landingInput}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
          /> <br />

          <input className={landingStyles.landingInput}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
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
