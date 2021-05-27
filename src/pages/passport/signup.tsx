import landingStyles from "../../styles/landing/landing.module.css";
import Link from "next/link";
import { checkUser, register } from "../../api/require.authen";
import { useEffect, useState } from "react";

const signup = () => {
  const [message, setMessage] = useState(null);
  useEffect(() => {
    checkUser();
  }, [])

  const signup = async (event) => {
    const msg = await register(event);
    setMessage(msg);
  }

  return (
    <div className={landingStyles.white}>
      <form className={landingStyles.registerForm} onSubmit={signup}>
      {message && <span className={landingStyles.errMessage2}>{message}</span>}
        <label className={landingStyles.registerLabel}>Username </label><br />
        <input className={landingStyles.landingInput + " " + landingStyles.registerInput}
          type="username"
          id="username"
          name="username"
          placeholder=""
          maxLength={50}
          required
        /><br />

        <label className={landingStyles.registerLabel2}>Email</label><br />
        <input className={landingStyles.landingInput + " " + landingStyles.registerInput}
          type="email"
          id="email"
          name="email"
          placeholder=""
          maxLength={50}
          required
        /> <br />

        <label className={landingStyles.registerLabel}>Password</label><br />
        <input className={landingStyles.landingInput + " " + landingStyles.registerInput}
          type="password"
          id="password"
          name="password"
          placeholder=""
          maxLength={50}
          required
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
