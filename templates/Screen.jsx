import { View, SafeAreaView, Platform } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';


const Screen = ({ children }) => {
  return (
    <SafeAreaView className={`bg-[#FFFFFF] ${Platform.OS === "android" && "pt-10"}`}>
      <StatusBar style="light" />
      <View className="w-full px-7">
        {children}
      </View>
    </SafeAreaView>
  )
}

export default Screen