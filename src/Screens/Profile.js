import { StyleSheet, Text, View ,Image,TouchableOpacity, ImageBackground, StatusBar} from 'react-native'
import React from 'react'
import { COLOURS } from '../Database/database'
import firebase from "firebase/app";
import "firebase/auth";
const Profile = () => {
    return (    
            <>
            <StatusBar backgroundColor={COLOURS.white} barStyle='dark-content' />
            <ImageBackground source={require('../images/soil.jpg')} style={{height:'100%',width:'100%',}} resizeMode='cover'>
                        <View style={{ backgroundColor:' rgba(0,0,0,.1)',height:'100%',  alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: COLOURS.white, fontFamily: 'OpenSans-Bold', fontSize: 20,marginBottom:20 }}>Profile </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../images/login.png')} style={{ height: 100, width: 100, resizeMode: 'contain',marginBottom:30 }} tintColor={COLOURS.brown} />
                </View>
                <TouchableOpacity style={styles.Backbtn} activeOpacity={.6}>
                    <Text style={styles.email}>Password : ******</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Backbtn} activeOpacity={.6}>
                    <Text style={styles.email}>Email : {firebase.auth().currentUser?.email}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Backbuttn} activeOpacity={.6} onPress={()=> firebase.auth().signOut()}>
                        <Text style={styles.buttn} >Log Out</Text>
                </TouchableOpacity>
        </View>
        </ImageBackground>
        </>
    )
}

export default Profile

const styles = StyleSheet.create({
    
    email : {
        color:COLOURS.white    ,
        letterSpacing:1,
        width:'100%',
        marginVertical:5,
    },
    
    Backbuttn: {
        width: '80%',
        color: '#fff',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 30,
        padding: 12,
        textAlign: 'center',
        marginVertical: 10,
        marginTop:20,
        backgroundColor:COLOURS.brown
    },
    buttn: {
        color: COLOURS.white,
        textAlign: 'center',
        alignItems: 'center',
        letterSpacing: .7,
        fontFamily: 'Poppins-Medium',

    },
})