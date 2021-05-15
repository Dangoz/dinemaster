import React from 'react'
import { useState } from 'react';


const task = () => {
  // let task: string[] = []
  const [task, setTask] = useState([1, 2, 3, 'uwu']);
  
  const items = [];
  for (let i of task) {
    items.push(<div key={i}> {i}</div>);
  }

  return (
    <>
      {items}
    </>
  )
}

export default task;
// import { useState } from 'react';

