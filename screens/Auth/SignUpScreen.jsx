import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';
import MatetoLogo from '../../constants/svgs/MatetoLogo.js';
import Screen from '../../templates/Screen';
import AntDesign from '@expo/vector-icons/AntDesign.js';
import Entypo from '@expo/vector-icons/Entypo.js';
import apiServices from '../../utils/apiServices.js';


const LoginScreen = () => {

  const { signUpWithApi } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [isUser, setIsUser] = useState(true);

  const register = async () => {
    await signUpWithApi(email, password, passwordConfirmation, name, otp, username, isUser);
    navigation.navigate('Login');
  }

  const getOtp = async () => {
    try {
      await apiServices.auth.verifyEmail({
        data: { email: email }
      }).request
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Screen>
      <View className="flex flex-col justify-around h-full">
        <View className="flex flex-col items-center justify-center">
          <View>
            <MatetoLogo />
          </View>
        </View>
        <ScrollView className="my-8">
          <View className="flex flex-col items-start justify-center space-y-10">
            <View className="flex flex-col space-y-4">
              <Text className="text-[24px] font-bold">Bienvenido!</Text>
              <Text className="text-[16px] ">Crea una cuenta para continuar en la app</Text>
            </View>
            <View className="flex flex-col w-full space-y-8">
              <View className="flex flex-col pb-3 space-y-2 border-b-2">
                <Text className="text-[16px]  font-bold">Su rol</Text>
                <View className="flex flex-row justify-between ">
                  <TouchableOpacity className={`items-center justify-center w-2/5 h-[55px] px-8 py-5 ${isUser ? "bg-black " : "bg-white border border-black "} rounded-full`} onPress={() => setIsUser(true)}>
                    <Text className={`font-medium text-md ${isUser ? "text-white " : "text-black"}`}>Usuario</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className={`items-center justify-center  w-2/5 h-[55px] px-8 py-5 ${!isUser ? "bg-black " : "bg-white  border border-black"} rounded-full`} onPress={() => setIsUser(false)}>
                    <Text className={`font-medium text-md ${!isUser ? "text-white " : "text-black"}`}>Vendedor</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="flex flex-col pb-3 space-y-2 border-b-2">
                <Text className="text-[16px]  font-bold">Nombre completo</Text>
                <TextInput
                  placeholder="Nombre completo"
                  onChangeText={setName}
                  value={name}
                  className="text-[16px] "
                />
              </View>
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
                <Text className="text-[16px]  font-bold">Nombre de usuario</Text>
                <TextInput
                  placeholder="Nombre de usuario"
                  onChangeText={setUsername}
                  value={username}
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
              <View className="flex flex-col pb-3 space-y-2 border-b-2">
                <Text className="text-[16px]  font-bold">Repetir contraseña</Text>
                <TextInput
                  placeholder="Repetir contraseña"
                  onChangeText={setPasswordConfirmation}
                  value={passwordConfirmation}
                  className="text-[16px]"
                />
              </View>
              <View className="flex flex-row justify-between">
                <View className="flex flex-col w-2/3 pb-3 space-y-2 border-b-2">
                  <Text className="text-[16px]  font-bold">Codigo de verificacion</Text>
                  <TextInput
                    placeholder="OTP"
                    onChangeText={setOtp}
                    value={otp}
                    className="text-[16px]"
                  />
                </View>
                <TouchableOpacity className={`items-center justify-center h-[55px] px-8 py-5 bg-black ${email === '' ? "bg-gray-400" : "bg-black"} rounded-full`} onPress={() => getOtp()} disabled={email === ''}>
                  <Text className="font-medium text-white text-md">Obtener</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <View className="flex flex-col items-center justify-center gap-4">
          <TouchableOpacity className={`w-full bg-black h-[55px] items-center justify-center rounded-full ${otp === '' ? "bg-gray-400" : "bg-black"} rounded-full`} disabled={otp === ''} onPress={() => register()}>
            <Text className="text-xl font-medium text-white">Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen >

  );
};


export default LoginScreen