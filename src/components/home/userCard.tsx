import SwiperStyle from "../../styles/home/swiper.module.css";
import Link from "next/link";

const UserCard = ({ user }) => {
  return (
    <>
      <div className={SwiperStyle.item}>
        <Link href="/profile/[uid]" as={`/profile/${user.id}`}>
          <img className={SwiperStyle.photo} src={user.photo} />
        </Link>

        <div className={SwiperStyle.username}>{user.username}</div>
        <div className={SwiperStyle.bio}>{user.bio}</div>
        <button className={SwiperStyle.followButton}>Follow</button>
      </div>
    </>
  )
}

export default UserCard
