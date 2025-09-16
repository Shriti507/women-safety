import { StyleSheet, Text, View, TouchableOpacity,Image} from 'react-native'
import React from 'react'



const Home = () => {
  return (
    <>

      <Image style={styles.image} source={require('../assets/home.png')}/>
      <View style={styles.separator}/>
      <View style={styles.container}>

        <Text style={styles.title}>HELLO !</Text>
        <Text style={styles.subtitle}>Welcome to your safety companion, which makes navigating your world safer and simpler.</Text>
    

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        
      </View>
    </>
    
    

  )
}

export default Home

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1, 
    alignItems: 'center',
    paddingHorizontal: 30, 
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e1e1e', 
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666', 
    textAlign: 'center',
    marginBottom: 30, 
  },
  image:{
    width:360,
    height:360,
    marginRight:10,
    marginTop:30

  },
  separator: {
    height: 1, 
    width: '80%', 
    backgroundColor: '#CED0CE', 
    marginVertical: 30,  
    marginLeft:34
  },

  button: {
    width: '60%',
    paddingVertical: 15,
    marginHorizontal:'auto',
    backgroundColor: 'teal', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30, 
    shadowColor: '#007AFF', 
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10, 
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
})
