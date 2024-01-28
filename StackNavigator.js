import React from 'react'
import { Ionicons } from '@expo/vector-icons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Main screens
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import ProductScreen from './screens/ProductScreen';

// Auth screens
import WelcomeScreen from './screens/Auth/WelcomeScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import SignUpScreen from './screens/Auth/SignUpScreen';

//Hooks
import useAuth from './hooks/useAuth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import { View, Text } from 'react-native'
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import ComingSoonScreen from './templates/ComingSoon';

const EmptyScreen = () => {
  return (
    <View>
      <Text>StackNavigator</Text>
    </View>
  )
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function ProductsStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Products" component={ProductsScreen} />
    </Stack.Navigator>
  );
}

function TabsScreen() {
  const role = false;
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'StackHome') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        } else if (route.name === 'StackProducts') {
          iconName = focused ? 'bag' : 'bag-remove-outline';
        } else if (route.name === 'Favorite') {
          iconName = focused ? 'heart' : 'heart-outline';
        }
        else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'black',
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: 'white',
        elevation: 10,
        shadowColor: '#000',
        shadowRadius: 30,
        shadowOpacity: 0.2,
        height: 90,
      },
      headerShown: false,
    })}>
      <Tab.Screen name="StackHome" component={HomeStack} />
      <Tab.Screen name="StackProducts" component={ProductsStack} />
      <Tab.Screen name="Favorite" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

function StackSettings() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Settings" component={ComingSoonScreen} />
      <Stack.Screen name="Notifications" component={ComingSoonScreen} />
    </Stack.Navigator>
  );
}

function StackProfile() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Purchases" component={ComingSoonScreen} />
      <Stack.Screen name="Cards" component={ComingSoonScreen} />
      <Stack.Screen name="Addresses" component={ComingSoonScreen} />
      <Stack.Screen name="ChangePassword" component={ComingSoonScreen} />
    </Stack.Navigator>
  );
}

function StackInformation() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="Faqs" component={ComingSoonScreen} />
      <Stack.Screen name="Privacy" component={ComingSoonScreen} />
      <Stack.Screen name="Terms&conditions" component={ComingSoonScreen} />
      <Stack.Screen name="Contact" component={ComingSoonScreen} />
    </Stack.Navigator>
  );
}

export default function StackNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabsScreen}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductScreen}
          />
          <Stack.Screen
            name="StackSettings"
            component={StackSettings}
          />
          <Stack.Screen
            name="StackProfile"
            component={StackProfile}
          />
          <Stack.Screen
            name="StackInformation"
            component={StackInformation}
          />
        </>
      ) : (
        <>

          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}
