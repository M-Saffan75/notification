import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import firebase from "firebase/app";
import "firebase/auth";
import { COLOURS } from '../Database/database';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

/// Dummy Tax ///

/* const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};
 */

///Dummy Text End ///

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={{flex: 1}}>
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{backgroundColor:COLOURS.backgroundMedium}}>
      <ImageBackground
        source={require('../images/zip.png')}
        style={{padding: 20}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Image
          source={require('../images/10.jpg')}
          style={{height: 80, width: 80, borderRadius: 40, marginBottom: 8,top:10}}
        />
        </View>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontFamily: 'OpenSans-Bold',
            bottom:-8
            
          }}>
          John Doe
        </Text>
        <View style={{flexDirection: 'row'}}>
        </View>
      </ImageBackground>
      <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
    <View style={{padding: 10,paddingTop:0,paddingBottom:0, borderTopWidth: 1, borderTopColor:COLOURS.brown}}>
    {/*  logout start here */}
     <TouchableOpacity style={{paddingVertical: 15}}  onPress={()=> setVisible(true)} >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* <Image source={require('../Filled/users-three.png')} style={{height:20,width:20}} tintColor={COLOURS.backgroundDark} /> */}
        <FontAwesome5 name='share-alt' style={{fontSize:18,color:COLOURS.backgroundDark,paddingRight:5,}} />
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Roboto-Medium',
              marginLeft: 5,
              color:COLOURS.backgroundDark,
              swipeEnabled: false,
            }}>
            Share Friends
          </Text>
        </View>
      </TouchableOpacity>
      {/*  logout End here */}

           {/* // Dummy Text // */}

         {/*   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ModalPoup visible={visible}>

                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.header}>
                            <TouchableOpacity> */}
                            {/* <TouchableOpacity onPress={() => setVisible(false) + firebase.auth().signOut()  .then(() => {navigation.replace("onBoard")})}> */}
                {/*                 <Image
                                    source={require('../images/x.png')}
                                    style={{ height: 30, width: 30 }}
                                    tintColor='#fff'/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={require('../images/success2.png')}
                            style={{ height: 150, width: 150, marginVertical: 10 }}
                        tintColor='#fff'/>
                    </View>

                    <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center', color: COLOURS.white }} >
                        ɪᴛ ᴡɪʟʟ ʙᴇ ᴅᴇʟɪᴠᴇʀ ꜱᴏᴏɴ <FontAwesome5 name='smile' style={{ color: COLOURS.blue, fontSize: 20 }} />
                    </Text>

                </ModalPoup>

            </View>
 */}
                {/* // Dummy Text // */}

    </View>
  </View>
    )
}



const styles = StyleSheet.create({
  modalBackGround: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: COLOURS.brown,
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderRadius: 20,
      elevation: 20,
    },
    header: {
      width: '100%',
      height: 40,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
})

export default CustomDrawer
