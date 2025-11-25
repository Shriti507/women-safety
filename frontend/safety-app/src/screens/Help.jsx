import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import * as SMS from 'expo-sms';
import * as Location from 'expo-location';
import { Feather } from '@expo/vector-icons';
import SOSCard from '../components/SOSCard';
import ContactCard from '../components/ContactCard';
import { useNavigation } from '@react-navigation/native';

const Help=() => {
  const navigation = useNavigation();
  const [loading, setLoading]=useState(false);
  const [isTracking, setIsTracking]=useState(false);
  const locationSubscription=useRef(null)
  useEffect(() => {
    (async () => {
      let { status }=await Location.requestForegroundPermissionsAsync();
      if (status!=='granted') {
        Alert.alert('Permission Denied', 'Allow location access to use SOS features.');
      }
    })
    ()
    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    }
  }, [])

  

  const sendSmsAlert=async () => {
    setLoading(true)
    try{

      const isAvailable=await SMS.isAvailableAsync();
      if (!isAvailable){
        Alert.alert("Error", "SMS service is not available on this device.")
        setLoading(false)
       

      }
      else{
        let currentLocation=await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High
        })

      const { latitude, longitude } = currentLocation.coords
      const mapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
      const emergencyContacts = ['9876543210', '1234567890']; 
      const message = `SOS! I need help. This is an emergency. \n\nMy current location: ${mapLink} `;
      const { result }=await SMS.sendSMSAsync(
        emergencyContacts,
        message
      );
        
      if (result === 'sent') {
              console.log("Message sent");
      } else {
            console.log("Message cancelled");
        }
          } 
    }
    
    catch(error){
      Alert.alert("Location Error", "Could not fetch location. Ensure GPS is on.")
      console.log(error)
    } 
    finally {
      setLoading(false)
    }
  }

  const toggleTracking = async () => {
    if (isTracking) {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
      setIsTracking(false);
      Alert.alert("Tracking Stopped");
    } else {
      setIsTracking(true);
      Alert.alert("Tracking Started", "Your location is being monitored locally.");
      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, 
          distanceInterval: 10, 
        },
        (newLocation) => {
          const { latitude, longitude } = newLocation.coords;
          console.log("New Live Coords:", latitude, longitude);
          
          
        }
      );
    }
  };

  
  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Emergency Help</Text>

      
      <View style={styles.section}>
         <SOSCard onPress={sendSmsAlert} />
      </View>

     
      <View style={styles.section}>
         <ContactCard onPress={() => navigation.navigate('Contacts')} />
      </View>

     

    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    padding: 20,
  },
})

export default Help