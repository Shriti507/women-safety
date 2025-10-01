import { FlatListComponent, Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Card, Avatar } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';



const emergencyNumbers=[
    { id: '1', title: "112", subtitle: "National Helpline", icon: "shield-alert" },
    { id: '2', title: "108", subtitle: "Ambulance", icon: "ambulance" },
    { id: '3', title: "102", subtitle: "Pregnancy Medic", icon: "human-pregnant" },
    { id: '4', title: "101", subtitle: "Fire Service", icon: "fire-truck" },
    { id: '5', title: "100", subtitle: "Police", icon: "police-badge" },
    { id: '6', title: "1091", subtitle: "Women Helpline", iconSet: "Ionicons", iconName: "woman-sharp" },
    { id: '7', title: "1098", subtitle: "Child Helpline", iconSet: "FontAwesome", iconName: "child" },
    { id: '8', title: "182", subtitle: "Railway Protection", icon: "train" },
    { id: '9', title: "181", subtitle: "Domestic Abuse", icon: "home-account" }
]

const Helpline = () => {
    const handlePress=(number)=>{
        Linking.openURL(`tel:${number}`)
       }
       const renderItem = ({ item }) => (
        <Card 
          style={styles.card}
          onPress={() => handlePress(item.title)}
        >
          <Card.Title
            title={item.title}
            subtitle={item.subtitle}
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubtitle}
            left={(props) => {
                if (item.iconSet === 'Ionicons') {
                            return <Ionicons name={item.iconName} size={24} color="#edafb8" style={{ marginLeft: 8 }} />;
                        } 
                if (item.iconSet === 'FontAwesome') {
                return <FontAwesome name={item.iconName} size={24} color="teal" style={{ marginLeft: 8 }} />;
              }
           
              return (
                <Avatar.Icon 
                  {...props} 
                  icon={item.icon} 
                  style={styles.avatar} 
                />
              );
            }}
            right={(props) => (
            <MaterialCommunityIcons 
              {...props} 
              name="phone" 
              size={28} 
              color="#6a994e" 
              style={{ marginRight: 8 }}
            />
          )}
          />

          
        </Card>
      );

    
  return (
   <>
   {/* <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent} >
    <CardComponent title="112" subtitle="National Helpline"/>
        <CardComponent title="108" subtitle="Ambulance"/>
        <CardComponent title="102" subtitle="Pregnancy Medic"/>
        <CardComponent title="101" subtitle="Fire Service"/>

        <CardComponent title="100" subtitle="Police"/>
        <CardComponent title="1091" subtitle="Women Helpline"/>

        <CardComponent title="1098" subtitle="Child Helpline"/>
        <CardComponent title="182" subtitle="Railway Protection"/>
        <CardComponent title="181" subtitle="Domestic Abuse Helpline"/>
   </ScrollView> */}
   <View style={styles.container}>
    <FlatList
        style={styles.listContent}
        data={emergencyNumbers}
        renderItem={renderItem}
        keyExtractor={item=>item.id}
    />
   </View>

   

    



   </>
  )
}

export default Helpline

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    
      
    },
    listContent: {
      paddingHorizontal: 8,
      paddingVertical: 12,
    
    },
    card: {
      marginHorizontal: 8,
      marginVertical: 6,
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    cardSubtitle: {
      fontSize: 16,
    },
    avatar: {
      backgroundColor: '#219ebc'
    },
  });



