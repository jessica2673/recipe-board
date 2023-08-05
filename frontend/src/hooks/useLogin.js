import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setError(null)

        const response = await fetch('/auth/google' 
            // , {
            // method: 'POST',
            // headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify({ email, password })
            // }
        )
        const json = await response.json()

        if (!response.ok) {
          setError(json.error)
        }
        if (response.ok) {
          // save the user in browser
          localStorage.setItem('user', JSON.stringify(json))

          // update auth context
          dispatch({type: 'LOGIN', payload: json})

        }
    }

    return { login, error }
}