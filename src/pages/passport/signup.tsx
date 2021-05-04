import landingStyles from "../../styles/landing/landing.module.css";
import Link from "next/link";

const signup = () => {
  return (
    <div className={landingStyles.white}>
      <form className={landingStyles.registerForm} method="POST" action="/register">

        <label className={landingStyles.registerLabel}>Username</label><br />
        <input className={landingStyles.landingInput + " " + landingStyles.registerInput}
          type="username"
          id="username"
          name="username"
          placeholder=""
        /><br />

        <label className={landingStyles.registerLabel2}>Email</label><br />
        <input className={landingStyles.landingInput + " " + landingStyles.registerInput}
          type="email"
          id="email"
          name="email"
          placeholder=""
        /> <br />

        <label className={landingStyles.registerLabel}>Password</label><br />
        <input className={landingStyles.landingInput + " " + landingStyles.registerInput}
          type="password"
          id="password"
          name="password"
          placeholder=""
        /> <br />


        <input className={landingStyles.coloredLink}
          type="submit"
          value="Sign Up"
        />

        <Link href="/passport/signin" ><div className={`${landingStyles.blackRegister}`}>Sign In</div></Link>
      </form>

    </div>

  )
}

export default signup
