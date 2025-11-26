import { View, Text, Settings } from 'react-native'
import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import MyProfile from '../screens/MyProfile'
import Setting from '../screens/Settings'
import Help from '../screens/Help'
import { MaterialIcons } from '@expo/vector-icons';
import About from '../screens/About'
import Dashboard from '../screens/Dashboard'
import HelpLine from '../screens/HelpLine';
import Logout from '../screens/Logout';
import ContactsScreen from '../screens/ContactsScreen';
import VideoRecordingScreen from '../screens/VideoRecordingScreen'
import CustomHeader from '../components/CustomHeader'

const Drawer=createDrawerNavigator()
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{
      drawerActiveBackgroundColor:'#caf0f8',
    }}>
    
      <Drawer.Screen name="Dashboard" component={Dashboard} options={{
        drawerItemStyle:{display:'none'},
        headerTitle:(props)=><CustomHeader {...props}/>
      }}/>
      <Drawer.Screen name="MyProfile" component={MyProfile} 
      options={{
        drawerIcon:({color,size})=>(
          
        <MaterialIcons name="person" size={size} color="#82c0cc"/>
      ),
      drawerLabel:({size,focused})=>{
        return <Text style={{color: focused ? 'grey': 'black',fontSize:16}}>{'My Profile'}</Text>
      }
      }}/>

      <Drawer.Screen name="Settings" component={Setting} 
      options={{
        drawerIcon:({color,size})=>(
          
        <MaterialIcons name="settings" size={size} color="#82c0cc"/>
      ),
      drawerLabel:({size,focused})=>{
        return <Text style={{color: focused ? 'grey': 'black',fontSize:16}}>{'Settings'}</Text>
      }
      }}/>

      <Drawer.Screen name="Help" component={Help} 
      options={{drawerIcon:({color,size})=>(
        

        <MaterialIcons name="help" size={size} color="#82c0cc"/>
      ),
      drawerLabel:({size,focused})=>{
        return <Text style={{color: focused ? 'grey': 'black',fontSize:16}}>{'Help'}</Text>
      }
      }}/>
      <Drawer.Screen name="About" component={About} 
      options={{drawerIcon:({color,size})=>(
        
        <MaterialIcons name="people" size={size} color="#82c0cc"/>
      ),
      drawerLabel:({size,focused})=>{
        return <Text style={{color: focused ? 'grey': 'black',fontSize:16}}>{'About Us'}</Text>
      }
      }}/>


<Drawer.Screen name="HelpLine" component={HelpLine} 
      options={{drawerIcon:({color,size})=>(
        
        <MaterialIcons name="book" size={size} color="#82c0cc"/>
      ),
      drawerLabel:({size,focused})=>{
        return <Text style={{color: focused ? 'grey': 'black',fontSize:16}}>{'Helpline'}</Text>
      }
      }}/>

<Drawer.Screen name="Logout" component={Logout} 
      options={{drawerIcon:({color,size})=>(
       
        <MaterialIcons name="logout" size={size} color="#82c0cc"/>
      ),
      drawerLabel:({size,focused})=>{
        return <Text style={{color: focused ? 'grey': 'black',fontSize:16}}>{'Logout'}</Text>
      }
      }}/>

<Drawer.Screen 
        name="Contacts" 
        component={ContactsScreen} 
        options={{
          drawerLabel:()=>null, 
          title:null, 
          drawerIcon:()=>null, 
          drawerItemStyle:{display:'none' } 
        }}
      />

    
<Drawer.Screen 
        name="Video" 
        component={VideoRecordingScreen} 
        options={{
          drawerLabel:()=>null, 
          title:null, 
          drawerIcon:()=>null, 
          drawerItemStyle:{display:'none' } 
        }}
      />
      
    </Drawer.Navigator>
  );
}

export default DrawerNavigator





