import { View, SafeAreaView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';


const Screen = ({ children }) => {
  return (
    <SafeAreaView className="bg-[#FFFFFF]">
      <StatusBar style="light" />
      <View className="px-7 w-full">
        {children}
      </View>
    </SafeAreaView>
  )
}

export default Screen