import React, {useState} from 'react'
import "./SignUp.css"
import {SERVER_URL} from "../../config"
import axios from 'axios'

function SignUpPage() {
  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("")

  const onNameHandler = (event) => {
      setName(event.currentTarget.value)
  }
  const onEmailHandler = (event) => {
      setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value)
  }
 
  const onSubmit = (event) => {
    event.preventDefault()

    if(Name === "") {
        alert('이름을 입력 하세요.') 
        return
    }
    if(Email === "") {
        alert('이메일을 입력 하세요.')
        return
    }
    if(Password === "") {
        alert('비밀번호를 입력 하세요.')  
        return
    } 

    let data = {
        username : Name,
        password : Password,
        email : Email
    }

    axios.post(SERVER_URL + '/user/signup', data)
     .then((Response)=>{
        console.log(Response.data)
        if(Response) {
          alert('회원가입 완료!')
          window.location.reload()
        }
      }) 
     .catch((Error)=>{
       console.log(Error)
      })
  }

  return (
    <div className="signup">
      <form onSubmit={onSubmit}>
          <div><input name="name" type="text" placeholder="이름" value={Name} onChange={onNameHandler} className="signup_input"/></div>
          <div><input name="password" type="password" placeholder="비밀번호" value={Password} onChange={onPasswordHandler} className="signup_input"/></div>
          <div><input name="email" type="email" placeholder="이메일" value={Email} onChange={onEmailHandler} className="signup_input"/></div>
          <div><button type="submit" className="signup_button">회원가입</button></div>
      </form>
    </div>
  );
}

export default SignUpPage;