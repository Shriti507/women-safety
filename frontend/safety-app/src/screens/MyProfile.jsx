import {View,Text,TextInput,ScrollView,Pressable,StyleSheet,Alert,ActivityIndicator} from 'react-native'
import {useState,useEffect} from 'react'
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


const MyProfile = () => {
  // State to hold user data
  const [isLoading, setIsLoading] = useState(true);
  const [fullName, setFullName]=useState("")
  // const [lastName, setLastName]=useState("Jane")
  const [email, setEmail]=useState("")
  const [countryCode, setCountryCode]=useState("+91")
  const [phone, setPhone]=useState("")
  const [password, setPassword]=useState("")


  useEffect(() => {
    fetchProfileData()
  }, [])


  const fetchProfileData = async() =>{
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError ||!user) {
        console.log("No user logged in");
        setIsLoading(false)
        return
      }

      
      
      const { data, error } = await supabase
        .from('profiles') //table name profiles
        .select('*')
        .eq('id', user.id) 
        // .single();
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (data) {
        setFullName(data.full_name || "")
        // setLastName(data.last_name || "")
        setEmail(user.email || "")
        setCountryCode(data.country_code || "+91")
        setPhone(data.phone_number || "")
        // setPassword(data.password); // Only if you actually stored it in the table (Unsafe)
      }

    } catch (error) {
      Alert.alert("Error fetching data", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButton=async ()=>{
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if(!user) return;

      const updates = {
        id: user.id,
        full_name: fullName,
        // last_name: lastName,
        country_code: countryCode,
        phone_number: phone,
        updated_at: new Date(),
      };
      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) throw error;
      Alert.alert("Updated Successfully");
      
    } 
    catch (error) {
      Alert.alert("Update Failed", error.message);
    }
  }


  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#219ebc" />
        <Text style={{marginTop: 10}}>Loading Profile...</Text>
      </View>
    )
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        placeholder="Enter your full name"
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />
{/* 
      <Text style={styles.label}>Last Name</Text>
      <TextInput
        placeholder="Enter your last name"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      /> */}

      
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
  marginBottom:16, 
  // marginTop:5,     
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