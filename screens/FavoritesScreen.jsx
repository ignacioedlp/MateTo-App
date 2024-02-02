import { View, Text, Button, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import Screen from '../templates/Screen';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import apiServices from '../utils/apiServices';

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const animation = useRef(null);
  const { user, token } = useAuth();

  const [mates, setMates] = useState(null);

  useEffect(() => {
    const getMates = async () => {
      const { data } = await apiServices.user.favorites.getFavorites({
        userAuthToken: token
      }).request
      setMates(data);
    }
    getMates()
  }, []);

  return (
    <Screen>
      {mates ? <ScrollView className="h-full space-y-10" showsVerticalScrollIndicator={false}>
        <View className="flex flex-row items-center justify-between ">
          <TouchableOpacity className="flex flex-row justify-center items-center h-[55px] w-[55px] bg-black rounded-full" onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={{ uri: user.imageProfile }} width={50} height={50} className="rounded-full" />
          </TouchableOpacity>
        </View>

        <View className="flex flex-row flex-wrap h-full">

          {mates.length > 0 ?
            mates?.map((item, index) => (
              <TouchableOpacity className="flex flex-col items-center w-1/2 px-3 mb-8 space-y-2 rounded-2xl" key={index} onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
                <Image source={{ uri: item.imageUrls[0] }} className="h-[184px] w-full rounded-2xl  " />
                <Text className="text-[17px] font-bold text-center text-black">{item.title}</Text>
              </TouchableOpacity>
            )) : (
              <View className="flex flex-col items-center justify-center w-full h-full space-y-6">
                <View className="bg-green-100 rounded-full h-[120px] w-[120px] flex justify-center items-center">
                  <EvilIcons name="heart" size={100} color="green" />
                </View>
                <Text className='text-xl font-thin'>
                  Tu lista de deseos está vacía
                </Text>
                <Text className='text-[16px] font-thin text-[#807D7E] w-3/4 text-balance text-center'>
                  Aún no tienes ningún producto en la lista de deseos.
                  Encontrará muchos productos interesantes en nuestra página Tienda.
                </Text>
              </View>
            )}
        </View>
      </ScrollView>
        :
        <View className="flex flex-col items-center justify-center h-full">
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
      }
    </Screen>
  )
}

export default FavoritesScreen