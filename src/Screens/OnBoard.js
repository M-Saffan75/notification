import React from 'react';
import { StyleSheet, View , StatusBar, Text , Image, TouchableOpacity} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import {COLOURS} from '../Database/database';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const data = [
  {
    title: '𝑪𝒊𝒗𝒆𝒔 𝒄𝒍𝒐𝒕𝒉 𝒄𝒐𝒔𝒕𝒖𝒎𝒆',
    text: '𝙔𝙤𝙪 𝙘𝙖𝙣 𝙝𝙖𝙫𝙚 𝙖𝙣𝙮𝙩𝙝𝙞𝙣𝙜 𝙮𝙤𝙪 𝙬𝙖𝙣𝙩 𝙞𝙣 𝙡𝙞𝙛𝙚 𝙞𝙛 𝙮𝙤𝙪 𝙙𝙧𝙚𝙨𝙨 𝙛𝙤𝙧 𝙞𝙩',
    image: require('../images/51.png'),
    backgroundColor:'#000',
  },
  {
    title: '𝑪𝒐𝒔𝒕𝒖𝒎𝒆 𝑫𝒓𝒆𝒔𝒔-𝒖𝒑',
    text: '𝘾𝙡𝙤𝙩𝙝𝙚𝙨 𝙢𝙚𝙖𝙣 𝙣𝙤𝙩𝙝𝙞𝙣𝙜 𝙪𝙣𝙩𝙞𝙡 𝙨𝙤𝙢𝙚𝙤𝙣𝙚 𝙡𝙞𝙫𝙚𝙨 𝙞𝙣 𝙩𝙝𝙚𝙢',
    image: require('../images/53.png'),
    backgroundColor:'#000',
  },
  {
    title: '𝑫𝒖𝒏𝒈𝒂𝒓𝒆𝒆𝒔 𝑱𝒆𝒂𝒏𝒔 𝑫𝒆𝒏𝒊𝒎',
    text: '𝙁𝙖𝙨𝙝𝙞𝙤𝙣 𝙞𝙨 𝙡𝙞𝙠𝙚 𝙚𝙖𝙩𝙞𝙣𝙜, 𝙮𝙤𝙪 𝙨𝙝𝙤𝙪𝙡𝙙𝙣𝙩 𝙨𝙩𝙞𝙘𝙠 𝙩𝙤 𝙩𝙝𝙚 𝙨𝙖𝙢𝙚 𝙢𝙚𝙣𝙪.',
    image: require('../images/47-removebg.png'),
    backgroundColor:'#000',
  },
];

const OnBoard = ({navigation}) => {
  const renderItem = ({item}) => {
    return(
        <>
        <StatusBar backgroundColor={COLOURS.white} barStyle='dark-content' />
        
      <View style={styles.slide}>
      
      <TouchableOpacity activeOpacity={0.6} onPress={()=> navigation.navigate('Login')} style={{width:'100%' , bottom:55}}>
        <Text style={{color:COLOURS.brown,textAlign:'right',width:'100%',paddingHorizontal:20,fontFamily:'OpenSans-Bold'}}>Skip </Text>
      </TouchableOpacity>
        
        <Image style={styles.img} source={item.image}/>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
        </>
    );
  }


  const keyExtractor = (item) => item.title;
  

  const renderDoneButton = () => {
    return (
      <TouchableOpacity activeOpacity={0.6} style={styles.donebtnwrapper} onPress={()=> navigation.navigate('Login')}>
        <Text style={styles.donebtn}>Done <FontAwesome5 name={'angle-right'} size={13} style={styles.icon}/></Text>
      </TouchableOpacity>
    );
  }
  
  const renderNextButton = () => {
      return (
        <View style={styles.nextbtnwrapper} >
          <TouchableOpacity activeOpacity={0.6}><FontAwesome5 name='angle-right' style={{fontSize:15,color:COLOURS.white}} /></TouchableOpacity>
        </View>
      );
  }

  const renderPrevButton = () => {
    return (
      <View style={styles.prevbtnwrapper}>
        <Text style={styles.prevbtn}>Prev</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, }}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider keyExtractor={keyExtractor} renderItem={renderItem} renderDoneButton={renderDoneButton} renderNextButton={renderNextButton} renderPrevButton={renderPrevButton} 
      showPrevButton dotStyle={styles.dotStyle} activeDotStyle={styles.activeDotStyle} data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  slide : {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    backgroundColor:COLOURS.white,
  },

  img : { 
    marginVertical:50,
    marginHorizontal:60,
    height:280,
    width:300,
    object:'cover',
    bottom:30,
  },

  title :{
    fontSize:20,
    color:COLOURS.brown,
    textAlign:'center',
    fontWeight:'bold',
    marginHorizontal:60,
    fontFamily:'OpenSans-Bold',
    bottom:15,
  },  
  text : {
    fontSize:14,
    color:COLOURS.brown,
    padding:20,
    marginHorizontal:30,
    textAlign:'center',
    fontFamily:'Poppins-Medium',
    bottom:20,
  },

  donebtnwrapper: {
    height:45,
    backgroundColor:COLOURS.brown,
    paddingRight:20,
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    paddingHorizontal:30,
    borderBottomLeftRadius:25,
    borderTopLeftRadius:25,
    
    right:-16,
    bottom:20,
    
  },
  nextbtnwrapper: {
    height:50,
    width:50,
    marginRight:10,
    backgroundColor:COLOURS.brown,
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center',
    bottom:20,
  },
  prevbtnwrapper: {
    height:40,
    width:40,
    marginLeft:20,
    alignItems:'center',
    justifyContent:'center',
    bottom:20,
  },

  donebtn: {
    color:COLOURS.brown,
    fontFamily:'OpenSans-Bold',
    color:COLOURS.white,
    width:50,
  },

  prevbtn: {
    color:COLOURS.brown,
    fontWeight:'500',
    letterSpacing:.5,
    fontFamily:'OpenSans-Bold',
  },

  dotStyle : {
    backgroundColor:COLOURS.backgroundMedium,
    bottom:20,
  },

  activeDotStyle : {
    backgroundColor:COLOURS.brown,
    bottom:20,
  },

});

export default OnBoard;
