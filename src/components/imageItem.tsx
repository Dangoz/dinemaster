import HomeStyle from "../styles/home/home.module.css";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useState } from "react";

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

const ImageItem = ({ post }) => {
  const [liked, setLiked] = useState(false);

  const like = (event) => {
    console.log('like')
  }

  const unLike = (event) => {
    console.log('unlike')
  }
  return (
    <>
      <div className={HomeStyle.itemBox} >

        <img className={HomeStyle.item} src={post.source}/>
        
        {liked && <FavoriteIcon className={HomeStyle.likeIcon} style={styles.likedIcon} onClick={unLike}/>}

        {!liked && <div onClick={like}>
          <FavoriteIcon className={HomeStyle.likeIcon} style={styles.iconInner} />
          <FavoriteBorderIcon className={HomeStyle.likeIcon} style={styles.iconBorder}/>
        </div>}

      </div>
    </>
  )
}

export default ImageItem
