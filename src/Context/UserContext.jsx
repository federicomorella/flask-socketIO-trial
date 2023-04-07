import { createContext ,useState} from 'react';

/**
 * Context to store 'user' and accessToken
 * @returns {}{setUser,user={username,email,accessToken}}
 */
const UserContext=createContext({})


export function UserContextProvider({children}){
    const [user, setUser] = useState({username:'',email:'',accessToken:''})
    

    const userContextValue={user,setUser}


    return(
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    )
}

export default  UserContext