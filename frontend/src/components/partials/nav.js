import React from "react";
import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';

const Nav = (user) => {

    return (
        <nav>
            <Link to="/api"><h1>Let It Cook</h1></Link>
            <ul id="nav-options">
                <li><Link to="/api">Recipes</Link></li>
                <li><Link to="/api/about">About</Link></li>
                <li><Link to="/api/create">Create New Recipe</Link></li>
                {(!user) ?
                    <li><Link to="/auth/login">Login</Link></li>
                :
                    <>
                        <Link to="/profile" ><img id="nav-img" src="<%= user.thumbnail %>" alt="image"/></Link>
                        <li><Link to="/auth/logout">Logout</Link></li>
                    </>
                }
            </ul>
        </nav>
    )
}
export default Nav;