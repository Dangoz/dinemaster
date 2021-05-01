import landingStyles from "../styles/landing/landing.module.css";
import LandingLayout from "../components/landing/landing.layout";
import Link from "next/link";


const landing = () => {
  return (

    <>
      <div className={landingStyles.wrapper}>


        <img className={landingStyles.logo} src="/Frame.png" alt="BG" />

        <div className={landingStyles.options}>
          <Link href="/signin" ><button className={landingStyles.coloredLink} >Sign In</button></Link>
          <Link href="/signup" ><button className={landingStyles.uncoloredLink}>Sign Up</button></Link>

        </div>

      </div>

    </>

  )
}

// landing.getInitialProps = async () => {
//   return {};
// };

export default landing
