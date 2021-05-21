import PostStyle from "../../styles/post/post.module.css";
import { useState } from "react";

const TagForm = ({ pushTag, removeTag }) => {
  const [formValue, setFormValue] = useState('');
  const [count, setCount] = useState(0);
  const [tags, setTags] = useState([]);

  const editForm = async (event) => {
    setFormValue(event.target.value)
  }

  const tagKeyDown = async (event) => {
    if (event.key == 'Enter' || event.keyCode == 32) {
      console.log(`key down!!! ${event.target.value}`);

      let tag = event.target.value.toLowerCase().trim();

      if (tags.indexOf(tag) === -1 && count !== 10 && tag != '') {
        setTags([...tags, tag]);
        pushTag(tag);
        setCount(count + 1);
      }
      setFormValue('');
    }
  }

  const removeFormTag = async (event, tag) => {
    const index = tags.indexOf(tag);
    let remainingTags = tags;
    remainingTags.splice(index, 1);

    setTags(remainingTags);
    removeTag(tag);
    setCount(count - 1);
  }

  return (
    <>
      <div>
        <ul className={PostStyle.tagList}>
          {tags.length >= 1 && tags.map(tag => (
            <li className={PostStyle.tagListItem} onClick={event => removeFormTag(event, tag)} key={tag}>#{tag}</li>
          ))}
        </ul>
        <input type="text" placeholder="Tags" maxLength={35} onKeyDown={tagKeyDown} value={formValue} onChange={editForm}/>
        <div>{`${count}/10`}</div>
      </div>
    </>
  )
}

export default TagForm;
