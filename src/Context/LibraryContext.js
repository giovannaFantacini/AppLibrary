import React, { useState, createContext, useEffect} from "react"

export const LibraryContext = createContext()

export const LibraryProvider = (props) => {
    const [isLogged, setLogged] = useState(false)
    const [libraryId, setLibraryId] = useState(null)
    const [libraryName, setLibraryName] = useState(null)
    const [libraryIdssmv, setLibraryIdssmv] = useState(null)

    async function login(name, id, idssmv) {
        setLogged(true)
        setLibraryName(name)
        setLibraryId(id)
        setLibraryIdssmv(idssmv)
    }

    return (
        <LibraryContext.Provider value={{ isLogged, setLogged, login, libraryId, libraryName, libraryIdssmv }}>
            {props.children}
        </LibraryContext.Provider>
    )

}
