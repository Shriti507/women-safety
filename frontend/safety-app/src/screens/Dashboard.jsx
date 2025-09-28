import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps'
// import Geolocation from 'react-native-geolocation-service'


const Dashboard = () => {
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

