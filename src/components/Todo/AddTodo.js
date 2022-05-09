import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; 
import { SERVER_URL } from '../../config';

function AddTodo({isAuthenticated, setIsAuthenticated}) {
  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
		if(!isAuthenticated){
			navigate.push("/");
		}
	}, [isAuthenticated, navigate])

	const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(SERVER_URL + '/todo/addTodo', {title, targetDate}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
        }
      })
    } catch(error){
      setMessage('');
      setErrorMessage('오류 발생!!');
      return;
    }
    
    setTitle('');
    setTargetDate('');
    setErrorMessage('');
    setMessage('Todo 만들기 성공!');
  }

  useEffect(() => {
    setMessage('')
  }, [title, targetDate])

  const showMessage = () => {
    if(message === ''){
      return <div></div>
    }
    return <div className="alert alert-success" role="alert">
      {message}
    </div> 
  }

  const showErrorMessage = () => {
    if(errorMessage === ''){
      return <div></div>
    }

    return <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  }

	return (
		<div className="container">
      <form onSubmit={onSubmit}>
        <h1>Todo 만들기</h1>
        <br/>
        <div className="form-group">
          <label>제목</label>
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Title"
            className="form-control">
          </input>
        </div>
        <div className="form-group">
          <label>등록일</label>
          <input 
            value={targetDate} 
            type="date" 
            onChange={e => setTargetDate(e.target.value)} 
            className="form-control">
          </input>
        </div>
        <button className="btn btn-primary">TODO 추가</button>
      </form>
      {showMessage()}
      {showErrorMessage()}
    </div>
	)
}

export default AddTodo;