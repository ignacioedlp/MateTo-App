import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiServices from '../utils/apiServices';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');

      if (user && token) {
        setUser(JSON.parse(user));
        setToken(token);
      }
    }

    getUser();

  }, []);



  const signInWithApi = async (email, password) => {
    try {
      const { data } = await apiServices.auth.login({
        data: {
          "email": email,
          "password": password
        }
      }).request


      const { user, token } = data;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      setToken(token);
    }
    catch (error) {
      console.log(error);
    }
  }

  const signUpWithApi = async (email, password, passwordConfirmation, name, otp, username) => {
    try {
      const { data } = await apiServices.auth.register({
        data: {
          "email": email,
          "password": password,
          "passwordConfirmation": passwordConfirmation,
          "name": name,
          "otp": otp,
          "username": username
        }
      }).request
    }
    catch (error) {
      console.log(error);
    }
  }

  const signOut = () => {
    setUser(null);
    setToken(null);
  }


  return (
    <AuthContext.Provider value={{
      user,
      error,
      signInWithApi,
      signOut,
      signUpWithApi,
      token
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
};