import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import {Login} from "../screens/LoginScreen"
import { useAuth } from '../context/AuthContext';

const Logout = () => {
    // const navigation = useNavigation()
    // const [loggedIn, setLoggedIn] = useState(true)
    // const handleLogout = () => {
    //     setLoggedIn(prev => !prev)
    //     console.log("User logged out")
    //     navigation.navigate("Login")
    // }

     

        const { logout } = useAuth(); 
    
        const handleLogout = async () => {
            try {
                await logout(); 

            } catch (e) {
                console.error(e);
            }
        }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                
               
                <View style={styles.iconContainer}>
                    <MaterialIcons name="logout" size={80} color="lightblue" />
                </View>

               
                <Text style={styles.title}>Log Out?</Text>
                <Text style={styles.subtitle}>Are you sure you want to leave?</Text>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Yes, Log Me Out</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.cancelButton} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default Logout

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    iconContainer: {
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 100,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#468faf',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#468faf',
        marginBottom: 40,
        textAlign: 'center',
    },
    logoutButton: {
        width: '100%',
        height: 55,
        backgroundColor: '#468faf', 
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    
        shadowColor: '#468faf',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
       
        elevation: 8,
    },
    logoutText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    cancelButton: {
        width: '100%',
        height: 55,
        backgroundColor: '#f5f5f5',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelText: {
        color: '#468faf',
        fontSize: 16,
        fontWeight: '600',
    }
})
