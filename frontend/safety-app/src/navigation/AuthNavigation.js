import React from 'react'
// import 'react-native-gesture-handler';
import LoginScreen from '../screens/LoginScreen'
import Home from '../screens/Home'
import SignUp from '../screens/SignUp'
import { createNativeStackNavigator } from '@react-navigation/native-stack'




const Stack =createNativeStackNavigator()
const AuthNavigation = () => {
  return (
    <>
   
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
    


      </Stack.Navigator>
      
    
    
   </>
  )
}

export default AuthNavigation