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
import { MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { FontAwesome } from '@expo/vector-icons';
import apiServices from '../utils/apiServices';

/* { "createdAt": "2024-01-12T02:49:16.606Z", "email": "admin@mateto.com", "id": 34, "imageProfile": "https://vjfkuwaqdwqtqgpmbldg.supabase.co/storage/v1/object/public/cms_mateto/users/34_130120243921_Logo Tofi.png", "name": "Admin", "roleId": 5, "updatedAt": "2024-01-15T22:02:51.883Z", "username": "Admin" } */

const screenWidth = Dimensions.get('window').width;

const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const animation = useRef(null);
  const { user, token, signOut } = useAuth();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getMate = async () => {
      const { data } = await apiServices.profile.getProfile({
        userAuthToken: token
      }).request

      setProfile(data);
    }
    getMate();
  }, []);


  return (
    <Screen className="bg-[#FFFFFF]">
      {profile ? <ScrollView className="h-full space-y-8 bg-white" showsVerticalScrollIndicator={false}>
        <View className="flex flex-row items-center justify-between ">
          <TouchableOpacity className="flex flex-row justify-center items-center h-[55px] w-[55px]  rounded-full" onPress={() => signOut()}>
            <Ionicons name="log-out-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row justify-center items-center h-[55px] w-[55px]  rounded-full">
            <Ionicons name="settings-outline" size={30} color="black" />
          </TouchableOpacity>

        </View>
        <View className="flex flex-col items-center justify-center">
          <View className="flex flex-col items-center justify-center w-full h-24 space-y-3">
            <Image source={{ uri: user.imageProfile }} width={100} height={100} className=" rounded-xl" />
            <Text className="text-lg font-bold text-black">Subir imagen</Text>
          </View>
        </View>
        <View className="flex flex-col items-center justify-center">
          <View className="flex flex-row items-center w-full h-16 ">
            <Text className="text-lg font-bold text-[#666666] w-1/3">Nombre</Text>
            <View className="w-2/3 border-b border-[#666666] pb-2">
              <TextInput className="text-lg font-medium text-black" value={profile.name} />
            </View>
          </View>
          <View className="flex flex-row items-center w-full h-16 ">
            <Text className="text-lg font-bold text-[#666666] w-1/3">Email</Text>
            <View className="w-2/3 border-b border-[#666666] pb-2">
              <TextInput className="text-lg font-medium text-black" value={profile.email} />
            </View>
          </View>
          <View className="flex flex-row items-center w-full h-16">
            <Text className="text-lg font-bold text-[#666666] w-1/3">Usuario</Text>
            <View className="w-2/3 border-b border-[#666666] pb-2">
              <TextInput className="text-lg font-medium text-black" value={profile.username} />
            </View>
          </View>
        </View>

        <View className="flex flex-col items-start justify-start h-min border border-[#666666] rounded-3xl px-5 py-5">

          <TouchableOpacity className="flex flex-row items-center justify-between w-full h-16 " onPress={() => navigation.navigate('StackProfile', { screen: 'Purchases' })}>
            <View className="flex flex-row items-center w-2/3 space-x-4">
              <View className="flex items-center justify-center bg-[#EEEEEE] rounded-xl h-10 w-10">
                <Ionicons name="bag" size={24} color="black" />
              </View>
              <Text className="text-lg font-bold ">Compras</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center justify-between w-full h-16 " onPress={() => navigation.navigate('StackProfile', { screen: 'Cards' })}>
            <View className="flex flex-row items-center w-2/3 space-x-4">
              <View className="flex items-center justify-center bg-[#EEEEEE] rounded-xl h-10 w-10">
                <Ionicons name="card" size={24} color="black" />
              </View>
              <Text className="text-lg font-bold ">Mis tarjetas</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center justify-between w-full h-16 " onPress={() => navigation.navigate('StackProfile', { screen: 'Addresses' })}>
            <View className="flex flex-row items-center w-2/3 space-x-4">
              <View className="flex items-center justify-center bg-[#EEEEEE] rounded-xl h-10 w-10">
                <Ionicons name="location" size={24} color="black" />
              </View>
              <Text className="text-lg font-bold ">Direcciones</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center justify-between w-full h-16 " onPress={() => navigation.navigate('StackProfile', { screen: 'ChangePassword' })}>
            <View className="flex flex-row items-center w-2/3 space-x-4">
              <View className="flex items-center justify-center bg-[#EEEEEE] rounded-xl h-10 w-10">
                <MaterialIcons name="password" size={24} color="black" />
              </View>
              <Text className="text-lg font-bold ">Cambiar contraseña</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center justify-between w-full h-16 " onPress={() => navigation.navigate('StackSettings', { screen: 'Settings' })}>
            <View className="flex flex-row items-center w-2/3 space-x-4">
              <View className="flex items-center justify-center bg-[#EEEEEE] rounded-xl h-10 w-10">
                <Ionicons name="settings" size={24} color="black" />
              </View>
              <Text className="text-lg font-bold ">Ajustes</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex flex-col items-start justify-start h-min border border-[#666666] rounded-3xl px-5 py-5">

          <TouchableOpacity className="flex flex-row items-center justify-between w-full h-16 " onPress={() => navigation.navigate('StackInformation', { screen: 'Faqs' })}>
            <View className="flex flex-row items-center w-2/3 space-x-4">
              <View className="flex items-center justify-center bg-[#EEEEEE] rounded-xl h-10 w-10">
                <Ionicons name="information-circle-sharp" size={24} color="black" />
              </View>
              <Text className="text-lg font-bold ">FAQs</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center justify-between w-full h-16 " onPress={() => navigation.navigate('StackInformation', { screen: 'Privacy' })}>
            <View className="flex flex-row items-center w-2/3 space-x-4">
              <View className="flex items-center justify-center bg-[#EEEEEE] rounded-xl h-10 w-10">
                <MaterialIcons name="security" size={24} color="black" />
              </View>
              <Text className="text-lg font-bold ">Politicas de privacidad</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center justify-between w-full h-16 " onPress={() => navigation.navigate('StackInformation', { screen: 'Terms&conditions' })}>
            <View className="flex flex-row items-center w-2/3 space-x-4">
              <View className="flex items-center justify-center bg-[#EEEEEE] rounded-xl h-10 w-10">
                <FontAwesome name="legal" size={24} color="black" />
              </View>
              <Text className="text-lg font-bold ">T&C</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center justify-between w-full h-16 " onPress={() => navigation.navigate('StackInformation', { screen: 'Contact' })}>
            <View className="flex flex-row items-center w-2/3 space-x-4">
              <View className="flex items-center justify-center bg-[#EEEEEE] rounded-xl h-10 w-10">
                <Ionicons name="call" size={24} color="black" />
              </View>
              <Text className="text-lg font-bold ">Contactanos</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex flex-col items-center justify-center h-8" />
      </ScrollView>
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
    </Screen>
  )
}

export default ProfileScreen