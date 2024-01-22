import {
  View, Text, TouchableOpacity, ScrollView
} from 'react-native'
import React, { useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import Screen from '../templates/Screen';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import apiServices from '../utils/apiServices';

const ComingSoonScreen = () => {
  const navigation = useNavigation();
  const animation = useRef(null);

  return (
    <Screen>
      <ScrollView className="h-full space-y-8 bg-white" showsVerticalScrollIndicator={false}>
        <View className="flex flex-row items-center justify-between ">
          <TouchableOpacity className="flex flex-row justify-center items-center h-[55px] w-[55px] bg-black rounded-full " onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex flex-col items-center justify-center h-full space-y-4 bg-white">
          <Text className="text-2xl font-bold uppercase">Proximamente!</Text>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 150,
              height: 150,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={{ uri: 'https://lottie.host/c347a01b-7544-489f-a889-bc6017eb6ea2/euwpGrghxm.json' }}
          />
        </View>
      </ScrollView>
    </Screen>
  )
}

export default ComingSoonScreen

//https://lottie.host/f9b38eb3-4010-43a6-8f28-966b7ab07bdd/PDs8HFYk3S.json


