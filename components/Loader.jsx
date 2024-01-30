import { View, Text, Modal, Dimensions } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native';

export const LoadingModal = ({ visible, text }) => {
  const animation = useRef(null);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View className="flex-col items-center justify-center py-10 space-y-8" style={{ backgroundColor: 'white', padding: 20, borderRadius: 25, width: Dimensions.get('window').width / 2 }}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 60,
              height: 60,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={{ uri: 'https://lottie.host/c347a01b-7544-489f-a889-bc6017eb6ea2/euwpGrghxm.json' }}
          />
          <Text className="text-xl font-bold">{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;