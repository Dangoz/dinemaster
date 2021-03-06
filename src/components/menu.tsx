import MenuStyle from "../styles/menu.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";

const Menu = () => {
  const router = useRouter();
  const [path, setPath] = useState(router.pathname);

  useEffect(() => {
    setPath(router.pathname);
  }, [router.pathname])

  return (

    <div className={MenuStyle.wrapper}>

      <ul className={MenuStyle.options}>
        <li><Link href="/home"><img src={path.includes("/home") ? "/menu/homeB.png" : "/menu/home.png"} alt="home"></img></Link></li>
        <li><Link href="/search/"><img src={path.includes("/search") ? "/menu/searchB.png" : "/menu/search.png"} alt="search"></img></Link></li>
        <li><Link href="/post"><img className={MenuStyle.plus} src={path.includes("/post") ? "/menu/plusB.png" : "/menu/plus.png"} alt="plus"></img></Link></li>
        <li><Link href="/message"><img className={MenuStyle.message} src={path.includes("/message") ? "/menu/messageB.png" : "/menu/message.png"} alt="message"></img></Link></li>
        <li><Link href="/profile"><img src={path.includes("/profile") ? "/menu/profileB.png" : "/menu/profile.png"} alt="profile"></img></Link></li>
      </ul>

    </div>

  )
}

export default Menu;
