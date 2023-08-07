import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from 'react-router-dom';

const Login = () => {
    const {login, error} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login()
    }

    return (
        <div>
            <Link rel="stylesheet" to="/css/style.css"/>
            <div className="login">
                <header>
                    <h1>Login using:</h1>
                </header>
                <div className="loginLinkExt"><button onClick={handleSubmit} className="loginLink">Google+</button></div>
                <div className="loginLinkExt"><a href="/auth/github" className="loginLink">GitHub</a></div>
            </div>
        </div>
    )
}

export default Login;