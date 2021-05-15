import ContentLoader from "react-content-loader";
import ProfileStyle from "../../styles/profile.module.css";
import { useRef, useState } from "react";
import User from "../../api/user";

const photo = ({ id, photo }) => {
  const uploadInput = useRef(null);
  // const [file, setFile] = useState();
  const [source, setSource] = useState(photo);

  const clickUpload = e => {
    uploadInput.current.click();
  }

  const uploadFile = async (event) => {
    const file = event.target.files[0];
    const url = await User.updatePhoto(id, file);
    setSource(url);
  }

  return (
    <>
      <input className={ProfileStyle.addInput} type="file" accept="image/*"
          name="image" ref={element => uploadInput.current = element} 
          onChange={uploadFile}/>

      <div className={ProfileStyle.photo}>

        { true && <input className={ProfileStyle.addButton} type="image" src="/add.png"
          onClick={clickUpload} />}

        <img src={source} />
      </div>

    </>
  )
}

export default photo
