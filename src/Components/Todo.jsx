import React, { useEffect, useState } from 'react'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem';

const Todo = () => {
    const [list,setList] = useState([]);

    const onAdd = (data) =>{
        setList([...list,data]);
    }

    const onDelete = (id) =>{
        const newList = list.filter((elem)=>elem.id!==id);
        setList(newList);
    }

    const onEdit = (updatedTodo)=>{
        const updatedList = list.map((elem)=>{
            if(elem.id === updatedTodo.id) return updatedTodo;
            else return elem;
        })
        setList(updatedList);
    }

    useEffect(()=>{
        const getTodos = async ()=>{
            try{
                let res = await fetch ("http://localhost:3000/todo");
                let data= await res.json();
                console.log(data);
                setList(data);
            }
            catch(e){
                console.log("err:",e);
            }
        }
        getTodos();
    },[])

    

  return (
    <div>
        <TodoInput onAdd={onAdd} />
        {list.map((elem)=>(
            <TodoItem key={elem.id} {...elem} onDelete={onDelete} onEdit={onEdit} />
        ))}
    </div>
  )
}

export default Todo