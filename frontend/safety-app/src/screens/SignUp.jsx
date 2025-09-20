import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, StatusBar, SafeAreaViewBase,Image } from 'react-native'
import React from 'react'
import {useNavigation } from '@react-navigation/native';


const SignUp = () => {
    const navigation=useNavigation()
  const handleLogin=()=>{
    navigation.navigate("Login")

  }
  return (
    <>
      <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
        <Image style={styles.image} source={require('../assets/login.jpeg')}/>
        <Text style={styles.title}>Create Account</Text>
        <View style={styles.row}>
            <Text style={styles.subtitle}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
                <Text style={[styles.subtitle,styles.loginLink]}>Login</Text>
            </TouchableOpacity>

        </View>
        

        <View style={styles.inputWrapper}>
          {/* <Text style={styles.label}>Username</Text> */}
          <TextInput placeholder="Enter Your Name" style={styles.input}></TextInput>

          {/* <Text style={styles.label}>Email</Text> */}
          <TextInput placeholder="Enter Email" style={styles.input}></TextInput>
        

        
          {/* <Text style={styles.label}>Password</Text> */}
          <TextInput placeholder="Enter Password" style={styles.input}></TextInput>

          {/* <Text style={styles.label}>Mobile</Text> */}
          <TextInput placeholder="Enter Mobile" style={styles.input}></TextInput>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        
        

        

        {/* <View>
          <Text>Already have </Text>
        </View> */}
        
        
      </View>
    </>
    
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', 
    paddingHorizontal: 20, 
  },
  image:{
    width:210,
    height:210,
    margin:1
    

  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e1e1e', 
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666', 
    marginBottom: 34, 
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: '#f7f8fa',
    borderRadius: 30,
    elevation:20,
    shadowColor:'#000',
    shadowOffset:{width: 0,height: 2 },
    shadowOpacity:0.25,
    shadowRadius:3.84,
    paddingHorizontal: 15,
    fontSize: 16,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    margin:10
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 10,
    
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink:{
    textDecorationLine: "underline",
    // color:"#007bff", 
    fontWeight:"400",
  },
  row:{
    flexDirection:"row", 
    justifyContent:"center",
    alignItems:"center",
    marginTop:8,
  }
});







