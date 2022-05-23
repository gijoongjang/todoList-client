import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import Login from "./components/LoginPage/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Logout from "./components/LoginPage/LogoutPage";
import TodoList from "./components/Todo/TodoList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('AUTH_TOKEN') != null) {
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <BrowserRouter>
    <div className="App">
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <div>
        <Routes>
          <Route exact path="/" element = {<LandingPage/>} />
          <Route exact path="/signin" element = {<Login/>} />
          <Route exact path="/signup" element = {<SignUpPage/>} />
          <Route exact path="/logout" element = {<Logout/>} />
          <Route exact path="/todoList" element={<TodoList isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
  );
}

export default App;
