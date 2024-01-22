import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native';


const SignUpScreen = () => {

  const { signUpWithApi } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');


  const register = () => {
    signUpWithApi(email.toLowerCase(), password.toLowerCase(), passwordConfirmation.toLowerCase());
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="PasswordConfirmation"
        onChangeText={setPasswordConfirmation}
        value={passwordConfirmation}
      />
      <Button style={styles.button} title="Login" onPress={register} />
      <Button style={styles.button} title="I have an account" onPress={
        () => navigation.navigate('Login')
      } />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    width: '50%',
    marginTop: 20,
  },
});


export default SignUpScreen