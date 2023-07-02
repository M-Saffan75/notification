import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'


const Home = ({navigation}) => {
  return (
    <View style={{justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity style={{backgroundColor:'#1b1b1b',justifyContent:'center', alignItems:'center',height:40,width:80}} >
        <Text style={{color:'#fff'}}>Home</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
// navigation.closeDrawer();
