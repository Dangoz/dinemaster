import MenuStyle from "../styles/menu.module.css";
import Link from "next/link";

const Menu = () => {
  return (

    <div className={MenuStyle.wrapper}>

      <ul className={MenuStyle.options}>
        <li><Link href="/home"><img src="/menu/home.png" alt="home"></img></Link></li>
        <li><Link href="/search"><img src="/menu/search.png" alt="search"></img></Link></li>
        <li><Link href="/post"><img className={MenuStyle.plus} src="/menu/plus.png" alt="plus"></img></Link></li>
        <li><Link href="/message"><img className={MenuStyle.message} src="/menu/message.png" alt="message"></img></Link></li>
        <li><Link href="/profile"><img src="/menu/profile.png" alt="profile"></img></Link></li>
      </ul>

    </div>

  )
}

export default Menu;
