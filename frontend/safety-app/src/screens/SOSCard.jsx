import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function SOSCard({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconCircle}>
        <Feather name="bell" size={32} color="#FF3B30" />
      </View>
      <View style={styles.content}>
        <Text style={styles.sosTitle}>SOS</Text>
        <Text style={styles.sosSubtitle}>PRESS FOR EMERGENCY</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF3B30', 
    borderRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: "#FF3B30",
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
  sosTitle: {
    color: 'white',
    fontSize: 26,
    fontWeight: '900', 
    letterSpacing: 2,
    lineHeight: 48,
  },
  sosSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 5,
  }
});