import SwiperStyle from "../../styles/home/swiper.module.css";
import FollowUnfollow from "../shared/followUnfollow";
import Link from "next/link";
import { useState } from "react";


const UserCard = ({ user, hostId }) => {

  return (
    <>
      <div className={SwiperStyle.item}>
        <Link href="/profile/[uid]" as={`/profile/${user.id}`}>
          <img className={SwiperStyle.photo} src={user.photo} />
        </Link>

        <div className={SwiperStyle.username}>{user.username}</div>
        <div className={SwiperStyle.bio}>{user.bio}</div>


        <FollowUnfollow user={user} hostId={hostId} style={SwiperStyle}/>

      </div>
    </>
  )
}

export default UserCard
