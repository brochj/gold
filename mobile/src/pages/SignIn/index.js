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
  ImageBackground
} from 'react-native';
import { signInRequest } from '~/store/modules/auth/actions';

import bg from '~/assets/signin.jpeg'

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSignIn() {
    dispatch(signInRequest(email, password));
  }

  function handleSignUp() {
    navigation.navigate('')
  }

  const passwordRef = useRef(null);

  return (
    <ImageBackground source={bg} style={{ width: '100%', height: '100%' }
    }>
      <View style={styles.container}>
        <View style={styles.body}>
          {
            email.length > 0 &&
            <Text style={styles.labelTxt}>Email</Text>
          }
          <TextInput
            style={styles.input}
            blurOnSubmit={false}
            placeholder="Digite seu email"
            returnKeyType="next"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text.toLowerCase())}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          {
            password.length > 0 &&
            <Text style={styles.labelTxt}>Senha</Text>
          }
          <TextInput
            ref={passwordRef}
            style={styles.input}
            secureTextEntry
            maxLength={20}
            placeholder="Digite sua senha"
            value={password}
            onChangeText={text => setPassword(text)}
            onSubmitEditing={() => { }}
          />
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
    </ImageBackground >
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
  input: {
    height: 50,
    marginBottom: 10,
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
    color: '#196A65',
    fontSize: 17,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
    shadowColor: "#000",
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
    shadowColor: "#000",
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
