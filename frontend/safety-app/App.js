import 'react-native-gesture-handler'
import React from 'react'
import {View,ActivityIndicator,StyleSheet,Alert} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {AuthProvider,useAuth} from './src/context/AuthContext'
import {CallProvider,useCall } from './src/context/CallContext'
import AuthNavigation from './src/navigation/AuthNavigation'
import DrawerNavigator from './src/navigation/DrawerNavigator'
import FakeCallScreen from './src/screens/FakeCallScreen'

const AppNavigator = () => {
  const {user,isLoading}=useAuth()
  const {isCallVisible,callerName,hideFakeCall} = useCall();
  if (isLoading){
    return(
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#219ebc" />
      </View>
    )
  }

  const handleAcceptCall = () => {
    hideFakeCall();
    Alert.alert("Call Accepted", "The call is now active.");
  }

  return (
    <>

    <NavigationContainer>
      {user?<DrawerNavigator/>:<AuthNavigation/>}
    </NavigationContainer>

    <FakeCallScreen
        isVisible={isCallVisible}
        callerName={callerName}
        onAccept={handleAcceptCall}
        onDecline={hideFakeCall}
      /> 
    </>
  )
}
const App = () => {
  return (
    <>
      <AuthProvider>
      <CallProvider>
        <AppNavigator />
      </CallProvider>
    </AuthProvider>
    </>
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








  



     
