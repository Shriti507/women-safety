import React,{useState,useRef,useEffect} from "react"
import {View,Text,TouchableOpacity,StyleSheet} from "react-native"
import {CameraView,useCameraPermissions,useMicrophonePermissions} from "expo-camera"
import {Video} from "expo-av"
import * as MediaLibrary from "expo-media-library"

export default function VideoRecordingScreen() {
  const[cameraPermission,requestCameraPermission]=useCameraPermissions()
  const[microphonePermission,requestMicrophonePermission]=useMicrophonePermissions()
  const[mediaPermission]=MediaLibrary.usePermissions()

  const[video,setVideo]=useState(null)
  const[isRecording,setIsRecording]=useState(false)

  const cameraRef=useRef(null)

  useEffect(()=>{
    ;(async()=>{
      if(!cameraPermission?.granted){
        await requestCameraPermission()
      }
      if(!microphonePermission?.granted){
        await requestMicrophonePermission()
      }
      if(!mediaPermission?.granted){
        await MediaLibrary.requestPermissionsAsync()
      }

    })()
  },[])

  if(!cameraPermission||!microphonePermission){
    return(
      <View style={styles.center}>
        <Text style={styles.centerText}>Requesting permissions...</Text>
      </View>
    )
  }

  if(!cameraPermission.granted){
    return(
      <View style={styles.center}>
        <Text style={styles.centerText}>Camera permission required</Text>
        <TouchableOpacity style={styles.controlButton} onPress={requestCameraPermission}>
          <Text style={styles.controlButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const startRecording=async()=>{
    setIsRecording(true)
    const recording=await cameraRef.current.recordAsync({
      quality:"1080p",
      maxDuration:60
    })
    setVideo(recording)
    setIsRecording(false)
  }

  const stopRecording=()=>{
    cameraRef.current.stopRecording()
    setIsRecording(false)
  }

  const saveVideo=async()=>{
    await MediaLibrary.saveToLibraryAsync(video.uri)
    setVideo(null)
  }

  if(video){
    return(
      <View style={styles.container}>
        <Video
          style={styles.video}
          source={{uri:video.uri}}
          useNativeControls
          resizeMode="contain"
        />
        <View style={styles.videoControls}>
          <TouchableOpacity style={styles.controlButton} onPress={saveVideo}>
            <Text style={styles.controlButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlButton, styles.discardButton]} onPress={()=>setVideo(null)}>
            <Text style={styles.controlButtonText}>Discard</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return(
    <CameraView ref={cameraRef} style={styles.container} mode="video" captureAudio={true}>
      <View style={styles.btnBox}>
        <TouchableOpacity onPress={isRecording?stopRecording:startRecording}>
          <Text style={styles.recordButton}>{isRecording?"Stop":"Record"}</Text>
        </TouchableOpacity>
      </View>
    </CameraView>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#000'
  },
  center:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  centerText:{
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20
  },
  btnBox:{
    position:"absolute",
    bottom:50,
    alignSelf:"center",
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 15,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8
  },
  recordButton:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4757'
  },
  video:{
    flex:1,
    alignSelf:"stretch",
    backgroundColor: '#000'
  },
  videoControls:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  controlButton:{
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4
  },
  controlButtonText:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  discardButton:{
    backgroundColor: '#f44336'
  }
})


