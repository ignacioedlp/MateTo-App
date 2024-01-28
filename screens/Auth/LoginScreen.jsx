import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import MatetoLogo from '../../constants/svgs/MatetoLogo.js';
import Screen from '../../templates/Screen';
import AntDesign from '@expo/vector-icons/AntDesign.js';
import Entypo from '@expo/vector-icons/Entypo.js';


const LoginScreen = () => {

  const { signInWithApi } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const login = () => {
    signInWithApi(email.toLowerCase(), password);
  }

  return (
    <Screen>
      <View className="flex flex-col justify-around h-full py-16">
        <View className="flex flex-col items-center justify-center">
          <View>
            <MatetoLogo />
          </View>
        </View>
        <View className="flex flex-col items-start justify-center space-y-10">
          <View className="flex flex-col space-y-4">
            <Text className="text-[24px] font-bold">Bienvenido!</Text>
            <Text className="text-[16px] ">Ingresa o crea una cuenta para continuar en la app</Text>
          </View>
          <View className="flex flex-col w-full space-y-8">
            <View className="flex flex-col pb-3 space-y-2 border-b-2">
              <Text className="text-[16px]  font-bold">Email</Text>
              <TextInput
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                className="text-[16px] "
              />
            </View>
            <View className="flex flex-col pb-3 space-y-2 border-b-2">
              <Text className="text-[16px]  font-bold">Contraseña</Text>
              <TextInput
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                className="text-[16px]"
              />
            </View>
          </View>
        </View>
        <View className="flex flex-col items-center justify-center gap-4">
          <TouchableOpacity className="w-full bg-black h-[55px] items-center justify-center rounded-full" onPress={() => login()}>
            <Text className="text-xl font-medium text-white">Iniciar sesion</Text>
          </TouchableOpacity>
          <View className="w-[348px] h-[19px] flex flex-row justify-center items-center">
            <View className="grow shrink basis-0 h-[2px] border w-1/2 mx-2"></View>
            <Text className="text-base font-normal text-black">O</Text>
            <View className="grow shrink basis-0 h-[2px] border w-1/2 mx-2"></View>
          </View>
          <TouchableOpacity className="w-full border-black border-2 h-[55px] items-center justify-center rounded-full flex flex-row space-x-3" onPress={() => login()}>
            <AntDesign name="google" size={24} color="black" />
            <Text className="text-xl font-medium ">Continuar con google</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-full border-black border-2 h-[55px] items-center justify-center rounded-full flex flex-row space-x-3" onPress={() => navigation.navigate('Login')}>
            <Entypo name="twitter" size={24} color="black" />
            <Text className="text-xl font-medium ">Continuar con twitter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>

  );
};


export default LoginScreen