import { View, Text, Button, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import Screen from '../templates/Screen';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import PriceRange from '../components/PriceRange';
import api from '../utils/apiServices';

const ProductsScreen = () => {
  const navigation = useNavigation();
  const animation = useRef(null);
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [range, setRange] = useState({
    priceMin: 0,
    priceMax: 100000,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [section, setSection] = useState("news");

  const snapPoints = useMemo(() => ['80%', '100%'], []);

  const bottomSheetRef = useRef(null);

  const handleOpenPress = () => {
    bottomSheetRef.current?.snapToIndex(0);
  }

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
  }


  const fetchProducts = async (sections) => {
    const response = await api.products.getProducts({
      userAuthToken: token,
      params: {
        type: selectedType,
        category: selectedCategory,
        priceMin: range.priceMin,
        priceMax: range.priceMax,
        colors: selectedColors,
        sizes: selectedSizes,
        pageSize: 10,
        page: currentPage
      }
    }).request

    setProducts(response.data.products)
    setTotalPages(response.data.totalPages)
  };

  const getSettings = async () => {
    const { data } = await api.settings.getSettings({
      userAuthToken: token,
    }).request
    setSettings(data);
    fetchProducts();
  }

  useEffect(() => {
    fetchProducts();
    getSettings();
  }, []);

  useEffect(() => {
    fetchProducts()
  }, [selectedType, selectedCategory, range, selectedColors, selectedSizes, currentPage]);

  const handleAddColor = color => {
    if (selectedColors.find((selectedColor) => selectedColor === color)) {
      setSelectedColors(selectedColors.filter((selectedColor) => selectedColor !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  }

  const handleAddSize = size => {
    if (selectedSizes.find((selectedSize) => selectedSize === size)) {
      setSelectedSizes(selectedSizes.filter((selectedSize) => selectedSize !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  }


  return (
    <Screen>
      {products ? <ScrollView className="h-full space-y-10" showsVerticalScrollIndicator={false}>
        <View className="flex flex-row items-center justify-between ">
          <TouchableOpacity className="flex flex-row justify-center items-center h-[55px] w-[55px] bg-black rounded-full" onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row justify-center items-center h-[55px] w-[55px] rounded-full" onPress={() => handleOpenPress()}>
            <Ionicons name="filter" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row flex-wrap">

          {products.length > 0 ?
            products?.map((item, index) => (
              <TouchableOpacity className="flex flex-col items-center w-1/2 px-3 mb-8 space-y-2 rounded-2xl" key={index} onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
                <Image source={{ uri: item.imageUrls[0] }} className="h-[184px] w-full rounded-2xl  " />
                <Text className="text-[17px] font-bold text-center text-black">{item.title}</Text>
              </TouchableOpacity>
            )) : (
              <View className="flex flex-col items-center justify-center h-full">
                <LottieView source="https://lottie.host/c347a01b-7544-489f-a889-bc6017eb6ea2/euwpGrghxm.json" autoPlay loop />
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
      <BottomSheet snapPoints={snapPoints} ref={bottomSheetRef} enablePanDownToClose={true} index={-1} >
        <View className="flex flex-col items-start justify-between px-1 space-y-7">
          <View className="flex flex-col items-start h-20 px-6">
            <Text className="mb-4 text-xl font-bold text-center text-black">Categorias</Text>
            <ScrollView horizontal className="space-x-3" showsHorizontalScrollIndicator={false}>
              <TouchableOpacity className={`flex flex-col items-center px-5 py-2 border-2 rounded-full ${!selectedType && "bg-black"}`} onPress={() => {
                setSelectedType(null)
              }}>
                <Text className={`font-bold text-center  text-md ${!selectedType && "text-white"}`}>Todos</Text>
              </TouchableOpacity>
              {
                settings?.productTypes?.map((item, index) => (
                  <TouchableOpacity className={`flex flex-col items-center px-5 py-2 border-2 rounded-full ${selectedType === item?.id && "bg-black"}`} onPress={() => {
                    setSelectedType(item.id)
                  }} key={index}>
                    <Text className={`font-bold text-center capitalize text-md ${selectedType === item?.id && "text-white"}`}>{item.name}</Text>
                  </TouchableOpacity>
                ))
              }

            </ScrollView>
          </View>
          <View className="flex flex-col items-start h-20 px-6">
            <Text className="mb-4 text-xl font-bold text-center text-black">Estilo</Text>
            <ScrollView horizontal className="space-x-3" showsHorizontalScrollIndicator={false}>
              <TouchableOpacity className={`flex flex-col items-center px-5 py-2 border-2 rounded-full ${!selectedCategory && "bg-black"}`} onPress={() => {
                setSelectedCategory(null)
              }}>
                <Text className={`font-bold text-center  text-md ${!selectedCategory && "text-white"}`}>Todos</Text>
              </TouchableOpacity>
              {
                settings?.productCategories?.map((item, index) => (
                  <TouchableOpacity className={`flex flex-col items-center px-5 py-2 border-2 rounded-full ${selectedCategory === item?.id && "bg-black"}`} onPress={() => {
                    setSelectedCategory(item.id)
                  }} key={index}>
                    <Text className={`font-bold text-center capitalize text-md ${selectedCategory === item?.id && "text-white"}`}>{item.name}</Text>
                  </TouchableOpacity>
                ))
              }

            </ScrollView>
          </View>
          <View className="flex flex-col items-start w-full h-20 px-6">
            <Text className="mb-4 text-xl font-bold text-center text-black">Rango de precio</Text>
            <PriceRange min={1} max={100000} sliderWidth={350} step={1} onValueChange={range => {
              setRange({
                priceMax: range.max,
                priceMin: range.min,
              })
            }} />
          </View>
          <View className="flex flex-col items-start w-full px-6 space-y-3 ">
            <Text className="text-xl font-bold">Tamaño</Text>
            <View className="flex flex-col items-start w-full ">
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={settings?.sizes}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleAddSize(item.id)} className={`flex flex-col items-center justify-center border border-[#666666] rounded-full w-8 h-8 mr-4 ${selectedSizes.includes(item.id) ? "bg-black" : "bg-white"}`}>
                    <Text className={`text-sm font-bold ${selectedSizes.includes(item.id) ? "text-white" : "text-[#666666]"}`}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />

            </View>
          </View>
          <View className="flex flex-col items-start w-full px-6 space-y-3">
            <Text className="text-xl font-bold">Tamaño</Text>
            <View className="flex flex-col items-start w-full">

              <FlatList
                horizontal

                showsHorizontalScrollIndicator={false}
                data={settings?.colors}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity className={`flex flex-col items-center justify-center border  rounded-full w-8 h-8 mr-4 ${item.name === "white" && "border-2"}`} onPress={() => handleAddColor(item.id)} style={{ backgroundColor: item.hex }}>
                    {
                      selectedColors.includes(item.id) ? <MaterialIcons name="check" size={20} color={
                        item.name === "white" ? "black" : "white"
                      } /> : null
                    }
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          <View className="flex flex-col items-start w-full h-20 px-6">
            <TouchableOpacity className="w-full bg-black h-[55px] items-center justify-center rounded-full" onPress={() => {
              handleClosePress();
              fetchProducts()
            }}>
              <Text className="text-xl font-medium text-white">Aplicar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </BottomSheet>
    </Screen>
  )
}

export default ProductsScreen

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  sliderBack: {
    height: 8,
    backgroundColor: '#6E6E6E',
    borderRadius: 20,
    width: 300
  },
  sliderFront: {
    height: 8,
    backgroundColor: '#000000',
    borderRadius: 20,
    width: 300,
    position: 'absolute',
  },
  thumb: {
    position: 'absolute',
    left: -10,
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderColor: "#000000",
    borderWidth: 5,
    borderRadius: 10,
  },
  label: {
    position: 'absolute',
    top: 20,
    bottom: -40,
    backgroundColor: 'black',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLabel: {
    color: "white",
    padding: 5,
    fontWeight: 'bold',
    width: "100%",
    fontSize: 16,
  }
})