import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import ModalComp from '../components/ModalComp.js'
import CardComp from '../components/CardComp.js'
import { PaperProvider } from 'react-native-paper'
import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';



const Help = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  




  return (
    <>

    <PaperProvider>
      <View style={styles.container}>
      <CardComp title="Video Recording" onPress={showModal} />
        
      </View>
    </PaperProvider>
    </>
   
  )
}

export default Help


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

  