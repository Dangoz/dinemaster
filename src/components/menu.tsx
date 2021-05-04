import MenuStyle from "../styles/menu.module.css";
import Link from "next/link";

const Menu = () => {
  return (

    <div className={MenuStyle.wrapper}>

      <ul className={MenuStyle.options}>
        <li><Link href="/home"><img src="/menu/home.svg" alt="home"></img></Link></li>
        <li><Link href="/search"><img src="/menu/search.svg" alt="search"></img></Link></li>
        <li><Link href="/post"><img src="/menu/plus.svg" alt="plus"></img></Link></li>
        <li><Link href="/message"><img src="/menu/message.svg" alt="message"></img></Link></li>
        <li><Link href="/profile"><img src="/menu/profile.svg" alt="profile"></img></Link></li>
      </ul>

    </div>

  )
}

export default Menu;
