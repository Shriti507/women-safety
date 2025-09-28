import 'react-native-gesture-handler'
import React from 'react'
import {View,ActivityIndicator,StyleSheet} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {AuthProvider,useAuth} from './src/context/AuthContext'
import AuthNavigation from './src/navigation/AuthNavigation'
import DrawerNavigator from './src/navigation/DrawerNavigator'

const AppNavigator = () => {
  const {user,isLoading}=useAuth()
  if (isLoading){
    return(
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#219ebc" />
      </View>
    )
  }
  return (
    <NavigationContainer>
      {user?<DrawerNavigator/>:<AuthNavigation/>}
    </NavigationContainer>
  )
}
const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
});

export default App;