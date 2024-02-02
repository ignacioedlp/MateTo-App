import { View, Text, Button, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import Screen from '../templates/Screen';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import api from "../utils/apiServices"
import PriceRange from '../components/PriceRange';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, token } = useAuth();

  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [range, setRange] = useState({
    priceMin: 0,
    priceMax: 100000,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [section, setSection] = useState("news");

  const snapPoints = useMemo(() => ['85%'], []);

  const bottomSheetRef = useRef(null);

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
  }

  const handleOpenPress = () => {
    bottomSheetRef.current?.snapToIndex(0);
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

  useEffect(() => {
    fetchProducts();
    getSettings();
  }, [token]);

  /* useEffect(() => {
    fetchProducts()
  }, [selectedType, selectedCategory, range, selectedColors, selectedSizes, currentPage]); */



  return (
    <Screen>
      <ScrollView className="h-full space-y-10" showsVerticalScrollIndicator={false}>
        <View className="flex flex-row items-center justify-between ">
          <TouchableOpacity className="flex flex-row justify-center items-center h-[55px] w-[55px] bg-black rounded-full" onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={{ uri: user.imageProfile || "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" }} width={50} height={50} className="rounded-full" />
          </TouchableOpacity>

        </View>
        <View className="flex flex-col items-start">
          <Text className="text-3xl font-bold text-center">Bienvenido,</Text>
          <Text className="text-xl font-bold text-center text-[#666666]">a tu app matera.</Text>
        </View>
        <View className="flex flex-row items-center justify-between space-x-3">
          <View className="w-[80%] h-[66px] bg-[#F3F4F6] flex flex-row space-x-5 items-center px-6 rounded-full">
            <View>
              <AntDesign name="search1" size={24} color="black" />
            </View>
            <TextInput placeholder="Buscar" className="px-2 text-base text-[#B3B3B3]" />
          </View>
          <TouchableOpacity className="flex flex-row justify-center items-center h-[55px] w-[55px] bg-black rounded-full" onPress={() => handleOpenPress()}>
            <Ionicons name="filter" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row items-center ">
          {products.length > 0 &&
            <View className="flex flex-row justify-between items-center px-3 py-2 w-full  rounded-2xl border-[#F3F4F6] border-2">
              <View className="flex flex-row items-center space-x-3">
                <Image source={{ uri: products[0].imageUrls[0] }} className="h-[90px] w-[90px] rounded-2xl" />
                <View className="flex flex-col items-start gap-2">
                  <Text className="text-[17px] font-bold text-center text-black">{products[0].title}</Text>
                  <Text className="text-[14px] text-center text-[#666666]">{products[0].description.slice(0, 20)}...</Text>
                  <Text className="text-[16px] font-bold text-center text-black">{Math.round(products[0].price).toLocaleString(
                    "en-US",
                    { style: "currency", currency: "USD" }
                  )}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: products[0].id })} className="flex flex-row justify-center items-center h-[55px] w-[55px] bg-black rounded-2xl">
                <AntDesign name="right" size={30} color="white" />
              </TouchableOpacity>
            </View>
          }
        </View>
        <View className="flex flex-col items-start space-y-5">
          <Text className="text-xl font-bold text-center text-black">Categorias</Text>
          <ScrollView horizontal className="py-1 space-x-3" showsHorizontalScrollIndicator={false}>
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
        <View className="flex flex-col items-start space-y-5">
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="text-xl font-bold text-center text-black">Mejores productos</Text>
            <TouchableOpacity onPress={() => navigation.navigate('StackProducts')}>
              <Text className="text-sm text-center text-[#B3B3B3]">Ver mas</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row flex-wrap">

            {products.length > 0 &&
              products?.map((item, index) => (
                <TouchableOpacity className="flex flex-col items-center w-1/2 px-3 mb-8 space-y-2 rounded-2xl" key={index}
                  onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}

                >
                  <Image source={{ uri: item.imageUrls[0] }} className="h-[184px] w-full rounded-2xl  " />
                  <Text className="text-[17px] font-bold text-center text-black">{item.title}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </ScrollView>
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

const styles = StyleSheet.create({
  cardNew: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
  },
});

export default HomeScreen
