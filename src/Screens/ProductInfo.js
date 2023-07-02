import React, { useEffect, useState } from 'react';
import { COLOURS, Items } from '../Database/database';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, Dimensions, FlatList, Animated, ToastAndroid } from 'react-native';

export default function ProductInfo({ route, navigation }) {


    const { productID } = route.params;

    const [product, setProduct] = useState({})
    const width = Dimensions.get('window').width
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => { getDataFromDB() });
        return unsubscribe;
    }, [navigation])

    //get product data by productID

    const getDataFromDB = async () => {
        for (let index = 0; index < Items.length; index++) {
            if (Items[index].id == productID) {
                await setProduct(Items[index])
                return;
            }
        }
    }

    //add to cart

    const addToCart = async id => {
        let itemArray = await AsyncStorage.getItem('cartItems')
        itemArray = JSON.parse(itemArray)
        if (itemArray) {
            let array = itemArray
            array.push(id);

            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                ToastAndroid.show('𝐈𝐭𝐞𝐦 𝐀𝐝𝐝𝐞𝐝 𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐢𝐧 𝐜𝐚𝐫𝐭', ToastAndroid.SHORT);
                navigation.navigate('BottomNavigation')
            } catch (error) {
                return error;
            }
        }
        else {
            let array = []
            array.push(id)
            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                ToastAndroid.show('𝐈𝐭𝐞𝐦 𝐀𝐝𝐝𝐞𝐝 𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐢𝐧 𝐜𝐚𝐫𝐭', ToastAndroid.SHORT);
                navigation.navigate('BottomNavigation')
            }
            catch (error) {
                return error;
            }
        }
    }
    console.log(product)

    // addToBookmark start 

    const addToBookmark = async id => {
        let itemArray = await AsyncStorage.getItem('BookmarkItem')
        itemArray = JSON.parse(itemArray)
        if (itemArray) {
            let array = itemArray
            array.push(id);

            try {
                await AsyncStorage.setItem('BookmarkItem', JSON.stringify(array));
                ToastAndroid.show('𝐁𝐨𝐨𝐤𝐦𝐚𝐫𝐤 𝐀𝐝𝐝𝐞𝐝', ToastAndroid.SHORT);
                navigation.navigate('BottomNavigation')
            } catch (error) {
                return error;
            }
        }
        else {
            let array = []
            array.push(id)
            try {
                await AsyncStorage.setItem('BookmarkItem', JSON.stringify(array));
                ToastAndroid.show('𝐁𝐨𝐨𝐤𝐦𝐚𝐫𝐤 𝐀𝐝𝐝𝐞𝐝', ToastAndroid.SHORT);
                navigation.navigate('BottomNavigation')
            }
            catch (error) {
                return error;
            }
        }
    }


    const renderProduct = ({ item, index }) => {
        return (
            <View style={{ height: 220, width: width, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={item} style={{ height: '100%', width: '100%', resizeMode: 'contain', }} />
            </View>
        )
    }

    return (

        <>
            <StatusBar backgroundColor={COLOURS.backgroundLight} barStyle='dark-content' />
            <View style={{ backgroundColor: COLOURS.white, height: '100%', }}>
                <View style={{ height: 330, width: '100%', backgroundColor: COLOURS.backgroundLight, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}>
                    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
                            <Text style={{ backgroundColor: COLOURS.white, height: 40, width: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, textAlign: 'center', padding: 8 }}>
                                <FontAwesome5 name='angle-left' style={{ fontSize: 23, color: COLOURS.brown }} />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => product.isAvailable ? addToBookmark(product.id) : null}>
                            <Text style={{ backgroundColor: COLOURS.white, height: 40, width: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, textAlign: 'center', padding: 5 }}>
                                <Image source={require('../Bold/heart.png')} style={{ height: 20, width: 20 }} tintColor={'#795548'} />
                                {/*                                 <Entypo name={'home'} style={{ fontSize: 25, color: COLOURS.brown }} onChange={setData1}/> */}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList renderItem={renderProduct} horizontal showsHorizontalScrollIndicator={false}
                        data={product.productImageList} snapToInterval={width} bounces={false} decelerationRate={0.8}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false })} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 10, width: '100%' }}>
                        {
                            product.productImageList ?
                                product.productImageList.map((data, index) => {
                                    let opacity = position.interpolate({
                                        inputRange: [index - 1, index, index + 1],
                                        outputRange: [0.2, 1, 0.2],
                                        extrapolate: 'clamp'
                                    });
                                    return (
                                        <Animated.View style={{
                                            width: 8, borderRadius: 0, flexDirection: 'row',
                                            height: 8, backgroundColor: COLOURS.brown, opacity, marginHorizontal: 5
                                        }} key={index}>

                                        </Animated.View>
                                    )
                                }) : null
                        }
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingHorizontal: 20, justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, width: '60%', color: COLOURS.black, fontFamily: 'OpenSans-Bold' }}>{product.productName}</Text>

                        <TouchableOpacity activeOpacity={0.6} style={{
                            flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLOURS.brown, height: 35, borderRadius: 100, alignItems: 'center',
                            padding: 10, paddingHorizontal: 8
                        }} onPress={() => navigation.navigate('MapHere')}>
                            <Text style={{ color: COLOURS.white, fontSize: 12, paddingRight: 6, fontFamily: 'OpenSans-Bold', top: -1 }}>Location</Text>

                            <Image source={require('../Bold/map-marker.png')} style={{ height: 20, width: 20, backgroundColor: COLOURS.white, width: 20, borderRadius: 100, textAlign: 'center', textAlignVertical: 'center', padding: 2 }} tintColor={COLOURS.brown} />
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 50, marginTop: 30, backgroundColor: COLOURS.backgroundLight, padding: 8, borderRadius: 10 }}>
                        <View style={{ borderRightWidth: 1, borderColor: COLOURS.backgroundMedium, paddingRight: 20 }}>
                            <Text style={{ color: COLOURS.backgroundDark, fontSize: 12, letterSpacing: .7, fontFamily: 'Poppins-Medium' }}>Rating</Text>
                            <Text style={{ color: COLOURS.black, fontWeight: 'bold' }}>{product.productRating} <Image source={require('../images/star.png')} style={{ height: 15, width: 15, position: 'relative', right: 15 }} /></Text>
                        </View>
                        <View style={{ borderRightWidth: 1, borderColor: COLOURS.backgroundMedium, paddingRight: 20, }}>
                            <Text style={{ color: COLOURS.backgroundDark, fontSize: 12, letterSpacing: .7, fontFamily: 'Poppins-Medium' }}>Price</Text>
                            <Text style={{ color: COLOURS.black, fontFamily: 'Poppins-Medium', fontWeight: 'bold', letterSpacing: .5, fontSize: 14 }}>{product.productPrice}.00</Text>
                        </View>
                        <View>
                            <Text style={{ color: COLOURS.backgroundDark, fontSize: 12, letterSpacing: .7, fontFamily: 'Poppins-Medium' }}>Shipping</Text>
                            <Text style={{ color: COLOURS.black, fontFamily: 'Poppins-Medium', fontWeight: 'bold', letterSpacing: .5, fontSize: 14 }}>{product.shippingrate}.00</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                        <Text style={{
                            color: COLOURS.black, fontSize: 16, fontFamily: 'OpenSans-Bold', letterSpacing: .4, borderLeftWidth: 5, borderColor: COLOURS.brown,
                            paddingLeft: 15
                        }}>Product Details</Text>
                        <Text style={{ fontFamily: 'Poppins-Medium', marginTop: 15, color: COLOURS.backgroundDark }}>
                            {product.description}
                        </Text>
                    </View>

                    <View style={{ margin: 20, marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='checkbox-multiple-blank-circle' style={{ fontSize: 20 }} color={COLOURS.brown} /><Text style={{ paddingLeft: 10, fontFamily: 'Poppins-Medium', color: COLOURS.black }}>Size: </Text>
                            <Text style={{ fontFamily: 'Poppins-Medium', color: COLOURS.backgroundDark, fontSize: 13, letterSpacing: .7, paddingLeft: 6 }}>{product.productSize}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='checkbox-multiple-blank-circle' style={{ fontSize: 20 }} color={COLOURS.brown} /><Text style={{ paddingLeft: 10, fontFamily: 'Poppins-Medium', color: COLOURS.black }}>Fabirc</Text>
                            <Text style={{ fontFamily: 'Poppins-Medium', color: COLOURS.backgroundDark, fontSize: 13, letterSpacing: .7, paddingLeft: 6 }}>{product.productFabric}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='checkbox-multiple-blank-circle' style={{ fontSize: 20 }} color={COLOURS.brown} /><Text style={{ paddingLeft: 10, fontFamily: 'Poppins-Medium', color: COLOURS.black }}>Colour: </Text>
                            <Text style={{ fontFamily: 'Poppins-Medium', color: COLOURS.backgroundDark, fontSize: 13, letterSpacing: .7, paddingLeft: 6 }}>{product.productColour}</Text>
                        </View>
                    </View>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => product.isAvailable ? addToCart(product.id) : null}>
                        <View style={{ margin: 20, marginTop: 15, marginBottom: 25, marginLeft: 20, width: '90%', backgroundColor: COLOURS.brown, padding: 15, borderRadius: 10, height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: COLOURS.white, textTransform: 'uppercase', fontFamily: 'OpenSans-Bold', fontSize: 13, textAlign: 'center' }}>{product.isAvailable ? 'add to cart' : 'not available'}
                            </Text>
                            <FontAwesome5 name='shopping-cart' style={{ color: COLOURS.white, paddingLeft: 15 }} />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    )
}