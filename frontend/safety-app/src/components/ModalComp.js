import * as React from 'react';
import { Modal, Portal, Text, Button } from 'react-native-paper';
import { StyleSheet,View } from 'react-native';


const ModalComp = ({ visible, hideModal,handleDelete,onConfirmDelete }) => {
  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10 };

  const handleConfirm = () => {

    onConfirmDelete(handleDelete); 
    
  };

  return (
    <Portal>
    
      {/* <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}> */}
      <Modal visible={visible} onDismiss={hideModal} onConfirmDelete={handleDelete} contentContainerStyle={containerStyle}>
        <Text style={styles.modalText}>
          Are you sure you want to delete your account?
        </Text>
        <View style={styles.buttonContainer}>

        <Button mode="contained" onPress={handleConfirm} style={[styles.button, styles.deleteButton]}>
            Confirm Delete
          </Button>
          <Button mode="outlined" onPress={hideModal} style={[styles.button, styles.cancelButton]}>
            Cancel
          </Button>
        </View>
     </Modal>
    </Portal>
  );
};

export default ModalComp;

// const styles = StyleSheet.create({
//   modalText: {
//     fontSize: 18,
//     marginBottom: 20,
//     lineHeight: 24, 
//   },
//   buttonContainer: {
//     flexDirection: 'row',       
//     justifyContent: 'flex-end',
//     marginTop: 10,
    
//   },
//   button: {
//     marginLeft: 8,
//     backgroundColor:'#669bbc'
//   },
// });

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
    
  },
  deleteButton: {
    
    backgroundColor: '#a4161a', 
  },
  cancelButton: {
   
    backgroundColor: 'transparent',
    borderColor: '#669bbc',
    borderWidth: 1,
    color: '#669bbc',
  }
});