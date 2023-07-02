import { StyleSheet, Text, TouchableOpacity, View, Image,Animated,Modal, ScrollView, ToastAndroid, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOURS, Items } from '../Database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'


/// Dummy Tax ///

const ModalPoup = ({ visible, children }) => {
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
  
  
  ///Dummy Text End ///
const Mycart = ({ navigation }) => {
    const [product, setProduct] = useState();
    const [total, setTotal] = useState(null);
    const [visible, setVisible] = React.useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB();
        });

        return unsubscribe;
    }, [navigation]);

    //get data from local DB by ID
    const getDataFromDB = async () => {
        let items = await AsyncStorage.getItem('cartItems');
        items = JSON.parse(items);
        let productData = [];
        if (items) {
            Items.forEach(data => {
                if (items.includes(data.id)) {
                    productData.push(data);
                    return;
                }
            });
            setProduct(productData);
            getTotal(productData);
        } else {
            setProduct(false);
            getTotal(false);
        }
    };

    //remove data from Cart

    const removeItemFromCart = async id => {
        let itemArray = await AsyncStorage.getItem('cartItems');
        itemArray = JSON.parse(itemArray);
        if (itemArray) {
            let array = itemArray;
            for (let index = 0; index < array.length; index++) {
                if (array[index] == id) {
                    array.splice(index, 1);
                }

                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                getDataFromDB();
            }
        }
    };


    //get total price of all items in the cart

    const getTotal = productData => {
        let total = 0;
        for (let index = 0; index < productData.length; index++) {
            let productPrice = productData[index].productPrice;
            total = total + productPrice;
        }
        setTotal(total);
    };


    //checkout

    const checkOut = async () => {
        try {
            await AsyncStorage.removeItem('cartItems');
        } catch (error) {
            return error;
        }
        
    }

    const renderProduct = (data, index) => {

        return (
            <>
                <TouchableOpacity key={data.key} style={{ margin: 20, marginBottom: 5, flexDirection: 'row' }} onPress={() => navigation.navigate('ProductInfo', { productID: data.id })} >
                    <View style={{ width: '30%', height: 100, padding: 10, borderRadius: 10, backgroundColor: COLOURS.backgroundLight }} >
                        <Image source={data.productImage} style={{ height: '100%', width: '100%' }} />
                    </View>

                    <View style={{ color: COLOURS.black, paddingLeft: 10, justifyContent: 'space-between', width: '63%', }} key={index}>
                        <Text style={{ fontFamily: 'Poppins-Medium', color: COLOURS.black }} >
                            {data.productName}
                        </Text>

                        <Text style={{ bottom: -2, fontFamily: 'Poppins-Medium', color: COLOURS.backgroundDark }} >Rs: {data.productPrice}</Text>

                        <View style={{ flexDirection: 'row', color: COLOURS.black, justifyContent: 'space-between', alignItems: 'center', }} >
                            <Text style={{ color: COLOURS.backgroundDark }}>
                                {data.productRating} <Image source={require('../images/star.png')} style={{ height: 15, width: 15 }} />
                            </Text>

                            <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
                                <Text style={{ height: 36, width: 36, backgroundColor: COLOURS.backgroundLight, justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 100, textAlign: 'center' }}>
                                    <FontAwesome5 name='trash-restore' style={{
                                        color: COLOURS.brown, alignItems: 'center', justifyContent: 'center', fontSize: 15, padding: 0, borderRadius: 100
                                    }} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </>

        )

    }

    return (
        <>
        <ScrollView style={{ backgroundColor: COLOURS.white, height: '100%' }} showsVerticalScrollIndicator={false}>
            <StatusBar backgroundColor={COLOURS.backgroundLight} barStyle='dark-content' />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20, marginTop: 30, alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
                    <Text style={{ height: 40, width: 40, padding: 8, backgroundColor: COLOURS.backgroundLight, borderRadius: 10, textAlign: 'center' }}>
                        <FontAwesome5 name='angle-left' style={{ fontSize: 23, color: COLOURS.brown }} />
                    </Text>
                </TouchableOpacity>

                <Text style={{ color: COLOURS.backgroundDark, fontFamily: 'OpenSans-Bold', fontSize: 16 }}>
                    Order Details
                </Text>
                <Text></Text>
            </View>
            <View>
                <Text style={{ color: COLOURS.black, marginLeft: 20, fontSize: 20, fontFamily: 'OpenSans-Bold' }}>My Cart</Text>
            </View>

            <View style={{ backgroundColor: COLOURS.white }}>
                {product ? product.map(renderProduct) : null}
            </View>
            <View>
                <Text style={{ color: COLOURS.black, marginLeft: 20, marginTop: 10, fontSize: 16, fontFamily: 'OpenSans-Bold' }}>Delivery Location</Text>
            </View>

            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('MapHere')} style={{ backgroundColor: COLOURS.backgroundLight, marginTop: 20, marginBottom: 20, margin: 10, borderRadius: 10 }}>
                <View style={{ margin: 20, marginBottom: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ backgroundColor: COLOURS.backgroundMedium, height: 50, width: 50, alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 15, borderRadius: 10, }}>
                            <FontAwesome5 name='truck' style={{ fontSize: 17, color: COLOURS.brown }} />
                        </Text>

                        <View style={{ bottom: -6 }}>
                            <Text style={{ fontSize: 13, color: COLOURS.backgroundDark, paddingLeft: 10, fontFamily: 'Poppins-Medium' }}>Pakistan Hyderabd</Text>
                            <Text style={{ width: '100%', color: COLOURS.backgroundDark, paddingLeft: 10, fontFamily: 'Poppins-Medium', fontSize: 13 }}>All over Pakistan Delivery</Text>
                        </View>
                    </View>

                    <Text style={{ paddingBottom: 15 }}>
                        <Image source={require('../Bold/map-marker.png')} style={{ height: 22, width: 22, tintColor: COLOURS.brown }} />
                    </Text>
                </View>
            </TouchableOpacity>

            <View>
                <Text style={{ color: COLOURS.black, marginLeft: 20, fontSize: 16, fontFamily: 'OpenSans-Bold' }}>Payment Method</Text>
            </View>

            <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: COLOURS.backgroundLight, marginTop: 20, marginBottom: 20, margin: 10, borderRadius: 10 }}>
                <View style={{ margin: 20, marginBottom: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ backgroundColor: COLOURS.backgroundMedium, height: 50, width: 50, alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 5, borderRadius: 10, }}>
                            <Image source={require('../Bold/credit-card.png')} style={{ height: 25, width: 25, tintColor: COLOURS.brown }} />
                        </Text>

                        <View style={{ bottom: -6 }}>
                            <Text style={{ fontSize: 13, color: COLOURS.backgroundDark, paddingLeft: 10, fontFamily: 'Poppins-Medium' }}>Paid Here</Text>
                            <Text style={{ width: '100%', color: COLOURS.backgroundDark, paddingLeft: 10, fontSize: 13, fontFamily: 'Poppins-Medium' }}>Any Local Bank Account</Text>
                        </View>
                    </View>

                    <Text>
                        <FontAwesome5 name='angle-right' style={{ fontSize: 22, color: COLOURS.brown }} />
                    </Text>
                </View>
            </TouchableOpacity>

            <View>
                <Text style={{ color: COLOURS.black, marginLeft: 20, fontSize: 16, fontFamily: 'OpenSans-Bold', letterSpacing: .3 }}>order Info</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20, marginBottom: 15 }}>
                <Text style={{ color: COLOURS.black, fontSize: 14, fontFamily: 'Poppins-Medium', color: COLOURS.backgroundDark }}>Subtotal</Text>
                <Text style={{ color: COLOURS.black, fontSize: 14, fontFamily: 'Poppins-Medium', color: COLOURS.backgroundDark }}>{total}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20, marginTop: 0 }}>
                <Text style={{ color: COLOURS.black, fontSize: 14, fontFamily: 'Poppins-Medium', color: COLOURS.backgroundDark }}>Shipping tax</Text>
                <Text style={{ color: COLOURS.black, fontSize: 14, fontFamily: 'Poppins-Medium', color: COLOURS.backgroundDark }}>{total / 20}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20, marginTop: 0 }}>
                <Text style={{ color: COLOURS.black, fontSize: 14, fontFamily: 'Poppins-Medium', color: COLOURS.backgroundDark }}>Total</Text>
                <Text style={{ color: COLOURS.black, fontSize: 18, fontFamily: 'Poppins-Medium', color: COLOURS.black }}>Rs: {total + total / 20}</Text>
            </View>

            <TouchableOpacity activeOpacity={0.8} onPress={() => (total != 0 ? checkOut() : null) && setVisible(true)}>
                <View style={{ marginTop: 35, margin: 20, marginLeft: 20, width: '90%', backgroundColor: COLOURS.brown, padding: 15, borderRadius: 10, height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: COLOURS.white, textTransform: 'uppercase', fontFamily: 'OpenSans-Bold', fontSize: 13, textAlign: 'center' }}>CHECKOUT (Rs: {total + total / 20})
                    </Text>
                    <FontAwesome5 name='shopping-cart' style={{ color: COLOURS.white, paddingLeft: 15 }} />
                </View>
            </TouchableOpacity>
        </ScrollView>

         {/* // Dummy Text // */}

         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ModalPoup visible={visible}>

                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setVisible(false) + navigation.navigate('BottomNavigation')}>
                                <Image
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


                {/* // Dummy Text // */}
            </View>
        </>
    )
}

export default Mycart

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