import {
  View, Text, Button, Image, TextInput, TouchableOpacity, ScrollView, FlatList,
  Dimensions, SafeAreaView
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import Screen from '../templates/Screen';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CartEmpty from '../constants/svgs/CartEmpty'
import apiServices from '../utils/apiServices';
import * as WebBrowser from 'expo-web-browser';

/* 
{ "author": { "id": 36, "name": "Mateando" }, "authorId": 36, "category": { "name": "metalico" }, "categoryId": 9, "colors": [{ "hex": "#F7FAFC", "name": "white" }, { "hex": "#F687B3", "name": "pink" }], "comments": [], "createdAt": "2024-01-15T22:14:43.895Z", "description": "Lleva a la argentina siempre", "id": 26, "imageUrls": ["https://vjfkuwaqdwqtqgpmbldg.supabase.co/storage/v1/object/public/cms_mateto/vendors/36/150120241442_bombillas_y_mates_uruguayos_1692299994_3171564685388133308_3449486550.heic"], "price": 20000, "published": true, "ratings": [], "sizes": [{ "name": "M" }, { "name": "L" }, { "name": "XXL" }], "stock": 98, "title": "Termos seleccion", "type": { "name": "termos" }, "typeId": 10, "updatedAt": "2024-01-16T01:41:08.493Z" } */


const screenWidth = Dimensions.get('window').width;

const CartScreen = ({ route }) => {
  const navigation = useNavigation();
  const animation = useRef(null);
  const { user, token } = useAuth();

  const [mates, setMates] = useState(null);
  const [creationOrder, setCreationOrder] = useState(false)
  const [result, setResult] = useState(null);

  useEffect(() => {
    const getMate = async () => {
      const { data } = await apiServices.user.cart.getCart({
        userAuthToken: token
      }).request

      setMates(data)
    }
    getMate();
  }, []);

  const increment = (id) => {
    setMates(prevMates => {
      return prevMates.map(mate => {
        if (mate.id === id) {
          return {
            ...mate,
            quantity: mate.quantity + 1
          };
        }
        return mate;
      });
    });
  };

  const decrement = (id) => {
    setMates(prevMates => {
      return prevMates.map(mate => {
        if (mate.id === id) {
          if (mate.quantity - 1 > 0) {
            return {
              ...mate,
              quantity: mate.quantity - 1
            };
          }
        }
        return mate;
      });
    });
  };

  const createOrder = async () => {
    setCreationOrder(true)
    const { data } = await apiServices.purchases.createPurchase({
      userAuthToken: token,
      data: {
        totalDiscount: 0,
        addressLine: "Calle 123",
        city: "CABA",
        state: "CABA",
        postalCode: "1234",
        phoneNumber: "1234567890",
        purchaseItems: mates.map(item => {
          return {
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
            title: item.product.title
          }
        })
      },
    }).request

    setCreationOrder(false)

    if (data.preference.sandbox_init_point) {
      let result = await WebBrowser.openBrowserAsync(data.preference.sandbox_init_point);
      setResult(result);
    }

  }


  return (
    <View className="bg-[#FFFFFF]">
      {mates ? <View className="h-full bg-white" showsVerticalScrollIndicator={false}>
        {
          mates?.length > 0 ? <Screen>
            <ScrollView showsVerticalScrollIndicator={false} className="flex flex-col space-y-5">
              <View className="flex flex-row items-center justify-between ">
                <TouchableOpacity className="flex flex-row justify-center items-center h-[55px] w-[55px] bg-black rounded-full " onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
              </View>
              <Text className="text-2xl font-bold">Carrito</Text>
              <View>
                <View className="flex flex-col items-center space-y-4">
                  {mates.map((mate, index) => (
                    <View className="flex flex-row justify-between items-center px-3 py-2 w-full  rounded-2xl border-[#F3F4F6] border-2" key={index}>
                      <View className="flex flex-row items-center space-x-3">
                        <Image source={{ uri: mate.product.imageUrls[0] }} className="h-[90px] w-[90px] rounded-2xl" />
                        <View className="flex flex-col items-start justify-around gap-2 h-[100px]">
                          <Text className="text-[15px] font-bold text-center text-black">{mate.product.title}</Text>
                          <Text className="text-[14px] font-bold text-center text-black">{Math.round(mate.product.price * mate.quantity).toLocaleString(
                            "en-US",
                            { style: "currency", currency: "USD" }
                          )}</Text>
                        </View>
                      </View>
                      <View className="flex flex-col justify-end h-[100px] ">
                        <View className="flex-row items-center bg-[#F3F4F6] rounded-full mb-2">
                          <TouchableOpacity onPress={() => decrement(mate.id)} className="p-2">
                            <Entypo name="minus" size={15} color="black" />
                          </TouchableOpacity>
                          <TextInput className="mx-2 mb-2 text-sm" editable={false} defaultValue={`${mate.quantity}`} value={`${mate.quantity}`} />
                          <TouchableOpacity onPress={() => increment(mate.id)} className="p-2">
                            <Entypo name="plus" size={15} color="black" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
              <View className="flex flex-col items-start justify-start h-min border border-[#EEEEEE] rounded-3xl px-5 py-5 space-y-4">
                <View className="flex flex-row items-center justify-between w-full">
                  <Text className="text-[15px] font-bold text-center text-black">Subtotal</Text>
                  <Text className="text-[18px] font-[800] text-center text-black">{Math.round(mates.reduce((a, b) => a + (b.product.price * b.quantity), 0)).toLocaleString(
                    "en-US",
                    { style: "currency", currency: "USD" }
                  )}</Text>
                </View>
                <View className="flex flex-row items-center justify-between w-full">
                  <Text className="text-[15px] font-bold text-center text-black">Envio</Text>
                  <Text className="text-[18px] font-[800] text-center text-black">{(1000).toLocaleString(
                    "en-US",
                    { style: "currency", currency: "USD" }
                  )}</Text>
                </View>
                <View className="flex flex-row items-center justify-between w-full">
                  <Text className="text-[15px] font-bold text-center text-black">Total</Text>
                  <View className="flex flex-row gap-2">
                    <Text className="text-[18px] text-center text-[#9E9E9E]">({Math.round(mates.reduce((a, b) => a + (b.quantity), 0))} Art.)</Text>
                    <Text className="text-[18px] font-[800] text-center text-black">{Math.round(mates.reduce((a, b) => a + (b.product.price * b.quantity), 0) + 1000).toLocaleString(
                      "en-US",
                      { style: "currency", currency: "USD" }
                    )}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity className="w-full bg-black h-[55px] items-center justify-center rounded-full" onPress={() =>
                createOrder()}>
                <Text className="text-xl font-medium text-white">Realizar pago</Text>
              </TouchableOpacity>
            </ScrollView>
          </Screen>

            :
            <View className="flex flex-col items-center justify-center w-full h-full px-10 mt-5 space-y-6">
              <CartEmpty />
              <Text className='text-[28px] font-thin'>
                Tu carrito esta vacio y triste :(
              </Text>
              <Text className='text-[16px] font-thin text-[#807D7E]'>
                Agrega algo para hacerlo feliz
              </Text>
              <TouchableOpacity className="w-full bg-black h-[55px] items-center justify-center rounded-full" onPress={() => navigation.goBack()}>
                <Text className="text-xl font-medium text-white">Continuar comprando</Text>
              </TouchableOpacity>
            </View>

        }
      </View>
        :
        <Screen>
          <View className="flex flex-col items-center justify-center h-full bg-white">
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: 180,
                height: 180,
              }}
              // Find more Lottie files at https://lottiefiles.com/featured
              source={{ uri: 'https://lottie.host/c347a01b-7544-489f-a889-bc6017eb6ea2/euwpGrghxm.json' }}
            />
          </View>
        </Screen>
      }
    </View>
  )
}

export default CartScreen