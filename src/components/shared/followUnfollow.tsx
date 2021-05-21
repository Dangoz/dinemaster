import { useState } from "react";
import ContentLoader from "react-content-loader";

const FollowUnfollow = ({ user, hostId, style }) => {
  const [followStatus, setFollowStatus] = useState(user.followedByUser);
  const [isLoading, setIsLoading] = useState(false);

  const followUnfollow = async (event, followToggle: boolean) => {


    console.log(`follow: ${followStatus} - user`);
    await setIsLoading(!isLoading);
    console.log(`isloading: ${isLoading}`)
    await setTimeout(() => {
      setFollowStatus(followToggle)
      setIsLoading(false);
    }, 3000);
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
