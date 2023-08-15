import React from "react";
import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {
    const { user } = useAuthContext()

    return (
        <>{ (user) ?
            <div>
                <Link rel="stylesheet" to="/css/style.css"/>
                <div class="profile">
                    <header>
                        <h1>Welcome to your account, {user.username} </h1>
                    </header>
                    <div class="profile-info">
                        <img class="pfp" src={user.thumbnail} alt="image"/>
                        <p class="moreInfo">{user.moreInfo}</p>
                    </div>
                </div>
        </div>
        : <Navigate to='/auth/login' /> }</>
    )
}

export default Profile;