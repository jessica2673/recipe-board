import { Link } from 'react-router-dom';
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
    const { dispatch } = useAuthContext();

    const fetchAuthUser = async () => {
        const response = await axios
        .get("http://localhost:4000/auth/user", { withCredentials: true })
        .catch((err) => {
            console.log(err);
        });

        if (response && response.data) {
            localStorage.setItem('user', JSON.stringify(response.data))
            await dispatch({type: 'LOGIN', payload: response.data})
        }
    }

    const redirectToGoogleSSO = async () =>{
        let timer = null;
        const loginURL = "http://localhost:4000/auth/google";
        const newWindow = window.open(
            loginURL,
          "_blank",
          "width=500,height=600",
        );
    
        if (newWindow) {
            timer = setInterval(() => {
                if (newWindow.closed) {
                  fetchAuthUser();
                  if (timer) clearInterval(timer);
                }
            }, 500);
        };
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
                <div className="loginLinkExt"><button onClick={redirectToGoogleSSO} className="loginLink">Google+</button></div>
                <div className="loginLinkExt"><button onClick={redirectToGithubSSO} className="loginLink">GitHub</button></div>
            </div>
        </div>
    )
}

export default Login;