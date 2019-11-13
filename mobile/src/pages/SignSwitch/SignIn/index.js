import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

import EyeIcon from '~/components/EyeIcon';

import { signInRequest } from '~/store/modules/auth/actions';

import bg from '~/assets/signin.jpeg';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const loading = useSelector(state => state.auth.loading);

  function handleSignIn() {
    dispatch(signInRequest(email, password));
  }

  function handleSignUp() {
    navigation.navigate('SignUp');
  }

  const passwordRef = useRef(null);

  return (
    <ImageBackground source={bg} style={{ width: '100%', height: '100%' }}>
      <View style={styles.container}>
        <View style={styles.body}>
          {email.length > 0 && <Text style={styles.labelTxt}>Email</Text>}
          <TextInput
            style={styles.input}
            blurOnSubmit={false}
            placeholder="Digite seu email"
            returnKeyType="next"
            keyboardType="email-address"
            value={email}
            autoCapitalize="none"
            onChangeText={text => setEmail(text.trim())}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          {password.length > 0 && <Text style={styles.labelTxt}>Senha</Text>}
          <View style={styles.passView}>
            <TextInput
              ref={passwordRef}
              style={styles.passInput}
              value={password}
              secureTextEntry={!showPassword}
              maxLength={30}
              returnKeyType="done"
              placeholder="Digite sua senha"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={text => setPassword(text.trim())}
              onSubmitEditing={handleSignIn}
            />
            <EyeIcon
              showPassword={showPassword}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>

          <TouchableOpacity style={styles.signInbutton} onPress={handleSignIn}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonTxt}>Entrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUpbutton} onPress={handleSignUp}>
            <Text style={styles.buttonTxt}>Criar conta grátis</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  body: {
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,.4)',
    borderRadius: 3,
  },
  passView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#eee',
    height: 50,
    marginBottom: 10,

    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 50,
    marginBottom: 10,
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
    color: '#196A65',
    fontSize: 18,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  passInput: {
    flex: 1,
    borderRadius: 5,
    color: '#196A65',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },

  labelTxt: {
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
  },
  signInbutton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#196A65',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  signUpbutton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF961C',
    borderRadius: 5,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonTxt: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
