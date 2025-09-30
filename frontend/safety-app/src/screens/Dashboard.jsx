import { StyleSheet, Text, View,AppState,TouchableOpacity } from 'react-native'
import React,{useEffect,useRef} from 'react'
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps'
// import Geolocation from 'react-native-geolocation-service'
import * as Location  from 'expo-location'
import {AuthProvider,useAuth} from '../context/AuthContext'
import { useCall} from '../context/CallContext'; 


const Dashboard = () => {
  const {location,setLocation,permissionStatus,setPermissionStatus}=useAuth()
  // console.log('location',location)
  const { triggerFakeCall} = useCall();
  const mapRef=useRef(null)
  // const locationSubscriber = useRef(null);
 
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
    <>

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

    <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => triggerFakeCall('Emergency Contact')}
        >
          <Text style={styles.buttonText}>Trigger Fake Call</Text>
        </TouchableOpacity>
      </View>
 
    </>
  )
}


export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

buttonContainer: {
  position: 'absolute',
  bottom: 40,
  width: '100%',
  alignItems: 'center',
  zIndex: 1,
},
  callButton: {
    width: '80%',
    paddingVertical: 15,
    backgroundColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});


  




      

      

 
