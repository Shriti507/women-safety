import { View, Text, TextInput, ScrollView, Pressable, StyleSheet, Alert, Image } from 'react-native';
import { useState } from 'react';

const MyProfile = () => {
  const [fullName, setFullName] = useState("Aaradhya Sharma");
  const [email, setEmail] = useState("aaradhya@example.com");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("9876543210");
  const [password, setPassword] = useState("********");
  
  
  const defaultImageUri = "https://cdn-icons-png.flaticon.com/512/706/706830.png";

  const handleAlert = (title, message) => {
    Alert.alert(title, message);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: defaultImageUri }}
          style={styles.avatar}
        />
        
        <Pressable 
          style={styles.editButton} 
          onPress={() => handleAlert("Image uploaded", "Pick the image")}
        >
          <Text style={styles.editIcon}>&#9998;</Text> 
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your name"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter email"
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
          placeholder="Enter phone"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={styles.updateButton} onPress={() => handleAlert("Profile Updated", "Your profile changes have been saved.")}>
          <Text style={styles.updateText}>Save Changes</Text>
        </Pressable>

        <Pressable style={styles.deleteButton} onPress={() => handleAlert("Account Deleted", "Your account would be deleted in the real app.")}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default MyProfile;



const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#E0F2FE", 
    flexGrow: 1,
    alignItems: "center",
  },

  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0284C7",
    marginBottom: 10,
  },

  avatarContainer: {
    width: 130,
    height: 130,
    borderRadius: 65, 
    overflow: "visible", 
    borderWidth: 3,
    borderColor: "#7DD3FC",
    marginBottom: 20,
    shadowColor: "#7DD3FC",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 65,
    resizeMode: "cover",
  },

  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#0284C7',
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35, 
    height: 35, 
  },
  
  editIcon: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    
  },
 

  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#7DD3FC",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },

  label: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: "600",
    color: "#0369A1",
  },

  input: {
    borderBottomWidth: 1.4,
    borderColor: "#7DD3FC",
    paddingVertical: 8,
    marginBottom: 10,
    fontSize: 17,
    color: "#0C4A6E",
  },

  updateButton: {
    backgroundColor: "#0284C7",
    paddingVertical: 15,
    borderRadius: 40,
    alignItems: "center",
    marginTop: 20,
  },

  updateText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },

  deleteButton: {
    backgroundColor: "#0369A1",
    paddingVertical: 15,
    borderRadius: 40,
    alignItems: "center",
    marginTop: 20,
  },

  deleteText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});