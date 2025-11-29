import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, StatusBar, SafeAreaViewBase,Image,ActivityIndicator,Alert } from 'react-native'
import React,{useState} from 'react'
import {useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';


const SignUp = () => {
  const navigation=useNavigation()
  const { register }=useAuth()

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [mobile,setMobile] = useState('')
  const [isSubmitting,setIsSubmitting] = useState(false)

  const handleLogin = () => {
    navigation.navigate("Login");
  }

  const handleSignUp = async () => {
    if (!name||!email ||!password || !mobile) {
      Alert.alert("Error", "Please fill in all fields");
      return
    }

    setIsSubmitting(true)

    try {
      await register(email, password, name, mobile)
      Alert.alert(
        "Success", 
        "Account created! Please check your email to confirm.",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      )
    } catch(error) {
      Alert.alert("Registration Failed", error.message)
    } finally {
      setIsSubmitting(false)
    }
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
                <Text style={[styles.subtitle, styles.loginLink]}>Login</Text>
            </TouchableOpacity>
        </View>
        
        {/* Name Input */}
        <View style={styles.inputWrapper}>
          <MaterialIcons name="person" size={22} color="#555" style={styles.icon} />
          <TextInput 
            placeholder="Enter Your Name" 
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <MaterialIcons name="email" size={22} color="#555" style={styles.icon} />
          <TextInput 
            placeholder="Enter Email" 
            style={styles.input} 
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
          
        {/* Password Input */}
        <View style={styles.inputWrapper}>
          <MaterialIcons name="lock" size={22} color="#555" style={styles.icon} />
          <TextInput 
            placeholder="Enter Password" 
            style={styles.input} 
            secureTextEntry 
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Mobile Input */}
        <View style={styles.inputWrapper}>
          <MaterialIcons name="phone" size={22} color="#555" style={styles.icon} />
          <TextInput 
            placeholder="Enter Mobile" 
            style={styles.input}
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        {/* Button handles SignUp */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSignUp}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) 
          : 
          (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>
        
      </View>
    </>
  );
};

export default SignUp;

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
    // width: '100%',
    // marginBottom: 20,
    
    flexDirection: 'row', 
    alignItems: 'center',
    width: '100%',
    // height: 50,
    paddingVertical: 12,
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
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
   
    // margin:10
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
    
    fontWeight:"400",
  },
  row:{
    flexDirection:"row", 
    justifyContent:"center",
    alignItems:"center",
    marginTop:8,
  },
  icon: {
    marginRight: 10,
  }
    
});