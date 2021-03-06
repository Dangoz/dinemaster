import PostStyle from "../styles/post/post.module.css"
import Menu from "../components/menu";
import TagForm from "../components/post/tagForm";
import { requireAuthen } from "../api/require.authen";
import { useState, useEffect, useRef } from "react";
import Post from "../api/post";

const post = ({ user }) => {
  const [isPrompt, setIsPrompt] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState('/logo_black_vertical.svg');
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const uploadRef = useRef(null);

  const createPost = async (event) => {
    console.log('creating post! with: ' + tags)
    setIsLoading(true);
    event.preventDefault();
    const data = { caption, file, tags }
    await Post.createImagePost(data, user)
      .then(response => {
        console.log(response.status);

        setIsPrompt(true);
        setTimeout(() => {
          setIsPrompt(false);
        }, 1200)

        setIsReset(true);
        setTags([]);
        setFile(null);
        setCaption('');
        setPreview('/logo_black_vertical.svg');

        setIsReset(false);
        setIsLoading(false);
      })
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

  const captionChange = async (event) => {
    setCaption(event.target.value);
    console.log(caption);
  }

  const fileChange = async (event) => {
    setPreview(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  }

  const upload = async (event) => {
    uploadRef.current.click();
  }

  useEffect(() => {
    if (file) return setIsEmpty(false);
    setIsEmpty(true);
  }, [file])

  return (
    <>
      <div className={PostStyle.window}>
        <div className={PostStyle.wrapper}>
        <img className={isPrompt ? PostStyle.promptShow : PostStyle.prompt} src={'/prompt.png'} />
          <h2 className={PostStyle.title}>New Post</h2>
          <form className={PostStyle.formWrapper} onSubmit={e => e.preventDefault()}>
            <div className={PostStyle.postArea}>
              <img className={PostStyle.preview} src={preview} />

              <button className={PostStyle.greenChoose} type="submit" value="Upload" onMouseDown={upload}>Upload Picture</button>
              <input className={PostStyle.choosePic} type="file" accept="image/*" name="image" onChange={fileChange} ref={element => uploadRef.current = element} />
              <textarea className={PostStyle.content} name="message" placeholder="Enter description here..." onChange={captionChange} value={caption} maxLength={200} />
              <div className={PostStyle.contentCount}>{`${caption ? caption.length : 0}/200`}</div>
            </div>

            <TagForm pushTag={pushTag} removeTag={removeTag} isReset={isReset} />

            {isLoading
              ? <button className={PostStyle.greenBtnLoader} >Processing...</button>
              : isEmpty
                ? <button className={PostStyle.greenBtnEmpty}>Upload Required</button>
                : <button className={PostStyle.greenBtn} type="submit" value="Create" onMouseDown={createPost}>Create</button>}

          </form>
        </div>
      </div>

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
