import React from "react";
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <div>
            {/* <%#- include('./partials/header.ejs') %> */}
            <Link rel="stylesheet" to="/css/style.css"/>
            <body>
                {/* <%- include("./partials/nav.ejs") %> */}
                <div class="profile">
                    <header>
                        {/* <h1>Welcome to your account, <%= user.username %> </h1> */}
                    </header>
                    <div class="profile-info">
                        <img class="pfp" src="<%= user.thumbnail %>" alt="image"/>
                        {/* <p class="moreInfo"><%= user.moreInfo %></p> */}
                    </div>
                </div>
                {/* <%- include('./partials/footer.ejs') %> */}
            </body>
        </div>
    )
}

export default Profile;