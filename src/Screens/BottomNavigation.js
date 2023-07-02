import { StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity, Image } from 'react-native';
import Bookmark from './Bookmark'
import Entypo from 'react-native-vector-icons/Entypo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useRef } from 'react';
import HomeScreen from './HomeScreen';
import { COLOURS } from '../Database/database';

import Profile from './Profile';

const BottomNavigation = () => {
    const Tab = createBottomTabNavigator();
    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    return (
        <>
            <Tab.Navigator screenOptions={{
                headerShown: false,
                tabBarLabelStyle: { display: 'none' },
                tabBarStyle: {
                    backgroundColor: '#eee',
                    position: 'absolute',
                    /* bottom: 10,
                    marginHorizontal: 15, */
                    paddingBottom: 20,
                    paddingHorizontal: 7,
                    height: 50,
                    shadowColor: '#000',
                    showOpacity: 0.06,
                    shadowOffset: {
                        width: 10,
                        height: 10
                    }
                }
            }}>
                <Tab.Screen name="'HomeScreen" component={HomeScreen} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ position: 'absolute', top: '50%' }}>
                            <Image source={require('../Filled/home.png')} style={{ height: 20, width: 20 }}
                                tintColor={focused ? COLOURS.brown : 'grey'}

                            />
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: 0,
                            useNativeDriver: true
                        }).start();
                    }
                })}
                ></Tab.Screen>
                <Tab.Screen name="About" component={About} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ position: 'absolute', top: '50%' }}>
                            <Image source={require('../Bold/search.png')} style={{ height: 20, width: 20 }}
                                tintColor={focused ? COLOURS.brown : 'grey'}
                            />
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth(),
                            useNativeDriver: true
                        }).start();
                    }
                })}>

                </Tab.Screen>
                {/* Screen with picture start */}
                <Tab.Screen name={"ActionButton"} component={EmptyScreen} options={{
                    tabBarIcon: ({ focused }) => (

                        <TouchableOpacity>
                            <View style={{
                                width: 55,
                                height: 55,
                                backgroundColor: '#795548',
                                borderRadius: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1.5,
                                borderColor: '#fff',
                                marginBottom: Platform.OS == "android" ? 20 : 20
                            }}>
                                <Entypo name='plus'
                                    style={{
                                        color: '#fff',
                                        fontSize: 34,
                                        fontWeight: 'bold',
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    )
                }}></Tab.Screen>
                {/* Serceen with end */}
                <Tab.Screen name="Bookmark" component={Bookmark} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ position: 'absolute', top: '50%' }}>
                            <Image source={require('../Filled/heart.png')} style={{ height: 20, width: 20 }}
                                tintColor={focused ? COLOURS.brown : 'grey'}
                            />
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth() * 3.25,
                            useNativeDriver: true
                        }).start();
                    }
                })}
                ></Tab.Screen>
                <Tab.Screen name="Contact" component={Profile} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ position: 'absolute', top: '50%' }}>
                            <Image source={require('../Filled/user.png')} style={{ height: 20, width: 20 }}
                                tintColor={focused ? COLOURS.brown : 'grey'}
                            />
                        </View>
                    )
                }} listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: getWidth() * 4.3,
                            useNativeDriver: true
                        }).start();
                    }
                })}
                ></Tab.Screen>
            </Tab.Navigator>

            <Animated.View style={{
                width: getWidth() - 20,
                height: 3.5,
                backgroundColor: COLOURS.brown,
                position: 'absolute',
                bottom: 46.5,
                left: 22.5,
                borderRadius: 100,
                transform: [
                    { translateX: tabOffsetValue }
                ]
            }}>
            </Animated.View>
        </>
    )
}

function getWidth() {
    let width = Dimensions.get("window").width
    width = width - 45
    return width / 5
}

const About = () => {
    return (
        <View>
            <Text>About</Text>
        </View>
    )
}


function EmptyScreen() {
    return (
        <View>
        </View>
    );
}

export default BottomNavigation

const styles = StyleSheet.create({

    email: {
        width: '100%',
        textAlign: 'center',
        color: COLOURS.backgroundDark,
        fontFamily: 'Poppins-Medium'

    },
})