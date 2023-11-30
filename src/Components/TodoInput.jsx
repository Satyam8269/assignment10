import React, { useState } from 'react'

const TodoInput = ({onAdd}) => {
    const [title,setTitle] = useState("");
    const postTodo = async (value)=> {
      try{
        let res = await fetch("http://localhost:3000/todo",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            value,
            status:false
          })
          
        })
        const data = await res.json();
        onAdd(data);
        setTitle("");
      }
      catch(e){
        console.log("err:",e);
      }
    }
  return (
    <div>
        <input type='text' placeholder='Add Something' value={title} onChange={(e)=>setTitle(e.target.value)} />
        <button onClick={()=>(postTodo(title.trim()))}>ADD</button>
    </div>
  )
}

export default TodoInput