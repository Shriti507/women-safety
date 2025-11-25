import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { supabase } from '../../utils/supabaseClient'; 

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false); 
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
 
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("No user logged in!");
        setLoading(false);
        return;
      }

      console.log("Fetching contacts for User ID:", user.id);

      const { data, error } = await supabase
        .from('emergency_contacts')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error("Supabase Fetch Error:", error.message);
        throw error;
      }
      
      console.log("Contacts fetched:", data);
      setContacts(data);
    } catch (error) {
      Alert.alert('Error Fetching', error.message);
    } finally {
      setLoading(false);
    }
  };

  const addContact = async () => {
    if (!name || !phone || !email) {
      Alert.alert('Missing Fields', 'Please fill in Name, Phone, and Email.');
      return;
    }

    try {
      setAdding(true); 
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        Alert.alert("Error", "You must be logged in to add contacts.");
        return;
      }

      console.log("Adding contact for:", user.id);

      const { error } = await supabase
        .from('emergency_contacts')
        .insert([{ 
          user_id: user.id,
          name, 
          phone, 
          email 
        }]);

      if (error) {
        console.error("Supabase Insert Error:", error.message);
        throw error;
      }
      setName('');
      setPhone('');
      setEmail('');
      await fetchContacts();
      Alert.alert('Success', 'Contact added successfully!');

    } catch (error) {
      Alert.alert('Save Error', error.message);
    } finally {
      setAdding(false);
    }
  };

  const deleteContact = async (id) => {
    try {
      const { error } = await supabase
        .from('emergency_contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchContacts(); 

    } catch (error) {
      Alert.alert('Delete Error', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactCard}>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactDetails}>📞 {item.phone}</Text>
        <Text style={styles.contactDetails}>✉️ {item.email}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteContact(item.id)} style={styles.deleteBtn}>
        <Feather name="trash-2" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trusted Contacts</Text>
      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Name (e.g. Mom)" 
          value={name} 
          onChangeText={setName} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Phone Number" 
          keyboardType="phone-pad"
          value={phone} 
          onChangeText={setPhone} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Email Address" 
          keyboardType="email-address"
          autoCapitalize="none"
          value={email} 
          onChangeText={setEmail} 
        />
        
        <TouchableOpacity style={styles.addBtn} onPress={addContact} disabled={adding}>
          {adding ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.addBtnText}>+ Add Contact</Text>
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.subHeader}>Your List</Text>
      {loading ? (
        <ActivityIndicator color="#007AFF" style={{marginTop: 20}} />
      ) : (
        <FlatList 
          data={contacts} 
          keyExtractor={(item) => item.id} 
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No contacts added yet.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f8f9fa' 
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  subHeader: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginTop: 20, 
    marginBottom: 10 
  },
  form: { 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 10, 
    elevation: 3 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 10, 
    borderRadius: 8, 
    marginBottom: 10 
  },
  addBtn: { 
    backgroundColor: '#007AFF', 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  addBtnText: { 
    color: 'white', 
    fontWeight: 'bold' 
  },
  contactCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10, 
    elevation: 2 
  },
  contactInfo: { 
    flex: 1 
  },
  contactName: { 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  contactDetails: { 
    color: '#666', 
    fontSize: 14 
  },
  emptyText: { 
    textAlign: 'center', 
    color: '#999', 
    marginTop: 20 },
});