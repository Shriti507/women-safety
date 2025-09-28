import {View,Text,TextInput,ScrollView,Pressable,StyleSheet,Alert} from 'react-native'
import {useState} from 'react'


const MyProfile = () => {
  // State to hold user data
  const [firstName, setFirstName]=useState("Jessica")
  const [lastName, setLastName]=useState("Jane")
  const [email, setEmail]=useState("jessica.jane@example.com")
  const [countryCode, setCountryCode]=useState("+91")
  const [phone, setPhone]=useState("1234567890")
  const [password, setPassword]=useState("password123")
  const handleButton=()=>{
    Alert.alert("Updated Successfully");
  }



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        placeholder="Enter your first name"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        placeholder="Enter your last name"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />

      
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter your email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address" 
      />

      
      <Text style={styles.label}>Country Code</Text>
      <TextInput
        placeholder="+91"
        style={styles.input}
        value={countryCode}
        onChangeText={setCountryCode}
        keyboardType="phone-pad"
      />

      
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        placeholder="Enter your phone number"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Enter your password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry //Hide the password text
      />

     
      <Pressable style={styles.button}onPress={handleButton} >
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>

      
      <Pressable
        style={[styles.button, { backgroundColor: "#a4161a", marginTop: 20 }]}
      >
        <Text style={styles.buttonText}>Delete Account</Text>
      </Pressable>
    </ScrollView>
  )
}

export default MyProfile;

const styles = StyleSheet.create({
  container:{
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center", 
    backgroundColor: '#f8f9fa'
  },
  label:{
    fontSize: 16,
    fontWeight: "600",
    marginBottom:5,
    alignSelf: "flex-start", 
    color: "#333"
  },
input:{
  width:"100%",
  borderBottomWidth: 1,
  borderColor:"#888",  
  paddingVertical:8,   
  paddingHorizontal:5,
  marginBottom:20,      
  fontSize: 18,         
},
  button:{
    width:"70%", 
    paddingVertical:15,
    backgroundColor: "#219ebc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:40,
    shadowColor: "#007AFF",
    shadowOffset:{
      width:0,
      height:4
    },
    shadowOpacity:0.3,
    shadowRadius:5,
    elevation:8,
  },
  buttonText:{
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  }
});