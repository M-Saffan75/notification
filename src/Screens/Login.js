import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground ,StatusBar, Image} from 'react-native'
import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Login = ({ navigation }) => {
    const [values, setValues] = useState({
        email: "",
        pwd: ""
    })

    function handleChange(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
    }

    function Login() {
        const {email,pwd} = values

        firebase.auth().signInWithEmailAndPassword(email, pwd)
            .then(() => {
              
              /* navigation.replace("BottomNavigation")  */
            })
            .catch((error) => {
            /*  const errorCode = error.code;
                const errorMessage = error.message; */
                alert(error.message);
            });
    }
    const [hidePass, setHidePass] = React.useState(true);

    return (
        <>
             <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
        <ImageBackground source={require('../images/soil.jpg')} style={{height:'100%',width:'100%',}} resizeMode='cover'>
        <View style={styles.container}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../images/login.png')} style={{height:100,width:100, resizeMode:'contain',}} tintColor='#fff'/>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.viewfont}>
                <TextInput
                    placeholder='Email'
                    onChangeText={text => handleChange(text, "email")}
                    style={styles.textInputpassword}
                    placeholderTextColor='#eee'
                />
                
                <View style={styles.icon}>
                <FontAwesome5 name='envelope'  style={styles.icon}/>
                </View>
                
                </View>
                <View style={styles.viewfont}>
                <TextInput
                    placeholder='Password'
                    onChangeText={text => handleChange(text, "pwd")}
                    style={styles.textInputpassword}
                    secureTextEntry={hidePass ? true : false}
                    placeholderTextColor='#eee'
                />
                
                <View style={styles.icon}>
                <FontAwesome5 name={hidePass ? 'eye-slash' : 'eye'} onPress={() => setHidePass(!hidePass)}  style={styles.icon}/>
                </View>
                
                </View>

            </View>
            <View>
                <TouchableOpacity style={styles.Backbtn} activeOpacity={.6} onPress={()=> Login()}>
                    <Text style={styles.btn} >Login</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.line} onPress={() => navigation.navigate("SignUp")}>Dont havnt account ?</Text>
                </View>
            </View>
        </View>
        </ImageBackground>
        </>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,.1)',
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',  
    },
    icon : {
        
        color:'#fff',
        fontSize:18,
    },
    viewfont: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'80%',
        borderColor: '#fff',
        borderBottomWidth: 3,
        paddingHorizontal:10,
        borderRadius: 10,
        marginVertical: 20,
        marginBottom:30,
        fontFamily: 'Poppins-Medium',
    },
    textInput: {
        borderColor: '#fff',
        borderBottomWidth: 2,
        width: '80%',
        borderRadius: 10,
        marginVertical: 20,
        paddingHorizontal: 5,
        letterSpacing: .5,
        color: '#fff',
        padding:4,
        fontFamily: 'Poppins-Medium',
        
    },

    textInputpassword : {
        paddingBottom:5,
        paddingHorizontal:0,
        width:'90%',
        color:'#fff',
        fontFamily:'Poppins-Medium'
    },
    Backbtn: {
        borderWidth:3,
        borderColor: '#fff',
        width: '80%',
        color: '#fff',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 30,
        padding: 12,
        textAlign: 'center',
        marginVertical: 10,
        marginTop:20
    },
    btn: {
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        letterSpacing: .7,
        fontFamily: 'Poppins-Medium',

    },
    account: {
        marginVertical: 10,
        color: '#000',
        letterSpacing: .9,
        textAlign: 'center'
    },
    line: {
        paddingVertical: 20,
        color:'#fff',
        textAlign: 'center',
        fontFamily: 'OpenSans-Bold',
        letterSpacing: .6,
    },
})