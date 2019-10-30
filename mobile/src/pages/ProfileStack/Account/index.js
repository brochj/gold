import React, { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { format, differenceInYears } from 'date-fns';
import pt from 'date-fns/locale/pt';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Input,
  Body,
  Headline,
  Footer,
  Label,
  Button,
  BirthdayText,
  BirthdayButton,
  Gender,
  GenderText,
  Age,
} from './styles';

import { createRequest } from '~/store/modules/user/actions';

export default function Account({ navigation }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [page, setPage] = useState(0);
  const [showDate, setShowDate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const signed = useSelector(state => state.auth.signed);


  const pageRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const weightRef = useRef();
  const heightRef = useRef();
  const birthdayRef = useRef();
  const genderRef = useRef();



  // useEffect(() => {
  //   switch (page) {
  //     case 0:
  //       nameRef.current.focus();
  //       break;
  //     case 1:
  //       emailRef.current.focus();
  //       break;
  //     case 2:
  //       passwordRef.current.focus();
  //       break;
  //     case 3:
  //       heightRef.current.focus();
  //       break;
  //     case 4:
  //       weightRef.current.focus();
  //       break;
  //     case 5:

  //     default:
  //       break;
  //   }
  // }, [page]);

  function handleSignUp() {
    dispatch(
      createRequest({
        name,
        email,
        password,
        birthday: format(birthday, "yyyy-MM-dd'T00:00:00.000Z'"),
        weight: weight.replace(',', '.'),
        height,
        gender,
      })
    );
  }


  const age = useMemo(() => {
    const years = differenceInYears(new Date(), birthday);
    return `${years} anos`;
  }, [birthday]);

  return (
    <Container>
      <ScrollView>

        <View style={styles.animatedView}>
          <Headline>Qual o seu nome?</Headline>
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
              onSubmitEditing={() => setPage(1)}
            />
          </Body>
        </View>

        <View style={styles.animatedView}>
          <Headline>Seu melhor email</Headline>
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
              blurOnSubmit={false}
              onSubmitEditing={() => setPage(2)}
            />
          </Body>
        </View>

        <View style={styles.animatedView}>
          <Headline>Digite uma Senha</Headline>
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
              onSubmitEditing={() => setPage(3)}
            />
          </Body>
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.passwordIcon}
          >
            <Icon
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={30}
              color="rgba(0,0,0,0.6)"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.animatedView}>
          <Headline>Qual a sua Altura?</Headline>
          <Body>
            <Input
              ref={heightRef}
              value={height}
              placeholder="  cm"
              onChangeText={text => setHeight(text.replace(/[^0-9]+/g, ''))}
              textAlign="center"
              keyboardType="phone-pad"
              returnKeyType="next"
              blurOnSubmit={false}
              maxLength={3}
              onSubmitEditing={() => setPage(4)}
            />
          </Body>

        </View>

        <View style={styles.animatedView}>
          <Headline>Qual seu Peso atual?</Headline>
          <Body>
            <Input
              ref={weightRef}
              value={weight}
              placeholder="  kg"
              onChangeText={text => setWeight(text.replace(/[^0-9;,]+/g, ''))}
              textAlign="center"
              maxLength={5}
              keyboardType="phone-pad"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => setPage(5)}
            />
          </Body>

        </View>

        <View style={styles.animatedView}>
          <Headline>Quando você nasceu?</Headline>
          <Age onPress={() => setShowDate(true)}>{age}</Age>
          <Body>
            <BirthdayButton onPress={() => setShowDate(true)}>
              <BirthdayText>
                {format(birthday, 'dd/MM/yyyy', { locale: pt })}
              </BirthdayText>
            </BirthdayButton>
            {showDate && (
              <DateTimePicker
                isVisible={showDate}
                date={birthday}
                mode="date"
                display="spinner"
                datePickerModeAndroid="spinner"
                onConfirm={date => {
                  setBirthday(date);
                  setShowDate(false);
                }}
                onCancel={() => setShowDate(false)}
                maximumDate={new Date()}
                minimumDate={new Date(1930, 1, 1)}
              />
            )}
          </Body>

        </View>

        <View style={styles.animatedView}>
          <Headline>Qual o seu Sexo?</Headline>
          <Body>
            <Gender
              active={gender === 'female'}
              onPress={() => {
                setGender('female');
              }}
            >
              <GenderText active={gender === 'female'}>Feminino</GenderText>
            </Gender>

            <Gender
              active={gender === 'male'}
              onPress={() => {
                setGender('male');
              }}
            >
              <GenderText active={gender === 'male'}>Masculino</GenderText>
            </Gender>
          </Body>

        </View>
      </ScrollView>
      <Footer>
        <Button onPress={() => navigation.navigate('SignIn')}>
          <Label>Já tenho uma Conta</Label>
        </Button>
      </Footer>
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
    zIndex: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: -40,
  },
});
