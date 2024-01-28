import { View, Button, Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Screen from '../../templates/Screen';
import MateIcon from '../../constants/svgs/MateIcon.js';
import MatetoLogo from '../../constants/svgs/MatetoLogo.js';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen>
      <View className="flex flex-col justify-between h-full py-16">
        <View className="flex flex-col items-center justify-center">
          <View className="my-6">
            <MateIcon />
          </View>
          <View>
            <MatetoLogo />
          </View>
        </View>
        <View className="flex flex-col items-center justify-center gap-4">
          <TouchableOpacity className="w-full bg-black h-[55px] items-center justify-center rounded-full" onPress={() => navigation.navigate('Login')}>
            <Text className="text-xl font-medium text-white">Iniciar sesion</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-full border-black border-2 h-[55px] items-center justify-center rounded-full" onPress={() => navigation.navigate('SignUp')}>
            <Text className="text-xl font-medium ">Registrarme</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};


export default WelcomeScreen