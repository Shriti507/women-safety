import React,{createContext,useContext,useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


//create context
const AuthContext = createContext(null)


//create provide component
export const AuthProvider=({children})=>{
    const [user,setUser]=useState("hello")
    const [isLoading,setIsLoading]=useState(true)
    // const [latitude,setLatitude]=useState()
    // const [longitude,setLongitude]=useState()
    const [location,setLocation]=useState()

    useEffect(()=>{
        const checkLogIn=async()=>{
            try{
                // get item from the async storage if present
                const getUser=await AsyncStorage.getItem('user')

                if (getUser){
                    const userData=JSON.parse(getUser)
                    setUser(userData)
                }

            }
            catch(err){
                console.log("Failed to load the user data.")
            }
            finally{
                setIsLoading(false)
            }
        }
        checkLogIn()
    },[])



    const login=async (userData)=>{
        try{
            setUser(userData)
            
            // store data in the async storage
            await AsyncStorage.setItem('user',JSON.stringify(userData))
        }
        catch(err){
            console.log("Failed to save data")
        }

    }

    const logout=async ()=>{
        try{
            // clear the user 
            setUser(null)
            await AsyncStorage.removeItem('user')
        }
        catch(err){
            console.log("Failed to remove the data")
        }
    }


    return (
        <AuthContext.Provider value={{user,isLoading,setIsLoading,setUser,login,logout,location,setLocation}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth=()=>{
    return useContext(AuthContext);
}

