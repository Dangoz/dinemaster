import landingStyles from "../../styles/landing/landing.module.css";
import Link from "next/link";


const landing = () => {
  return (

    <>
      <div className={landingStyles.wrapper}>

        <div className={landingStyles.head}>
        <img className={landingStyles.logo} src="/logo_white_vertical.svg" alt="logo"/>
        <br/>Stay Posted, Stay Fresh
        <br/>with other restaurants
        </div>
        
        <div className={landingStyles.options}>
          <Link href="/passport/signin" ><button className={landingStyles.coloredLink} >Sign In</button></Link>
          <Link href="/passport/signup" ><button className={landingStyles.uncoloredLink}>Sign Up</button></Link>

        </div>

      </div>

    </>

  )
}

// landing.getInitialProps = async () => {
//   return {};
// };

export default landing
