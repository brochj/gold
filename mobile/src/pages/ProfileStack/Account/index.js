import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, StyleSheet, View, ScrollView } from 'react-native';

import EyeIcon from '~/components/EyeIcon';
import { Container, Input, Body, Headline, Label, Button } from './styles';

import { updateRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

export default function Account() {
  const dispatch = useDispatch();

  const nameInit = useSelector(state => state.user.name);
  const emailInit = useSelector(state => state.user.email);
  const loading = useSelector(state => state.user.loading);

  const [name, setName] = useState(nameInit);
  const [email, setEmail] = useState(emailInit);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [changePassword, setChangePassword] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  function handleUserUpdate() {
    dispatch(
      updateRequest({
        name,
        email,
      })
    );
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }

  function handleSignOut() {
    dispatch(signOut());
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
            />
          </Body>
        </View>

        {changePassword ? (
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
                />
                <EyeIcon
                  showPassword={showConfirmPassword}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </Body>
            </View>
          </>
        ) : (
          <Button onPress={() => setChangePassword(true)} color="#196d84">
            <Label>Alterar minha senha</Label>
          </Button>
        )}

        <Button disabled={loading} onPress={handleUserUpdate}>
          {loading ? <ActivityIndicator /> : <Label>Atualizar</Label>}
        </Button>
        <Button color="#fafafa" disabled={loading} onPress={handleSignOut}>
          <Label style={{ color: '#196a65' }}>Sair da Conta</Label>
        </Button>
      </ScrollView>
    </Container>
  );
}

Account.navigationOptions = {
  header: null,
  title: 'Minha Conta',
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
