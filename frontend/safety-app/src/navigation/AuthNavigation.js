import React from 'react'
// import 'react-native-gesture-handler';
import LoginScreen from '../screens/LoginScreen'
import Home from '../screens/Home'
import SignUp from '../screens/SignUp'
import Help from '../screens/Help'; 
import ContactsScreen from '../screens/ContactsScreen'; 
import VideoRecording from '../screens/VideoRecordingScreen'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Stack =createNativeStackNavigator()
const AuthNavigation = () => {
  return (
    <>
   
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="Video" component={VideoRecording} />


      </Stack.Navigator>
    
   </>
  )
}

export default AuthNavigation