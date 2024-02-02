import { View, Text, Modal, Dimensions, Button, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native';

export const ModalError = ({ visible, text, handleClose }) => {
  const animation = useRef(null);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View className="flex-col items-center justify-center py-10 space-y-8" style={{ backgroundColor: 'white', padding: 20, borderRadius: 25, width: Dimensions.get('window').width - 20 }}>
          <LottieView
            ref={animation}
            loop={false}
            style={{
              width: 150,
              height: 150,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={{ uri: 'https://lottie.host/b96f6903-95a7-4c0b-b04f-bf4c33767704/qzS93TT65s.json' }}
          />
          <Text className="text-xl font-bold">{text}</Text>
          <TouchableOpacity className="text-white bg-black" onPress={() => handleClose()} style={{ padding: 10, borderRadius: 10 }}>
            <Text className="text-white">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalError;