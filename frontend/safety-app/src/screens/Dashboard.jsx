import { StyleSheet, Text, View } from 'react-native'
import React from 'react'



const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
      {/* <DrawerNavigator/> */}
      {/* <Drawer/> */}
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white', 
      paddingHorizontal: 20, 
    }
})


// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Text,
//   Dimensions,
//   Image,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import * as Location from "expo-location";
// import MapView, { Marker } from "react-native-maps";

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

// const Dashboard = () => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [initialRegion, setInitialRegion] = useState(null);

//   useEffect(() => {
//     const getLocation = async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setCurrentLocation(location.coords);

//       setInitialRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.005,
//         longitudeDelta: 0.005,
// //       });
// //     };

// //     getLocation();
// //   }, []);

// //   return (
// //     <View style={styles.container}>
// //       {initialRegion && (
// //         <MapView style={styles.map} initialRegion={initialRegion}>
// //           {currentLocation && (
// //             <Marker
// //               coordinate={{
// //                 latitude: currentLocation.latitude,
// //                 longitude: currentLocation.longitude,
// //               }}
// //               title="Your Location"
// //             />
// //           )}
// //         </MapView>
// //       )}
// //       {/* Rest of your code */}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   map: {
// //     width: "100%",
// //     height: "100%",
// //   },
// // });

// // export default Dashboard


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import * as Location from 'expo-location';

// const Dashboard = () => {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [initialRegion, setInitialRegion] = useState(null);

//   useEffect(() => {
//     let subscriber;

//     const startWatching = async () => {
//       // Request permission
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       // Start watching the user's position
//       subscriber = await Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.High,
//           timeInterval: 2000, // Update every 2 seconds
//           distanceInterval: 10, // Update every 10 meters
//         },
//         (loc) => {
//           const { latitude, longitude } = loc.coords;
//           const newLocation = { latitude, longitude };
//           setLocation(newLocation);

//           // Set the initial region only once
//           if (!initialRegion) {
//             setInitialRegion({
//               latitude,
//               longitude,
//               latitudeDelta: 0.02, // Zoom level
//               longitudeDelta: 0.02, // Zoom level
//             });
//           }
//         }
//       );
//     };

//     startWatching();

//     // Cleanup: stop watching when the component unmounts
//     return () => {
//       if (subscriber) {
//         subscriber.remove();
//       }
//     };
//   }, [initialRegion]); // Rerun effect if initialRegion changes (it won't, but it's a dependency)

//   if (errorMsg) {
//     return (
//       <View style={styles.centered}>
//         <Text>{errorMsg}</Text>
//       </View>
//     );
//   }

//   if (!initialRegion) {
//     return (
//       <View style={styles.centered}>
//         <Text>Acquiring location...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={initialRegion}
//         showsUserLocation // Shows the default blue dot for the user's location
//       >
//         {location && (
//           <Marker
//             coordinate={location}
//             title="You are here"
//           />
//         )}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Dashboard;