import React, { useState, createContext } from "react"

export const UserContext = createContext()

export const UserProvider = (props) => {

    const [isLogged, setLogged] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null)

    async function login(name, id) {
        setLogged(true)
        setUserName(name)
        setUserId(id)
    }

    return (
        <UserContext.Provider value={{ isLogged, setLogged, login, userId, userName }}>
            {props.children}
        </UserContext.Provider>
    )
}