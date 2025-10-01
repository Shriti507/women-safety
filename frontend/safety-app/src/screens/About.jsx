import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons'; 




const About = () => {
  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        
        <ImageBackground source={require('../assets/Empowering.png')} style={styles.heroImage} imageStyle={{ opacity: 0.6 }}>
          <Text style={styles.heroTitle}>Empowering Your Journey.</Text>
          <Text style={styles.heroSubtitle}>Your safety, reimagined.</Text>
        </ImageBackground>

        
        <View style={styles.section}>
          <Feather name="shield" size={32} color="#4A4A4A" />
          <Text style={styles.sectionTitle}>OUR MISSION</Text>
          <Text style={styles.sectionText}>
            To build a world where every woman can move with confidence and without fear. We use technology not just to react, but to proactively build a network of safety and support.
          </Text>
        </View>

        <View style={styles.divider} />

       
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HOW WE HELP</Text>
          <View style={styles.featureItem}>
            <Ionicons name="notifications-outline" size={28} color="#FF6347" style={styles.featureIcon} />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Instant Alerts</Text>
              <Text style={styles.featureDescription}>Notify your trusted contacts and emergency services with a single tap.</Text>
            </View>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="location-outline" size={28} color="#FF6347" style={styles.featureIcon} />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Live Safety Sharing</Text>
              <Text style={styles.featureDescription}>Let friends and family follow your journey in real-time for peace of mind.</Text>
            </View>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="people-outline" size={28} color="#FF6347" style={styles.featureIcon} />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Your Safety Network</Text>
              <Text style={styles.featureDescription}>Build a reliable circle of protectors who are there for you when you need them.</Text>
            </View>
          </View>
        </View>

        
        <View style={[styles.section, styles.storySection]}>
          <Text style={styles.sectionTitle}>OUR STORY</Text>
          <Text style={styles.sectionText}>
            It all started with a simple 'text me when you get home' message. We realized that this daily concern needed a better solution.
          </Text>
          <Text style={[styles.sectionText, { marginTop: 10 }]}>
            So, we brought together a passionate team of developers, safety experts, and advocates to create a tool that is intuitive, reliable, and puts control back into your hands.
          </Text>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>OUR COMMITMENT TO YOU</Text>
           <View style={styles.featureItem}>
            <Ionicons name="lock-closed-outline" size={28} color="#FF6347" style={styles.featureIcon} />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Privacy First</Text>
              <Text style={styles.featureDescription}>Your data is yours. We use state-of-the-art encryption and will never compromise your privacy.</Text>
            </View>
          </View>
           <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle-outline" size={28} color="#FF6347" style={styles.featureIcon} />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Unwavering Reliability</Text>
              <Text style={styles.featureDescription}>Rigorously tested to ensure our app works when it matters most.</Text>
            </View>
          </View>
        </View>

        
        <View style={styles.ctaSection}>
          <Text style={styles.sectionText}>
            Have a question or a story to share? We're here to listen.
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>CONTACT US</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingBottom: 40,
  },
  heroImage: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333', 
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    letterSpacing: 1,
    marginBottom: 15,
    marginTop: 10,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#5f5f5f',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginHorizontal: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 25,
  },
  featureIcon: {
    marginRight: 15,
    marginTop: 2,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  featureDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#5f5f5f',
    marginTop: 4,
  },
  storySection: {
    backgroundColor: '#F7F7F7',
  },
  ctaSection: {
    padding: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  ctaButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default About




