import HomeStyle from "../styles/home/home.module.css";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useState } from "react";
import User from "../api/user";
import router from "next/router";
import Link from "next/link";

const styles = {
  likedIcon: {
    width: 31,
    height: 31,
    fill: 'red'
  },
  iconInner: {
    width: 31,
    height: 31,
    fill: 'white'
  },
  iconBorder: {
    width: 31,
    height: 31,
    fill: 'black'
  }
};

const ImageItem = ({ post, userId }) => {
  const [liked, setLiked] = useState(post.likedByUser);

  const likeUnlike = async (event, likeToggle: boolean) => {
    User.likeUnlikePost(userId, post.id, likeToggle);
    setLiked(likeToggle);
  }

  const openPost = async (event) => {
    console.log("open post!")
  }

  const showPost = async (event) => {
    console.log(`TO ${post.id}!`);
    router.push(`/post/${post.id}`);
  }

  return (
    <>
      <div className={HomeStyle.itemBox} onClick={showPost}>

        <img className={HomeStyle.item} src={post.source} onClick={openPost}/>
        
        {liked && <FavoriteIcon className={HomeStyle.likeIcon} style={styles.likedIcon} onClick={(e) => likeUnlike(e, false)}/>}

        {!liked && <div onClick={(e) => likeUnlike(e, true)}>
          <FavoriteIcon className={HomeStyle.likeIcon} style={styles.iconInner} />
          <FavoriteBorderIcon className={HomeStyle.likeIcon} style={styles.iconBorder}/>
        </div>}

      </div>
    </>
  )
}

export default ImageItem
