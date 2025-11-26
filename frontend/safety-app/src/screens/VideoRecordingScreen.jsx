import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera'; 
import { Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function VideoRecordingScreen({ navigation }) {
  // Use modern hooks for permissions
  const [cameraPermission, requestCameraPermission]=useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission]=useMicrophonePermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission]=MediaLibrary.usePermissions();

  const [isRecording, setIsRecording] = useState(false);
  const [facing, setFacing] = useState('back');
  
  const cameraRef = useRef(null);
  useEffect(() => {
    (async () => {
      if (!cameraPermission){
       await requestCameraPermission()
      }
        
      if (!microphonePermission){
       await requestMicrophonePermission()
      }
      if (!mediaLibraryPermission){
      await requestMediaLibraryPermission()
      }
        
    })
    ()
  }, [])


  if (!cameraPermission||!microphonePermission) {
   
    return <View style={styles.container}><Text style={{color:'white'}}>Requesting permissions...</Text></View>;
  }

  if (!cameraPermission.granted||!microphonePermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{color:'white'}}>No access to camera or microphone</Text>
        <TouchableOpacity onPress={requestCameraPermission} style={styles.permissionButton}>
           <Text style={styles.permissionText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        const data = await cameraRef.current.recordAsync({
          maxDuration: 120, 
        });
        
        saveVideo(data.uri);
      } catch (error) {
        console.warn(error);
        setIsRecording(false);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const saveVideo = async(uri) => {
    try {
      if (mediaLibraryPermission?.granted) {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('Suraksha Evidence', asset, false);
        Alert.alert("Saved", "Video saved to your gallery.");
      } else {
        Alert.alert("Permission required", "Cannot save video without gallery permission.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not save video.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing} 
        mode="video"    
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
         
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              setFacing(current => (current==='back'?'front':'back'));
            }}>
            <MaterialIcons name="flip-camera-ios" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.recordButton,isRecording?styles.recording:null]}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <View style={styles.innerRecordButton} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={()=>navigation.goBack()}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {isRecording && (
          <View style={styles.recordingIndicator}>
            <View style={styles.redDot} />
            <Text style={styles.recordingText}>Recording...</Text>
          </View>
        )}
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 40,
  },
  iconButton: {
    padding: 10,
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recording: {
    borderColor: 'red',
  },
  innerRecordButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
  },
  recordingIndicator: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 20,
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 5,
  },
  recordingText: {
    color: 'white',
    fontWeight: 'bold',
  },
  permissionButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  permissionText: {
    color: 'white',
    fontSize: 16,
  }
});