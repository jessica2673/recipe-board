import React from "react";
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <Link to="/"><h1>Let It Cook</h1></Link>
            <ul id="nav-options">
                <li><Link to="/">Recipes</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/create">Create New Recipe</Link></li>
                {/* <% if (!user) { %> */}
                    <li><Link to="/auth/login">Login</Link></li>
                {/* <% } else { %> */}
                    <Link to="/profile" ><img id="nav-img" src="<%= user.thumbnail %>" alt="image"/></Link>
                    <li><Link to="/auth/logout">Logout</Link></li>
                {/* <% } %> */}
            </ul>
        </nav>
    )
}
export default Nav;