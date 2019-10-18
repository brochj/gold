import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { View, Text, Dimensions } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
// import { Pages } from 'react-native-pages';
import Pages from './Pages';

import { Container, Tip, Input, Body, Page, Headline, Footer, Label, Button } from './styles';

const labels = ['Nome', 'Email', 'Peso', 'Altura', 'Data', 'Sexo'];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 5,
  currentStepStrokeWidth: 4,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#196a65',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#196a65',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#196a65',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};

export default function Name({ navigation }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [page, setPage] = useState(0);

  const pageRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const weightRef = useRef();
  const heightRef = useRef();
  const birthdayRef = useRef();
  const genderRef = useRef();

  function handleFocus(num) {
    switch (num) {
      case 0:
        nameRef.current.focus();
        break;
      case 1:
        emailRef.current.focus();
        break;
      case 2:
        weightRef.current.focus();
        break;
      case 3:
        heightRef.current.focus();
        break;

      default:
        break;
    }
  }
  function handleBack() {
    if (page - 1 >= 0) {
      setPage(page - 1)
      pageRef.current.scrollToPage(page - 1);
      handleFocus(page - 1)
    }
  }

  function handleNext() {
    if (page + 1 <= 5) {
      setPage(page + 1)
      pageRef.current.scrollToPage(page + 1);
      handleFocus(page + 1)
    }
  }


  return (
    <Container>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={page}
        labels={labels}
        stepCount={6}
        onPress={position => {
          pageRef.current.scrollToPage(position);
          setPage(position);
        }}
      />
      <Pages
        scrollEnabled={false}
        onMomentumScrollEnd={(event) => setPage(Math.round(parseFloat(event.nativeEvent.contentOffset.x / Dimensions.get('window').width)))}
        indicatorPosition="none"
        ref={pageRef}
      // onScrollStart={index => setPage(index)}
      // onScrollEnd={index => setPage(index)}
      >
        <Page>
          <Headline>Qual o seu nome?</Headline>
          <Body>
            <Input
              ref={nameRef}
              value={name}
              placeholder="Digite seu nome"
              onChangeText={text => setName(text)}
              textAlign="center"
              autoFocus
              autoCompleteType="name"
              returnKeyType="next"
              returnKeyLabel="próximo"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                pageRef.current.scrollToPage(1);
                setPage(1);
                emailRef.current.focus();
              }}
            />
          </Body>
        </Page>

        <Page>
          <Headline>Seu melhor email</Headline>
          <Body>
            <Input
              ref={emailRef}
              value={email}
              placeholder="Digite seu email"
              onChangeText={text => setEmail(text.trim())}
              textAlign="center"
              returnKeyType="next"
              autoCompleteType="email"
              keyboardType="email-address"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                pageRef.current.scrollToPage(2);
                setPage(2);
                weightRef.current.focus();
              }}
            />
          </Body>
        </Page>

        <Page>
          <Headline>Qual seu Peso atual?</Headline>
          <Body>
            <Input
              ref={weightRef}
              value={weight}
              placeholder="  kg"
              onChangeText={text => setWeight(text)}
              textAlign="center"
              keyboardType="phone-pad"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                pageRef.current.scrollToPage(3);
                setPage(3);
                heightRef.current.focus();
              }}
            />
          </Body>
          <Tip>
            Essas informações serão necessárias para calcular suas calorias e
            montar sua dieta. {'\u{1F4AA}'}
          </Tip>
        </Page>

        <Page>
          <Headline>Qual a sua Altura?</Headline>
          <Body>
            <Input
              ref={heightRef}
              value={height}
              placeholder="  cm"
              onChangeText={text => setHeight(text.replace(/[^0-9]/g, ''))}
              keyboardType="phone-pad"
              textAlign="center"
              maxLength={3}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                pageRef.current.scrollToPage(4);
                setPage(4);
                birthdayRef.current.focus();
              }}
            />
          </Body>
          <Tip>
            Essas informações serão necessárias para calcular suas calorias e
            montar sua dieta. {'\u{1F4AA}'}
          </Tip>
        </Page>

        <Page>
          <Headline>Quando você nasceu?</Headline>
          <Body>
            <Input
              ref={birthdayRef}
              value={birthday}
              placeholder="Digite seu email"
              onChangeText={text => setBirthday(text)}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                pageRef.current.scrollToPage(5);
                setPage(5);
                emailRef.current.focus();
              }}
            />
          </Body>
        </Page>

        <Page />
      </Pages>
      <Footer>
        <Button onPress={() => handleBack()}>
          <Label>Voltar</Label>
        </Button>

        <Button onPress={() => handleNext()}>
          <Label>Avançar</Label>
        </Button>
      </Footer>
    </Container>
  );
}

Name.navigationOptions = {
  header: null,
};

Name.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
