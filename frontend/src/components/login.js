import React from "react";
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div>
            {/* <%#- include('./partials/header.ejs') %> */}
            <Link rel="stylesheet" to="/css/style.css"/>
            <body>
                {/* <%- include('./partials/nav.ejs') %> */}
                <div class="login">
                    <header>
                        <h1>Login using:</h1>
                    </header>
                    <div class="loginLinkExt"><a href="/auth/google" class="loginLink">Google+</a></div>
                    <div class="loginLinkExt"><a href="/auth/github" class="loginLink">GitHub</a></div>
                </div>
                {/* <%- include('./partials/footer.ejs') %> */}
            </body>
        </div>
    )
}