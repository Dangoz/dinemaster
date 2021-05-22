import { useState } from "react";
import ContentLoader from "react-content-loader";
import User from "../../api/user";

const FollowUnfollow = ({ user, hostId, style, changeCount }) => {
  const [followStatus, setFollowStatus] = useState(user.followedByUser);
  const [isLoading, setIsLoading] = useState(false);

  const followUnfollow = async (event, followToggle: boolean) => {

    setIsLoading(true);
    const status = await User.followUnfollowUser(user.id, hostId, followToggle);
    status != 200 ? setFollowStatus(!followToggle)
      : setFollowStatus(followToggle);
    setIsLoading(false);

    if (changeCount) changeCount(followToggle);
  }

  return (
    <>
      {isLoading
        ? <ContentLoader className={style.loading} viewBox="0 0 60 15" speed={1} backgroundColor={"#333"} foregroundColor={"#999"}>
          <rect x="0" y="0" rx="0" ry="0" width="64" height="15" />
        </ContentLoader>

        : <div>
          {!followStatus && <button onClick={e => followUnfollow(e, true)}
            className={style.followButton}>Follow</button>}

          {followStatus && <button onClick={e => followUnfollow(e, false)}
            className={style.followedButton}>Followed</button>}
        </div>}
    </>
  )
}

export default FollowUnfollow
