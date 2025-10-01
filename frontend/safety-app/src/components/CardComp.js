import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from 'react-native';

const CardComp = ({title,onPress}) => (
  <Card style={styles.container} onPress={onPress}>
   
    <Card.Content>
        <AntDesign name="user-delete" size={30} color="black" style={styles.icon}/>
        <Text variant="titleMedium">{title}</Text>
      
    </Card.Content>
  
   
  </Card>
);

export default CardComp;

const styles=StyleSheet.create({
    container:{
        width:150,
        height:150,
        margin:20,
        backgroundColor:'#bfdbf7'

    },
    icon:{
        padding:10
    },
    
})