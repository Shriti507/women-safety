import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import ModalComp from '../components/ModalComp.js'
import CardComp from '../components/CardComp.js'
import { PaperProvider } from 'react-native-paper'
import { supabase } from '../../utils/supabaseClient.js'


const Settings = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const handleDelete=async ()=>{
    // <ModalComp/>
    hideModal()

    const { error }=await supabase.rpc('delete_user')

    if (error) {
      console.error('Error deleting account:', error)
      Alert.alert('Deletion Failed', 'Could not delete account. Check server logs.')
      return
    }

    Alert.alert(
      'Account Deleted',
      'Your account has been permanently removed.',
      [
        
        { text: 'OK',onPress:()=>navigation.navigate('LoginScreen') }
      ]
    );
  };


  return (
    <>

    <PaperProvider>
      <View style={styles.container}>
        <CardComp title="Delete Account" onPress={showModal} />
        <ModalComp visible={modalVisible} hideModal={hideModal} onConfirmDelete={handleDelete}/>
      </View>
    </PaperProvider>
    </>
   
  )
}

export default Settings


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

  