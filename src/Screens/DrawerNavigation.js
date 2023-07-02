
/**
 * Sample React Native App
 * https:/github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductInfo from './ProductInfo';
import BottomNavigation from './BottomNavigation'
import Mycart from './Mycart';
import MapHere from './MapHere';
import OnBoard from './OnBoard';
import Login from './Login';
import SignUp from './SignUp';
import firebase from "firebase/app";
import "firebase/auth";
import CustomDrawer from './CustomDrawer';

const DrawerNavigation = () => {
  const Stack = createNativeStackNavigator();

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const firebaseConfig = {
    apiKey: "AIzaSyBJAzxigg-Idv598KWQMlD7D5ljZ839KSE",
    authDomain: "jeans-d6be8.firebaseapp.com",
    projectId: "jeans-d6be8",
    storageBucket: "jeans-d6be8.appspot.com",
    messagingSenderId: "404477934336",
    appId: "1:404477934336:web:1cf5628648b691f1fe51e5"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <>
      {isLoggedIn ? <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='BottomNavigation' component={BottomNavigation} />
        <Stack.Screen name='ProductInfo' component={ProductInfo} />
        <Stack.Screen name='Mycart' component={Mycart} />
        <Stack.Screen name='MapHere' component={MapHere} />
      </Stack.Navigator> :
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name='OnBoard' component={OnBoard} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='CustomDrawer' component={CustomDrawer} />
        </Stack.Navigator>}
    </>

  );
};
export default DrawerNavigation;