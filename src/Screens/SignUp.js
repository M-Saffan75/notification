import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, StatusBar ,Image} from 'react-native'
import React, { useState } from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const SignUp = () => {
  const [values, setValues] = useState({
    email: "",
    pwd: "",
    pwd2: ""
  })

  function handleChange(text, eventName) {
    setValues(prev => {
      return {
        ...prev,
        [eventName]: text
      }
    })
  }

  function SignUp() {
    const { email, pwd, pwd2 } = values

    if (pwd == pwd2) {
      firebase.auth().createUserWithEmailAndPassword(email, pwd)
        .then(() => {
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Password Must be Same")
    }
  }
  const [hidePass, setHidePass] = React.useState(true);
  const [hidden, setHidden] = React.useState(true);
  return (
    <>
      <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />

      <ImageBackground source={require('../images/soil-2.jpg')} style={{ height: '100%', width: '100%', }} resizeMode='cover'>
        <View style={styles.container}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../images/signup.png')} style={{height:100,width:100, resizeMode:'contain',}} tintColor='#fff'/>
            </View>
          <View style={styles.inputContainer}>

            <View style={styles.viewfont}>
              <TextInput
                placeholder='Email'
                onChangeText={text => handleChange(text, "email")}
                style={styles.textInput}
                placeholderTextColor='#eee'
              />

              <View style={styles.icon}>
                <FontAwesome5 name='envelope' style={styles.icon} />
              </View>
            </View>


            <View style={styles.viewfont}>
              <TextInput
                placeholder='Password'
                onChangeText={text => handleChange(text, "pwd")}
                style={styles.textInput}
                secureTextEntry={hidePass ? true : false}
                placeholderTextColor='#eee'
              />
              <View style={styles.icon}>
                <FontAwesome5 name={hidePass ? 'eye-slash' : 'eye'} onPress={() => setHidePass(!hidePass)} style={styles.icon} />
              </View>
            </View>
            <View style={styles.viewfont}>
              <TextInput
                placeholder='Confirm Password'
                onChangeText={text => handleChange(text, "pwd2")}
                style={styles.textInput}
                secureTextEntry={hidden ? true : false}
                placeholderTextColor='#eee'
              />
              <View style={styles.icon}>
                <FontAwesome5 name={hidden ? 'eye-slash' : 'eye'} onPress={() => setHidden(!hidden)} style={styles.icon} />
              </View>
            </View>
          </View>

          
            <TouchableOpacity style={styles.Backbtn} activeOpacity={.6} onPress={() => SignUp()}>
              <Text style={styles.btn} >Sign Up</Text>
            </TouchableOpacity>
          
        </View>
      </ImageBackground>
    </>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor:'rgba(0,0,0,.1)',
    flex: 1,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {

    color: '#fff',
    fontSize: 18,
  },
  viewfont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    borderColor: '#fff',
    borderBottomWidth: 3,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginVertical: 20,

  },
  textInput: {
    paddingBottom: 5,
    width: '90%',
    color: '#fff',
    fontFamily: 'Poppins-Medium'
  },
  Backbtn: {
    borderWidth: 3,
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
    fontFamily: 'OpenSans-Bold',

  },
  account: {
    marginVertical: 10,
    color: '#000',
    letterSpacing: .9,
    textAlign: 'center'
  },

})