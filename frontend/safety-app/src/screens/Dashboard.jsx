import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps'
// import Geolocation from 'react-native-geolocation-service'
import * as Location  from 'expo-location'
import {AuthProvider,useAuth} from '../context/AuthContext'


const Dashboard = () => {
  const {location,setLocation}=useAuth()
  useEffect(()=>{
    const getPermissions=async()=>{
      let {status}=await Location.requestForegroundPermissionsAsync()
      if (status!=='granted'){
        console.log("Please grant permissions")
        return 
      }
      let currentLocation=await Location.getCurrentPositionAsync({})
      setLocation(currentLocation)
      // console.log("Location:")
      // console.log(currentLocation)

    }
    getPermissions()
  },[])

  
  
  
  return (
    <View style={styles.container}>
      
      <MapView style={StyleSheet.absoluteFill} provider={PROVIDER_GOOGLE} showsUserLocation showsMyLocationButton/>
      
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white', 
      paddingHorizontal: 20, 
    }
})

