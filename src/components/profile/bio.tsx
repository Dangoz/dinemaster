import ProfileStyle from "../../styles/profile.module.css";
import { useState } from "react";
import User from "../../api/user";

const Bio = ({ id, bio }) => {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(bio);

  const movedOut = event => {
    setEdit(false);
    if (bio !== content) User.updateBio(id, content);
  }

  const enterKey = event => {
    if (event.key === "Enter") {
      setEdit(false);
      if (bio !== content) User.updateBio(id, content);
    }
  }

  const editContent = event => {
    setContent(event.target.value)
  }

  const showInput = event => {
    setEdit(true)
  }

  return (
    <>
      { edit && <input onMouseOut={movedOut} maxLength={50}
      onKeyDown={enterKey}
      onChange={editContent}
      value={content} className={ProfileStyle.bio + " " + ProfileStyle.bioInput}/>}

      { !edit && <div onClick={showInput}
        className={ProfileStyle.bio}>{content}
      </div>}
    </>
  )
}

export default Bio
