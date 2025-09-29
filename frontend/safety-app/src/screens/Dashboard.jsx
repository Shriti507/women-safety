import { StyleSheet, Text, View,AppState } from 'react-native'
import React,{useEffect,useRef} from 'react'
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps'
// import Geolocation from 'react-native-geolocation-service'
import * as Location  from 'expo-location'
import {AuthProvider,useAuth} from '../context/AuthContext'


const Dashboard = () => {
  const {location,setLocation,permissionStatus,setPermissionStatus}=useAuth()
  // console.log('location',location)
  const mapRef=useRef(null)
 
  useEffect(()=>{
    let subscriber;

    

    //for permissions 
    const getPermissions=async()=>{

      // prevents multiple listeners from running simultaneously.
      if (subscriber) {
        subscriber.remove();
        subscriber = null;
      }


      let {status}=await Location.requestForegroundPermissionsAsync()
      setPermissionStatus(status)
      if (status!=='granted'){
        console.log("Permission to access location was denied.")
        setLocation(null)
        return 
      }

      
      // let currentLocation=await Location.getCurrentPositionAsync({})
      // setLocation(currentLocation)
      // console.log("Location:")
      // console.log(currentLocation)
  
      // if permission is granted then start tracking the user
  
      subscriber=await Location.watchPositionAsync({
        accuracy:Location.Accuracy.High,
        timeInterval:1000,
        distanceInterval:5
  
      },
      (newLocation) => {
        console.log("New location:", newLocation.coords);
        setLocation(newLocation);
      }
    )
    // return subscriber
    }


    getPermissions()


    // getPermissions().then(sub=>{
    //   subscriber=sub
    // })

    //adding appstate listner
    const subscription=AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        
        console.log('App has come to the foreground, re-checking permissions.');
        getPermissions().then(sub => {
          subscriber = sub;
        });
      }
    });

    
    

    //clean up of the function to stop tracking
    return ()=>{
      if (subscriber){
        subscriber.remove()
        console.log("Stopped Location Tracking")
      }
      subscription.remove()
    }
  },[])

  
  
  
  return (
    <View style={styles.container}>
      
      {location ? (<MapView 
      ref={mapRef}
      style={StyleSheet.absoluteFill} 
      provider={PROVIDER_GOOGLE} 
      showsUserLocation 
      showsMyLocationButton
      initialRegion={{
        latitude:location.coords.latitude,
        longitude:location.coords.longitude,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421
      }}
      />) :(
        <Text>Waiting for location permission...</Text>
      )}
      
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







  


      

      

 
