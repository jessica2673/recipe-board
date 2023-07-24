import React from "react";
import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';

const Nav = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api')
            const json = await response.json()
            if (response.ok) {
                setUser(json)
            }
        }

        fetchUser()
    }, [])

    return (
        <nav>
            <Link to="/"><h1>Let It Cook</h1></Link>
            <ul id="nav-options">
                <li><Link to="/">Recipes</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/create">Create New Recipe</Link></li>
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