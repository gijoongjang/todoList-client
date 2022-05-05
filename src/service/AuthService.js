import axios from "axios";
import { SERVER_URL } from "../config";

const AUTH_TOKEN = "AUTH_TOKEN"

const signup = (username, password, email) => {
    return axios.post(SERVER_URL + '/user/signup', {
        username,
        password,
        email
    })
}

const signin = (username, password) => {
    return axios.post(SERVER_URL + '/user/signin', {
        username,
        password
    })
    .then((response) => {
        console.log(response)
        if(response.data.message === "suceess") {
            localStorage.setItem(AUTH_TOKEN, response.data.token)
        } else {
            console.log(response.data.message);
        }
    })
}

const logout = () => {
    localStorage.removeItem(AUTH_TOKEN)
    window.location.href = "/"
}

const AuthService = {
    signup,
    signin,
    logout
}

export default AuthService;