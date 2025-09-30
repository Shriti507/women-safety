import { StyleSheet, Text, View,Modal,TouchableOpacity,SafeAreaView } from 'react-native'
import React,{useEffect,useRef} from 'react';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';


const FakeCallScreen = ({isVisible,callerName,onAccept,onDecline}) => {
    const soundObject=useRef(new Audio.Sound())
    useEffect(() => {
        
        const manageRingtone=async () => {
          try {
            if (isVisible) {
             
              await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
              await soundObject.current.loadAsync(require('../assets/fake_call.mp3'));
              await soundObject.current.setIsLoopingAsync(true);
              await soundObject.current.playAsync();
            } else {
              
              await soundObject.current.stopAsync();
              await soundObject.current.unloadAsync();
            }
          } catch (error) {
            console.error("Error managing ringtone");
          }
        };
    
        manageRingtone();
    

        return () => {
          soundObject.current.unloadAsync();
        };
      }, [isVisible]);
    
      return (
        <Modal visible={isVisible} animationType="fade">
          <SafeAreaView style={styles.container}>
            <View style={styles.callerInfo}>
              <Text style={styles.callerName}>Dad</Text>
              <Text style={styles.callStatus}>calling...</Text>
            </View>
    
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onDecline} style={styles.buttonWrapper}>
                <View style={[styles.button, styles.declineButton]}>
                  <Ionicons name="close" size={40} color="white" />
                </View>
                <Text style={styles.buttonText}>Decline</Text>
              </TouchableOpacity>
    
              <TouchableOpacity onPress={onAccept} style={styles.buttonWrapper}>
                <View style={[styles.button, styles.acceptButton]}>
                  <Ionicons name="call" size={35} color="white" />
                </View>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      );
    }
    
    

export default FakeCallScreen


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1c1c1e',
      justifyContent: 'space-between',
      paddingVertical: 80,
      alignItems: 'center',
    },
    callerInfo: {
      alignItems: 'center',
      marginTop: 50,
    },
    callerName: {
      color: 'white',
      fontSize: 36,
      fontWeight: '500',
    },
    callStatus: {
      color: '#a8a8a8',
      fontSize: 20,
      marginTop: 10,
    },
    buttonContainer: {
      width: '80%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    buttonWrapper: {
      alignItems: 'center',
    },
    button: {
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    declineButton: {
      backgroundColor: '#ff3b30', // Red
    },
    acceptButton: {
      backgroundColor: '#4cd964', // Green
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });



  