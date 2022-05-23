import React, { useState, useRef, useEffect } from "react";
import Form from "./Form";
import FilterButton from "./FilterButton";
import Todo from "./Todo"
import axios from 'axios';
import { SERVER_URL } from "../../config";
import { useNavigate } from "react-router-dom"; 
import "./TodoList.css"

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: todo => !todo.completed,
  Completed: todo => todo.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function TodoList({isAuthenticated, setIsAuthenticated}) {
  const [todo, setTodo] = useState([]);
  const [filter, setFilter] = useState('All');

  let navigate = useNavigate();

  useEffect(() => {
		if(!isAuthenticated){
			navigate("/");
		}
	}, [isAuthenticated, navigate])

  useEffect(() => {
    (async () =>{
      let url = "";
      let response = null;
      try {
          if(filter === 'Completed') {
              url = SERVER_URL + '/todo/todoList?isCompleted=true'
          } else if(filter === 'Active') {
              url = SERVER_URL + '/todo/todoList?isCompleted=false'
          } else {
              url = SERVER_URL + '/todo/todoList'
          }
          response = await axios.get(url, {headers: {'Authorization': `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,}})
      } catch(err) {
          console.log(err)
      }

      setTodo(response.data)
    })();
  }, [filter]); 

  function toggleTodoCompleted(id) {
      axios.put(SERVER_URL + `/todo/todoList/${id}/changeIsCompleted`, {}, {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
          }
      }).then((response) => {
        console.log(response)
      }).catch((error) => console.log(error))
  }

  function updateTodo(id, title) {
    axios.put(SERVER_URL + `/todo/update/${id}`, {title}, {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
      }
    }).then((response) => {
      console.log(response)
      let array = []
      array.push(response.data)
      setTodo(array)
      alert('수정완료!')
    }).catch((error) => console.log(error))
  }

  function deleteTodo(id) {
    axios.delete(SERVER_URL + `/todo/delete/${id}`, {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
      }
    }).then((response) => {
      setTodo(response.data)
    }).catch((error) => console.log(error))
  }

  const todoList = todo.map(todo => 
    <Todo
      id={todo.id}
      name={todo.title}
      completed={todo.completed}
      key={todo.id}
      toggleTodoCompleted={toggleTodoCompleted}
      deleteTodo={deleteTodo}
      updateTodo={updateTodo}
    />
  );

  const filterList = FILTER_NAMES.map(name => 
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  );

  const todoNoun = todoList.length !== 1 ? 'todos' : 'todo';
  const headingText = `${todoList.length} ${todoNoun} 남아있음`;

  const listHeadingRef = useRef(null);
  const prevTodoLength = usePrevious(todo.length);

  useEffect(() => {
    if (todo.length - prevTodoLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [todo.length, prevTodoLength]);
 
  return (
    <div className="todoapp stack-large">
      <Form/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {todoList}
      </ul>
    </div>
  );
}

export default TodoList;