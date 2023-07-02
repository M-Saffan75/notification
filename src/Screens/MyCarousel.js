
import {ScrollView,StyleSheet, Text,Image, View , SafeAreaView, Dimensions} from 'react-native'
import React, {useState} from 'react'
import {COLOURS} from '../Database/database'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const MyCarousel = () => {
const [imgActive , setimgActive] = useState(0)

  const images = [
    'https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8amVhbnMlMjBhbmQlMjB0JTIwc2hpcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1529720317453-c8da503f2051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1416339698674-4f118dd3388b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  ]
  const onchange = (nativeEvent) => {
    if(nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if(slide!= imgActive) {
        setimgActive(slide);
      }
    }
  }

  return (
    <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
      <View style={styles.container}>
        <View style={styles.wrap}>
          <ScrollView onScroll={({nativeEvent}) => onchange(nativeEvent)} showsHorizontalScrollIndicator={false} 
          pagingEnabled horizontal
          >
              {
                  images.map((e, index) => 
                      <Image key={e} resizeMode='stretch'
                      style={styles.wrapImage}
                      source={{ uri:e }}
                      />
                )
              }
          </ScrollView>
          <View style={styles.wrapDot}>
              {
                images.map((e,index) => 
                  <Text key={e} style={imgActive == index ? styles.dotActive : styles.dot }>
                    ●
                  </Text>
                )
              }
          </View>
        </View>
      </View>
    </View>
  )
}

export default MyCarousel

const styles = StyleSheet.create({

    container: {
        flex:1,
        width:'95%',
        paddingHorizontal:20,
        justifyContent:'center',
        alignItems:'center'
    },
    wrap :{
        width:'95%',
        height:HEIGHT * 0.22,
        borderRadius:10,        
    },
    wrapImage : {
      width:316.5,
      backgroundColor:COLOURS.brown,
      borderRadius:10,
    },

    wrapDot : {
      position:'absolute',
      bottom:0,
      flexDirection:'row',
      alignSelf:'center'
    },
    dotActive : {
      margin:3,
      color:COLOURS.brown,
    },
    dot : {
      margin:3,
      color:'#fff'
    }

})