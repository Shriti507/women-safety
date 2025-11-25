import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import * as SMS from 'expo-sms'; 
import SOS from './SOSCard'; 

const Help=() => {
  const sendSmsAlert=async () => {
    const isAvailable=await SMS.isAvailableAsync();

    if (isAvailable) {
      const emergencyContacts = ['9876543210', '1234567890']; 
      const message = "SOS! I need help. This is an emergency.";

      const { result }=await SMS.sendSMSAsync(
        emergencyContacts,
        message
      );

      if (result === 'sent') {
        console.log("Message sent");
      } else {
        console.log("Message cancelled");
      }
    } else {
      Alert.alert("Error", "SMS service is not available on this device.");
    }
  }

  
  return (
    <View style={styles.container}>
      <SOS onPress={sendSmsAlert} />
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