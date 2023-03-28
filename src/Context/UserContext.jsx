import { createContext ,useState} from 'react';

/**
 * Context to store 'user' 
 * @returns {user={name,email,access_token},  ()=>setUser()}
 */
const UserContext=createContext({name:null,email:null,access_token:null})


export function UserContextProvider({children}){
    const [user, setUser] = useState()
    const userContextValue={user,setUser}

    return(
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    )
}

export default  UserContext