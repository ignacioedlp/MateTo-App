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
import Carousel, { Pagination } from 'react-native-snap-carousel';
import apiServices from '../utils/apiServices';
import LoadingModal from '../components/Loader.jsx';
import ModalError from '../components/ModalError.jsx';

/* 
{ "author": { "id": 36, "name": "Mateando" }, "authorId": 36, "category": { "name": "metalico" }, "categoryId": 9, "colors": [{ "hex": "#F7FAFC", "name": "white" }, { "hex": "#F687B3", "name": "pink" }], "comments": [], "createdAt": "2024-01-15T22:14:43.895Z", "description": "Lleva a la argentina siempre", "id": 26, "imageUrls": ["https://vjfkuwaqdwqtqgpmbldg.supabase.co/storage/v1/object/public/cms_mateto/vendors/36/150120241442_bombillas_y_mates_uruguayos_1692299994_3171564685388133308_3449486550.heic"], "price": 20000, "published": true, "ratings": [], "sizes": [{ "name": "M" }, { "name": "L" }, { "name": "XXL" }], "stock": 98, "title": "Termos seleccion", "type": { "name": "termos" }, "typeId": 10, "updatedAt": "2024-01-16T01:41:08.493Z" } */


const screenWidth = Dimensions.get('window').width;

const ProductScreen = ({ route }) => {
  const { productId } = route.params
  const navigation = useNavigation();
  const animation = useRef(null);
  const { user, token } = useAuth();

  const [mate, setMate] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const increment = () => {
    if (mate.stock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addCart = async (id) => {
    try {
      setLoading(true);
      await apiServices.user.cart.addToCart({
        userAuthToken: token,
        data: {
          productId: productId,
          quantity: quantity
        },
      }).request
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error al agregar al carrito:', error);
    }
  }

  const addToFavorites = async () => {
    await apiServices.user.favorites.addToFavorites({
      userAuthToken: token,
      productId: productId,
    }).request
  }

  const removeToFavorites = async () => {
    await apiServices.user.favorites.deleteFromFavorites({
      userAuthToken: token,
      productId: productId,
    }).request
  }

  const handleAction = async (isFavorite) => {
    setLoading(true);
    if (isFavorite) {
      try {
        await addToFavorites();
      } catch (err) {
        console.error("Error al agregar a favoritos:", err);
        setError(true);
        setIsFavorite(false);
      }
    } else {
      try {
        await removeToFavorites();
      } catch (err) {
        console.error("Error al agregeliminarar a favoritos:", err);
        setError(true);
        setIsFavorite(true);
      }
    }
    setLoading(false);
  }


  useEffect(() => {
    const getMate = async () => {
      const { data } = await apiServices.products.getProduct({
        userAuthToken: token,
        id: productId,
      }).request
      setMate(data);
      setIsFavorite(data.favorited);
    }
    getMate();
  }, []);


  _renderItem = ({ item, index }) => {
    return (
      <View className="flex flex-col items-center justify-center">
        <Image source={{ uri: item }} width={screenWidth} height={screenWidth + 40} />
      </View>
    );
  }


  return (
    <View className="bg-[#FFFFFF]">
      {mate ? <ScrollView className="h-full bg-white" showsVerticalScrollIndicator={false}>

        <View className="relative">
          <View className="absolute top-0 left-0 right-0 z-10 flex flex-row items-center justify-between mx-5 mt-12">
            <TouchableOpacity className="flex flex-row justify-center items-center h-[55px] w-[55px] bg-black rounded-full " onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row justify-center items-center h-[55px] w-[55px] bg-white rounded-full " onPress={() => {
              setIsFavorite(!isFavorite)
              handleAction(!isFavorite)
            }}>
              {isFavorite ? <Ionicons name="heart" size={30} color="red" /> : <Ionicons name="heart-outline" size={30} color="black" />}
            </TouchableOpacity>
          </View>


          <Carousel
            data={mate.imageUrls}
            renderItem={_renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            onSnapToItem={(index) => setActiveSlide(index)}
          />

          <View className="absolute left-0 right-0 bottom-1">
            <Pagination
              dotsLength={mate.imageUrls.length}
              activeDotIndex={activeSlide}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'white'
              }}
              inactiveDotStyle={{
                // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}

            />
          </View>


        </View>
        <View className="flex flex-col -top-4 items-start justify-center px-8 py-8 bg-white rounded-t-[20px] space-y-8 ">
          <View className="flex flex-row items-center justify-between w-full">
            <View className="flex flex-col">
              <Text className="text-2xl font-bold">{mate.title}</Text>
              <Text className="text-sm text-[#666666] capitalize">{mate.author.name}</Text>
            </View>
            <View className="flex flex-col items-end ">
              <View className="flex-row items-center bg-[#F3F4F6] rounded-full mb-2">
                <TouchableOpacity onPress={decrement} className="p-2">
                  <Entypo name="minus" size={24} color="black" />
                </TouchableOpacity>
                <Text className="mx-2 text-lg">{quantity}</Text>
                <TouchableOpacity onPress={increment} className="p-2">
                  <Entypo name="plus" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Text className="text-sm font-bold">{
                mate.stock > 0 ? "Hay Stock" : "Sin Stock"
              }</Text>

            </View>
          </View>
          <View className="flex flex-col justify-center w-full h-20 space-y-3">
            <Text className="text-xl font-bold">Tamaño</Text>
            <View className="flex flex-row items-center justify-between w-full ">
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={mate.sizes}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => setSelectedSize(item)} className={`flex flex-col items-center justify-center border border-[#666666] rounded-full w-10 h-10 mr-4 ${selectedSize?.name === item.name ? "bg-black" : "bg-white"}`}>
                    <Text className={`text-sm font-bold ${selectedSize?.name === item.name ? "text-white" : "text-[#666666]"}`}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <View className="flex-row items-center w-[140px]">
                <FlatList
                  horizontal
                  inverted
                  showsHorizontalScrollIndicator={false}
                  data={mate.colors}
                  keyExtractor={item => item.name}
                  renderItem={({ item }) => (
                    <TouchableOpacity className={`flex flex-col items-center justify-center w-8 h-8 ml-4 rounded-full ${item.name === "white" && "border-2"}`} onPress={() => setSelectedColor(item)} style={{ backgroundColor: item.hex }}>
                      {
                        selectedColor?.name === item.name ? <MaterialIcons name="check" size={20} color={
                          item.name === "white" ? "black" : "white"
                        } /> : null
                      }
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </View>
          <View className="flex flex-col h-24 space-y-2">
            <Text className="text-xl font-bold">Descripcion</Text>
            <Text className="text-sm text-[#666666]">{mate.description}</Text>
          </View>

          <View className="flex flex-row justify-between w-full h-16 iteullms-start ">
            <View className="flex flex-col items-start justify-center h-16 ">
              <Text className="text-sm text-[#666666] ">Precio total</Text>
              <Text className="text-2xl font-[800]">{Math.round(mate.price * quantity).toLocaleString(
                "en-US",
                { style: "currency", currency: "USD" }
              )}</Text>
            </View>
            <TouchableOpacity className=" bg-black h-[60px] space-x-4 px-9 flex flex-row items-center justify-center rounded-full" onPress={() => addCart()}>
              <Ionicons name="cart-outline" size={30} color="white" />
              <Text className="text-xl font-bold text-white">Agregar</Text>
            </TouchableOpacity>
          </View>
        </View>

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
      <LoadingModal visible={loading} text="Cebando..." />
      <ModalError visible={error} text="Error, vuelve a intentarlo!" handleClose={() => setError(false)} />
    </View>
  )
}

export default ProductScreen