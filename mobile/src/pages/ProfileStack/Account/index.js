import React, { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Input,
  Body,
  Headline,
  Footer,
  Label,
  Button,
} from './styles';

import { updateRequest } from '~/store/modules/user/actions';

function EyeIcon({ showPassword, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.passwordIcon}
    >
      <Icon
        name={showPassword ? 'visibility' : 'visibility-off'}
        size={25}
        color="rgba(0,0,0,0.6)"
      />
    </TouchableOpacity>
  )
}

export default function Account({ navigation }) {
  const dispatch = useDispatch();

  const nameInit = useSelector(state => state.user.name);
  const emailInit = useSelector(state => state.user.email);

  const [name, setName] = useState(nameInit);
  const [email, setEmail] = useState(emailInit);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [changePassword, setChangePassword] = useState(false);


  const pageRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const weightRef = useRef();
  const heightRef = useRef();
  const birthdayRef = useRef();
  const genderRef = useRef();


  function handleUserUpdate() {
    dispatch(
      updateRequest({
        email,
      })
    );
  }

  return (
    <Container>
      <ScrollView>

        <View style={styles.animatedView}>
          <Headline>Nome</Headline>
          <Body>
            <Input
              ref={nameRef}
              value={name}
              placeholder="Digite seu nome"
              onChangeText={text => setName(text.trim())}
              textAlign="center"
              autoCompleteType="name"
              returnKeyType="next"
              // blurOnSubmit={false}
              onSubmitEditing={() => emailRef.current.focus()}
            />
          </Body>
        </View>

        <View style={styles.animatedView}>
          <Headline>Email</Headline>
          <Body>
            <Input
              ref={emailRef}
              value={email}
              placeholder="Digite seu email"
              autoCapitalize="none"
              onChangeText={text => setEmail(text.trim())}
              textAlign="center"
              returnKeyType="next"
              autoCorrect={false}
              autoCompleteType="email"
              keyboardType="email-address"
            // blurOnSubmit={false}
            // onSubmitEditing={() => setPage(2)}
            />
          </Body>
        </View>

        {changePassword ?

          (
            <>
              <View style={styles.animatedView}>
                <Headline>Senha atual</Headline>
                <Body>
                  <Input
                    ref={oldPasswordRef}
                    value={oldPassword}
                    placeholder="Digite uma senha"
                    secureTextEntry={!showOldPassword}
                    onChangeText={text => setOldPassword(text.trim())}
                    textAlign="center"
                    returnKeyType="next"
                    autoCorrect={false}
                    autoCapitalize="none"
                    autoCompleteType="password"
                    blurOnSubmit={false}
                    onSubmitEditing={() => passwordRef.current.focus()}
                  />
                  <EyeIcon
                    showPassword={showOldPassword}
                    onPress={() => setShowOldPassword(!showOldPassword)}
                  />
                </Body>
              </View>

              <View style={styles.animatedView}>
                <Headline>Sua nova senha</Headline>
                <Body>
                  <Input
                    ref={passwordRef}
                    value={password}
                    placeholder="Digite uma senha"
                    secureTextEntry={!showPassword}
                    onChangeText={text => setPassword(text.trim())}
                    textAlign="center"
                    returnKeyType="next"
                    autoCorrect={false}
                    autoCapitalize="none"
                    autoCompleteType="password"
                    blurOnSubmit={false}
                    onSubmitEditing={() => confirmPasswordRef.current.focus()}
                  />

                  <EyeIcon
                    showPassword={showPassword}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                </Body>
              </View>

              <View style={styles.animatedView}>
                <Headline>Confirme a nova senha</Headline>
                <Body>
                  <Input
                    ref={confirmPasswordRef}
                    value={confirmPassword}
                    placeholder="Digite uma senha"
                    secureTextEntry={!showConfirmPassword}
                    onChangeText={text => setConfirmPassword(text.trim())}
                    textAlign="center"
                    returnKeyType="next"
                    autoCorrect={false}
                    autoCapitalize="none"
                    autoCompleteType="password"
                  // blurOnSubmit={false}
                  // onSubmitEditing={() => setPage(3)}
                  />
                  <EyeIcon
                    showPassword={showConfirmPassword}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </Body>
              </View>
            </>
          )
          :
          (<Button
            onPress={() => setChangePassword(true)}
            color="#196d84"
          >
            <Label>Alterar minha senha</Label>
          </Button>)
        }


        <Button onPress={() => navigation.navigate('SignIn')}>
          <Label>Atualizar</Label>
        </Button>
      </ScrollView>
      {/* <Footer>
      </Footer> */}
    </Container>
  );
}

Account.navigationOptions = {
  header: null,
};

Account.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    padding: 15,
  },
  passwordIcon: {
    position: 'absolute',
    zIndex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
