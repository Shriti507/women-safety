import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import ModalComp from '../components/ModalComp'
import CardComp from '../components/CardComp.js'
import { PaperProvider } from 'react-native-paper'

const Setting = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const handleDelete=()=>{
    <ModalComp/>

  }
  return (
    <>

    <PaperProvider>
      <View style={styles.container}>
        <CardComp title="Delete Account" onPress={showModal} />
        <ModalComp visible={modalVisible} hideModal={hideModal} />
      </View>
    </PaperProvider>
    </>
   
  )
}

export default Setting


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

  