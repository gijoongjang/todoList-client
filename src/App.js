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
import AddTodo from "./components/Todo/AddTodo";

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
          <Route exact path="/add" render={(props) => (<AddTodo {...props} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />)} />
        </Routes>
      </div>
    </div>
    {/* <Routes>
      <Route exact path="/" element = {<LandingPage/>}/>
      <Route exact path="/signup" element = {<SignUpPage/>}/>
      <Route exact path="/login" element = {<Login/>}/>
    </Routes>  */}
  </BrowserRouter>
  );
}

export default App;
