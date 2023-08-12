import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";

const Nav = () => {
    const {user} = useAuthContext()
    const { dispatch } = useAuthContext();

    const logOutUser = async () => {
        const response = await axios
            .get("http://localhost:4000/auth/logout", { withCredentials: true })
            .catch((err) => {
                console.log(err);
            });
        if (response) {
            console.log(response)
            localStorage.removeItem('user')
            dispatch({type: 'LOGOUT'})
        }
    }

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
                        <li><button onClick={logOutUser}>Logout</button></li>
                    </>
                }
            </ul>
        </nav>
    )
}
export default Nav;