import 'react-native-gesture-handler';
import React from 'react'
import { View, Text, Image, TouchableOpacity,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomDrawer from './Screens/CustomDrawer'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerNavigation from './Screens/DrawerNavigation';
import Login from './Screens/Login';
import { COLOURS } from './Database/database';
import firebase from "firebase/app";
import "firebase/auth";
const Drawer = createDrawerNavigator();

export default function App({navigation}) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          swipeEnabled: true,
          drawerLockMode: 'locked-open',
          drawerActiveBackgroundColor: COLOURS.brown,
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: {
            marginLeft: -10,
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
          },
        }}>
        <Drawer.Screen
          name="Home"
          component={DrawerNavigation}
          options={{
            drawerIcon: ({ color }) => (
              <Image source={require('./Bold/home.png')} style={{ height: 20, width: 20 }} tintColor={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={About}
          options={{
            drawerIcon: ({ color }) => (
              <Image source={require('./Bold/user.png')} style={{ height: 20, width: 20 }} tintColor={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Messages"
          component={Service}
          options={{
            drawerIcon: ({ color }) => (
              <Image source={require('./Bold/envelope.png')} style={{ height: 20, width: 20 }} tintColor={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Notification"
          component={Featured}
          options={{
            drawerIcon: ({ color }) => (
              <Image source={require('./Bold/bell.png')} style={{ height: 20, width: 20 }} tintColor={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Portfolio"
          component={Portfolio}
          options={{
            drawerIcon: ({ color }) => (
              <Image source={require('./Bold/image.png')} style={{ height: 20, width: 20 }} tintColor={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="Term"
          component={Terms}
          options={{
            drawerIcon: ({ color }) => (
              <Image source={require('./Bold/shopping-basket.png')} style={{ height: 20, width: 20 }} tintColor={color} />
            ),
          }}
        />
     
      </Drawer.Navigator>

    </NavigationContainer>
  )
}
const About = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>profile</Text>
      </View>
    </SafeAreaView>
  )
}


const Service = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Service</Text>
      </View>
    </SafeAreaView>
  )
}


const Featured = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Featured</Text>
      </View>
    </SafeAreaView>
  )
}

const Portfolio = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Portfoilio</Text>
      </View>
    </SafeAreaView>
  )
}

const Terms = () => {
  return (
    <TouchableOpacity style={{ paddingVertical: 15 }}>
      <Text>Portfoilio</Text>
    </TouchableOpacity>
  )
}


