import React, { useState } from 'react'
import styles from "./Todo.module.css"

const TodoItem = ({id,value,status,onDelete,onEdit}) => {
  const [isEditable,setIsEditable] = useState(false);
  const [newTodo,setNewTodo] = useState("")

  const deleteTodo = async () => {
    try{
      let res = await fetch(`http://localhost:3000/todo/${id}`,{
        method:"DELETE",
        headers:{
          "content-type":"appplication/json"
        },
      })
      onDelete(id)
    }
    catch(err){
      console.log("err:",err)
    }
  }

  const editTodo = async (newTodo)=>{
    try{
      let res = await fetch( `http://localhost:3000/todo/${id}`,{
        method:"PATCH",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          value:newTodo,
          status:true
        })
      })
      const data = await res.json();
      onEdit(data)
      setNewTodo("");
      setIsEditable(false)
    }
    catch(err){
      console.log("err:",err);
    }
  }

  return (
    <div className= { `${styles.flex} ${status ? styles.lineThrough : ""}`}>
      {isEditable ? (
      <div>
          <input type='text' placeholder='update here' value={newTodo} onChange={(e)=>setNewTodo(e.target.value)} />
          <button onClick={()=>editTodo(newTodo)}>UPDATE</button>
      </div>
      ):(
      <h3>{value}</h3>)}
      <div>
        <button onClick={deleteTodo}>DELETE</button>
        <button onClick={()=>setIsEditable(!isEditable)}>EDIT</button>
      </div>
    </div>
  )
}

export default TodoItem