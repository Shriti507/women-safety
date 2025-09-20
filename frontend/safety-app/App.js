import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from './src/screens/LoginScreen'
import Home from './src/screens/Home'
import SignUp from './src/screens/SignUp'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Stack =createNativeStackNavigator()

const App = () => {
  return (
   <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="SignUp" component={SignUp}/>

      </Stack.Navigator>
      
    </NavigationContainer>
      {/* <Home/> */}
    {/* <LoginScreen/> */}
   </>
     
    
  )
}

export default App


