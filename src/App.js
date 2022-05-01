import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import LoginPage from "./components/LoginPage/LoginPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element = {<LandingPage/>}/>
      <Route exact path="/signup" element = {<SignUpPage/>}/>
      <Route exact path="/login" element = {<LoginPage/>}/>
    </Routes> 
  </BrowserRouter>
  );
}

export default App;
