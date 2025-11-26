import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function VideoCard({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconCircle}>
        <Feather name="video" size={32} color="#FF9500" />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Video Recording</Text>
        <Text style={styles.subtitle}>QUICK CAPTURE</Text>
      </View>

      
      {/* <Feather name="chevron-right" size={32} color="rgba(255,255,255,0.6)" /> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007AFF', 
    borderRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    shadowColor: "#FF9500",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  
    elevation: 10,
    marginBottom: 25,
  },
  iconCircle: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 28, 
    fontWeight: '900', 
    letterSpacing: 1,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 5,
  }
});