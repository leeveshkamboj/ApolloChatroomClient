import React from 'react'
import { useContext } from 'react'

import { AuthContext } from '../context/auth'

export default function AuthRoute() {
    const {user} = useContext(AuthContext)
    return (
        <div>
            
        </div>
    )
}
