import HomeStyle from "../../styles/home/home.module.css";

const Item = ({ post }) => {
  return (
    <>
      <div className={HomeStyle.item}>
        {/* <img className={HomeStyle.item} src={post.source} /> */}
      </div>
    </>
  )
}

export default Item