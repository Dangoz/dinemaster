import PostStyle from "../styles/post/post.module.css"
import Menu from "../components/menu";
import TagForm from "../components/post/tagForm";
import { requireAuthen } from "../api/require.authen";
import { useState, useEffect } from "react";
import Post from "../api/post";

const post = ({ user }) => {
  const [preview, setPreview] = useState('/logo_black_vertical.svg');
  const [tags, setTags] = useState([]);
 
  const createPost = async (event) => {
    console.log('creating post! with: ' + tags)
    event.preventDefault();
    // const url = await Post.createImagePost(event, user);
  }

  const pushTag = (tag) => {
    setTags([...tags, tag]);
  }

  const removeTag = (tag) => {
    const index = tags.indexOf(tag);
    let remainingTags = tags;
    remainingTags.splice(index, 1);

    setTags(remainingTags);
  }

  const fileChange = async (event) => {
    setPreview(URL.createObjectURL(event.target.files[0]));
  }

  return (
    <>

      <form onSubmit={e => e.preventDefault()}>
        <input type="textarea" name="message" placeholder="Caption" />
        <br/>
        <img className={PostStyle.preview} src={preview}/>
        {/* <br/> */}
        <input type="file" accept="image/*" name="image" onChange={fileChange}/>
        <br/>

        <TagForm pushTag={pushTag} removeTag={removeTag}/>

        <button type="submit" value="Create" onMouseDown={createPost}>Create</button>
      </form>


      <Menu />
    </>
  )
}


export const getServerSideProps = requireAuthen(async function (ctx, user) {

  return {
    props: {
      user
    }
  }
})
export default post
