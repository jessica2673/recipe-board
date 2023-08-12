import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null);

    const login = async () => {
        setError(null)
        // const response = await fetch('/auth/google' 
        //     , {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {'Content-Type': 'application/json'},
        //     // body: JSON.stringify({ email, password })
        //     }
        // )
        fetch('/auth/github')
          .then((json) => {
            console.log(json);
          })
          .catch((err) => {
            console.log(err)
          })
        // const json = await response.json();
        // console.log(json);
        // if (!response.ok) {
        //   setError(json.error)
        // }
        // if (response.ok) {
        //   // save the user in browser
        //   localStorage.setItem('user', JSON.stringify(json))

        //   console.log('useLogin.js was called');

        //   // update auth context
        //   dispatch({type: 'LOGIN', payload: json})

        // }
    }

    return { login, error }
}