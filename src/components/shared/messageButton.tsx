import { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";
import router from "next/router";

const MessageButton = ({ user, hostId, style }) => {
  const [isLoading, setIsLoading] = useState(false);

  const Message = async (event) => {
    setIsLoading(true);
    router.push(`/message/${user.id}`)
  }

  return (
    <>
      {isLoading
        ? <ContentLoader className={style.loading} viewBox="0 0 60 15" speed={1} backgroundColor={"#333"} foregroundColor={"#999"}>
          <rect x="0" y="0" rx="0" ry="0" width="64" height="15" />
        </ContentLoader>

        : (user.id === hostId)
          ? <div><button className={style.messageButton + " " + style.meButton}>ME</button></div>
          : <div>
            <button onClick={Message} className={style.messageButton}>Message</button>
          </div>}
    </>
  )
}

export default MessageButton;