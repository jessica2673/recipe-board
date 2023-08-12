import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from 'react-router-dom';
import axios from "axios";

const Login = () => {
    const {login, error} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login()
    }

    const fetchAuthUser = async () => {
        const response = await axios
        .get("http://localhost:4000/auth/user", { withCredentials: true })
        .catch((err) => {
            console.log(err);
        });
        console.log(response)
    }

    const redirectToGithubSSO = async () => {
        let timer = null;
        const loginURL = "http://localhost:4000/auth/github";
        const newWindow = window.open(
            loginURL,
          "_blank",
          "width=500,height=600"
        );
    
        if (newWindow) {
            timer = setInterval(() => {
                if (newWindow.closed) {
                  console.log("Yay we're authenticated");
                  fetchAuthUser();
                  if (timer) clearInterval(timer);
                }
              }, 500);
          };
        }

    return (
        <div>
            <Link rel="stylesheet" to="/css/style.css"/>
            <div className="login">
                <header>
                    <h1>Login using:</h1>
                </header>
                <div className="loginLinkExt"><button onClick={handleSubmit} className="loginLink">Google+</button></div>
                <div className="loginLinkExt"><button onClick={redirectToGithubSSO} className="loginLink">GitHub</button></div>
            </div>
        </div>
    )
}

export default Login;