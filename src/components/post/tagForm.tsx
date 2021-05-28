import PostStyle from "../../styles/post/post.module.css";
import { useState, useEffect } from "react";

const TagForm = ({ pushTag, removeTag, isReset }) => {
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

  useEffect(() => {
    if (isReset) {
      setTags([]);
      setCount(0);
    }
  }, [isReset])

  return (
    <>
      <div className={PostStyle.tagWrapper}>
        <h3 className={PostStyle.tagTitle}>Tags</h3>
        <ul className={PostStyle.tagList}>
          {tags.length >= 1 && tags.map(tag => (
            <li className={PostStyle.tagListItem} onClick={event => removeFormTag(event, tag)} key={tag}>#{tag}</li>
          ))}
        </ul>
        <div className={PostStyle.count}>{`${count}/10`}</div>
        <input className={PostStyle.typeTags} type="text" placeholder="Please type tags here" maxLength={35} onKeyDown={tagKeyDown} value={formValue} onChange={editForm} />
      </div>
    </>
  )
}

export default TagForm;
