import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const AppLogo=require('../assets/AppLogo.png'); 
const CustomHeader=() => {
  return (
    <View style={styles.headerContainer}>
      <Image 
        source={AppLogo} 
        style={styles.logo}
      />
      <Text style={styles.title}>Suraksha</Text> 
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0, 
  },
  logo: {
    width: 30, 
    height: 30, 
    marginRight: 8,
    borderRadius: 5, 
  },
  title: {
    fontSize: 22, 
    fontWeight: 'bold',
    color: '#333', 
  },
})

export default CustomHeader