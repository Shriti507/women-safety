import React,{createContext,useContext,useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { supabase } from '../../utils/supabaseClient.js';



const AuthContext = createContext(null)

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)

    const [isLoading,setIsLoading]=useState(true)
    // const [latitude,setLatitude]=useState()
    // const [longitude,setLongitude]=useState()

    const [location,setLocation]=useState()
    const [permissionStatus,setPermissionStatus]=useState(null)
     

    const register = async (email, password, fullName, mobile) => {
        const { data, error } = await supabase.auth.signUp({
        email:email,
        password:password,
        options:{
            data:{
            full_name:fullName,
            phone:mobile, 
            },
        },
        })
    
        if (error) throw error
        return data
    }


  useEffect(() => {
    const checkUser = async () => {
      try {
        // const { data:{session}}=await supabase.auth.getSession()
    //    ask the server for the user
        const { data: { user},error }=await supabase.auth.getUser()

        if (error||!user) {
            console.log("User not found on server, logging out...")
            setUser(null)
        } 
        else {
            setUser(user)
        }
      } 
      catch (error) {
        console.log("Error checking session:", error)
        setUser(null)
      } 
      finally {
        setIsLoading(false)
      }
    }
    
    checkUser()


    const { data:authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      // If the token becomes invalid (because user is deleted), Supabase eventually fires SIGNED_OUT
      if (event==='SIGNED_OUT') {
        setUser(null)
      } 
      else {
        setUser(session?.user|| null)
      }

      setIsLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe();
    }
  }, [])
  



const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error.message);
    setUser(null);
  };


  return (
            <AuthContext.Provider value={{user,isLoading,setIsLoading,setUser,logout,location,setLocation,permissionStatus,setPermissionStatus,login,register}}>
                {children}
            </AuthContext.Provider>
        )

  
   
  
}

export const useAuth = () => useContext(AuthContext);