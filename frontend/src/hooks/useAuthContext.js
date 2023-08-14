import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
// import { parse } from 'node-html-parser';
// parse = require('node-html-parser');
// let AuthContext = require('../contexts/AuthContext')

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used within an AuthContext Provider')
    }

    return context
}
