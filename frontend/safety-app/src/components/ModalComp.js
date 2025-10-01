import * as React from 'react';
import { Modal, Portal, Text, Button } from 'react-native-paper';
import { StyleSheet,View } from 'react-native';


const ModalComp = ({ visible, hideModal }) => {
  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10 };

  return (
    <Portal>
    
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Text style={styles.modalText}>
          Are you sure you want to delete your account?
        </Text>
        <View style={styles.buttonContainer}>

        <Button mode="contained" onPress={hideModal} style={styles.button}>
          Confirm Delete
        </Button>
        <Button mode="contained" onPress={hideModal} style={styles.button}>
          Cancel
        </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalComp;

const styles = StyleSheet.create({
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    lineHeight: 24, 
  },
  buttonContainer: {
    flexDirection: 'row',       
    justifyContent: 'flex-end',
    marginTop: 10,
    
  },
  button: {
    marginLeft: 8,
    backgroundColor:'#669bbc'
  },
});