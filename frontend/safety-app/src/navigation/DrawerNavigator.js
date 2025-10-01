import { View, Text, Settings } from 'react-native'
import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import MyProfile from '../screens/MyProfile'
import Setting from '../screens/Setting'
import Help from '../screens/Help'
import { MaterialIcons } from '@expo/vector-icons';
import About from '../screens/About'
import Dashboard from '../screens/Dashboard'
import HelpLine from '../screens/HelpLine';

// import CustomDrawer from './CustomDrawer'



const Drawer=createDrawerNavigator()
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{
      drawerActiveBackgroundColor:'#caf0f8',
      // drawerStyle:{
      //   backgroundColor:'#bbd0ff'
      // }
    }}>
    {/* // drawerContent={(props)=><CustomDrawer {...props}/>}> */}
      <Drawer.Screen name="Dashboard" component={Dashboard}/>
      <Drawer.Screen name="MyProfile" component={MyProfile} 
      options={{
        drawerIcon:({color,size})=>(
          // 219ebc
        <MaterialIcons name="person" size={size} color="#82c0cc"/>
      ),
      drawerLabel:({size,focused})=>{
        return <Text style={{color: focused ? 'grey': 'black',fontSize:16}}>{'My Profile'}</Text>
      }
      }}/>

      <Drawer.Screen name="Setting" component={Setting} 
      options={{
        drawerIcon:({color,size})=>(
          // 00b4d8
        <MaterialIcons name="settings" size={size} color="#82c0cc"/>
      ),
      drawerLabel:({size,focused})=>{
        return <Text style={{color: focused ? 'grey': 'black',fontSize:16}}>{'Settings'}</Text>
      }
      }}/>

      <Drawer.Screen name="Help" component={Help} 
      options={{drawerIcon:({color,size})=>(
        // #184e77

        <MaterialIcons name="help" size={size} color="#82c0cc"/>
      ),
      drawerLabel:({size,focused})=>{
        return <Text style={{color: focused ? 'grey': 'black',fontSize:16}}>{'Help'}</Text>
      }
      }}/>
      <Drawer.Screen name="About" component={About} 
      options={{drawerIcon:({color,size})=>(
        // #82c0cc
        <MaterialIcons name="people" size={size} color="#82c0cc"/>
      ),
      drawerLabel:({size,focused})=>{
        return <Text style={{color: focused ? 'grey': 'black',fontSize:16}}>{'About Us'}</Text>
      }
      }}/>


<Drawer.Screen name="HelpLine" component={HelpLine} 
      options={{drawerIcon:({color,size})=>(
        // #82c0cc
        <MaterialIcons name="book" size={size} color="#82c0cc"/>
      ),
      drawerLabel:({size,focused})=>{
        return <Text style={{color: focused ? 'grey': 'black',fontSize:16}}>{'Helpline'}</Text>
      }
      }}/>

      
    </Drawer.Navigator>
  );
}

export default DrawerNavigator





