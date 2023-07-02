import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLOURS, Items } from '../Database/database'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Bookmark = ({ navigation }) => {
    const [product, setProduct] = useState()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB();
        })
        return unsubscribe;
    }, [navigation]);

    const getDataFromDB = async () => {
        let items = await AsyncStorage.getItem('BookmarkItem');
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
        } else {
            setProduct(false);
        }
    };

    //get total price of all items in the cart

    const removeItemFromCart = async id => {
        let itemArray = await AsyncStorage.getItem('BookmarkItem')
        itemArray = JSON.parse(itemArray);
        if (itemArray) {
            let array = itemArray
            for (let index = 0; index < array.length; index++) {
                if (array[index] == id) {
                    array.splice(index, 1);
                }

                await AsyncStorage.setItem('BookmarkItem', JSON.stringify(array))
                getDataFromDB()
            }
        }

    }


    const Bookmark = (data, index) => {
        return (


            <View style={{ paddingHorizontal: 20, width: '50%', marginTop: 30, backgroundColor: '#fff', marginBottom: 20 }}>
                <StatusBar backgroundColor={COLOURS.white} barStyle='dark-content' />
                <View style={{
                    width: '100%', height: 210, shadowColor: COLOURS.backgroundMedium, flexDirection: 'row', backgroundColor: COLOURS.backgroundLight,
                    alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 5, justifyContent: 'center', alignItems: 'center'
                }} key={index}>

                    <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10, }} onPress={() => removeItemFromCart(data.id)}>
                        <FontAwesome5 name='trash-restore' style={{ fontSize: 22, color: COLOURS.brown, }} />
                    </TouchableOpacity>
                    {
                        data.isOff ? (
                            <View style={{ position: 'absolute', top: 0, left: 0, backgroundColor: COLOURS.brown, padding: 2, paddingHorizontal: 5, borderTopLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                <Text style={{ color: COLOURS.white, fontSize: 12 }}>{data.offPercentage}%</Text>
                            </View>
                        ) : null
                    }
                    <TouchableOpacity onPress={() => navigation.navigate('ProductInfo', { productID: data.id })}>
                        <Image source={data.productImage} style={{ height: 125, width: 125, borderRadius: 5, padding: 10, marginTop: 20 }} />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={{ color: COLOURS.black, fontFamily: 'Poppins-Medium', paddingHorizontal: 10, fontSize: 14 }}>{data.productName}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: COLOURS.black, fontFamily: 'Poppins-Medium', paddingHorizontal: 10, fontSize: 14 }}>Rs: {data.productPrice}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:55,alignItems:'center'}}>
                        <Text style={{ color: COLOURS.black, fontFamily: 'Poppins-Medium', paddingHorizontal: 10, fontSize: 12, }}>{data.productRating}</Text>
                        <Image source={require('../images/star.png')} style={{height:12,width:12,position:'relative',right:10,bottom:2}} />
                    </View>
                </View>

            </View>

        )
    }

    return (

        <View style={{ backgroundColor: COLOURS.white, height: '100%', width: '100%' }}>
            <StatusBar backgroundColor={COLOURS.backgroundLight} barStyle='dark-content' />
        <ScrollView Vertical showsVerticalScrollIndicator={false} style={{ marginBottom: 50 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20, marginTop: 30, alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={10}>
                    <Text>
                        <View><Image source={require('../images/bookmark1.png')} style={{ height: 30, width: 30 }} tintColor='#795548' /></View>
                    </Text>
                </TouchableOpacity>

                <Text style={{ color: COLOURS.backgroundDark, fontFamily: 'Poppins-Medium', fontSize: 16 }}>
                    Bookmarks Detail
                </Text>
                <Text></Text>
            </View>
            <Text style={{ fontSize: 20, color: COLOURS.black, fontWeight: '500', letterSpacing: 1, paddingTop: 0, paddingLeft: 16, marginBottom: 10,
            }}>My BookMarks</Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    {product ? product.map(Bookmark) : null}
                </View>
            </ScrollView>

        </View>
    )
}

export default Bookmark

const styles = StyleSheet.create({})