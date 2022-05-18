import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; 
import { SERVER_URL } from '../../config';

function AddTodo({isAuthenticated, setIsAuthenticated}) {
  const [title, setTitle] = useState('');
  const [createdDate, setTargetDate] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
		if(!isAuthenticated){
			navigate("/");
		}
	}, [isAuthenticated, navigate])

	const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(SERVER_URL + '/todo/addTodo', {title, createdDate}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
        }
    }).then((response) => {
        console.log(response)
        alert('TODO 리스트 추가 완료!')
        setTitle('');
        setTargetDate('');
        navigate('/')   //TODO 투두리스트로 수정할것
    }).catch((error) => {
        alert('오류 발생!')
        console.log(error)
    })
  }

  useEffect(() => {
  }, [title, createdDate])

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
            value={createdDate} 
            type="date" 
            onChange={e => setTargetDate(e.target.value)} 
            className="form-control">
          </input>
        </div>
        <button className="btn btn-primary">TODO 추가</button>
      </form>
    </div>
	)
}

export default AddTodo;