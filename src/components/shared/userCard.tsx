import SwiperStyle from "../../styles/home/swiper.module.css";
import FollowUnfollow from "./followUnfollow";
import MessageButton from "./messageButton";
import Link from "next/link";

const UserCard = ({ user, hostId, button }) => {

  return (
    <>
      <div className={SwiperStyle.item}>
        <Link href="/profile/[uid]" as={`/profile/${user.id}`}>
          <img className={SwiperStyle.photo} src={user.photo} />
        </Link>

        <div className={SwiperStyle.username}>{user.username}</div>
        <div className={SwiperStyle.bio}>{user.bio}</div>

        {button === "follow" &&
          <FollowUnfollow user={user} hostId={hostId} style={SwiperStyle} />}

        {button === 'message' &&
          <MessageButton user={user} hostId={hostId} style={SwiperStyle} />}

      </div>
    </>
  )
}

export default UserCard
