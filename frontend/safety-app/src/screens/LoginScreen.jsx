import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, StatusBar, SafeAreaViewBase,Image } from 'react-native'
import React from 'react'
import {useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';





const LoginScreen = () => {
  const navigation=useNavigation()

  const {signIn}=useAuth()
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  
  const handleSignIn = () => {
    signIn(email, password)
    navigation.navigate("Dashboard")
  }
  
  const handleSignUp=()=>{
    navigation.navigate("SignUp")

  }
  
  return (
    <>
      <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
        <Image style={styles.image} source={require('../assets/login.jpeg')}/>
        <Text style={styles.title}>Welcome To Suraksha</Text>
        <Text  style={styles.subtitle}>Please Sign In To Continue</Text>

        {/* Email */}
      <View style={styles.inputWrapper}>
        <MaterialIcons name="email" size={22} color="#555" style={styles.icon} />
        <TextInput placeholder="Enter Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={styles.input} />
      </View>

      {/* Password */}
      <View style={styles.inputWrapper}>
        <MaterialIcons name="lock" size={22} color="#555" style={styles.icon} />
        <TextInput placeholder="Enter Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
      </View>


      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
        
        <View style={styles.row}>
        <Text style={styles.subtitle}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={[styles.subtitle,styles.loginLink]}>Create</Text>
          </TouchableOpacity>
        </View>

       
          
        

        {/* <View>
          <Text>Already have </Text>
        </View> */}
        
        
      </View>
    </>
    
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', 
    paddingHorizontal: 20, 
  },
  image:{
    width:260,
    height:260,
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
    // width: '100%',
    // marginBottom: 20,
    
    flexDirection: 'row', 
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#f7f8fa',
    borderRadius: 30,
    elevation: 5,
    shadowColor:'#000',
    shadowOffset:{width: 0,height: 2 },
    shadowOpacity:0.25,
    shadowRadius:3.84,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 15,
    

  
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    
    fontSize: 16,
    margin:10
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 8,
    
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
    marginTop:10,
  },
  icon:{
    marginRight:10

  },

});






