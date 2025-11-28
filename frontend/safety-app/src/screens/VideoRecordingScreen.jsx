import React,{useState,useRef,useEffect} from "react"
import {View,Text,Button,StyleSheet} from "react-native"
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
    (async()=>{
      if(!cameraPermission?.granted)await requestCameraPermission()
      if(!microphonePermission?.granted)await requestMicrophonePermission()
    })()
  },[])

  if(!cameraPermission||!microphonePermission){
    return(
      <View style={styles.center}>
        <Text>Requesting permissions...</Text>
      </View>
    )
  }

  if(!cameraPermission.granted){
    return(
      <View style={styles.center}>
        <Text>Camera permission required</Text>
        <Button title="Grant Permission" onPress={requestCameraPermission}/>
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
        <Button title="Save" onPress={saveVideo}/>
        <Button title="Discard" onPress={()=>setVideo(null)}/>
      </View>
    )
  }

  return(
    <CameraView ref={cameraRef} style={styles.container} mode="video" captureAudio={true}>
      <View style={styles.btnBox}>
        <Button
          title={isRecording?"Stop":"Record"}
          onPress={isRecording?stopRecording:startRecording}
        />
      </View>
    </CameraView>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1
  },
  center:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  btnBox:{
    position:"absolute",
    bottom:50,
    alignSelf:"center"
  },
  video:{
    flex:1,
    alignSelf:"stretch"
  }
})
