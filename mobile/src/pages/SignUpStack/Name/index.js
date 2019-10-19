import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { View, Text, Dimensions, StyleSheet, Animated } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { Pages } from 'react-native-pages';
// import Pages from './Pages';
import DateTimePicker from "react-native-modal-datetime-picker";
import { TextInputMask } from 'react-native-masked-text'

import { Container, Tip, Input, Body, Page, Headline, Footer, Label, Button, BirthdayText, BirthdayButton } from './styles';

const labels = ['Nome', 'Email', 'Altura', 'Peso', 'Data', 'Sexo'];
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

function TipText() {
  return (
    <Tip>
      Essas informações serão necessárias para calcular suas calorias e
            montar sua dieta. {'\u{1F4AA}'}
    </Tip>
  )
}

export default function Name({ navigation }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [page, setPage] = useState(1);
  const [showDate, setShowDate] = useState(false);

  const opacity = new Animated.Value(0)

  const pageRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const weightRef = useRef();
  const heightRef = useRef();
  const birthdayRef = useRef();
  const genderRef = useRef();

  function animateView() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500
    }).start();
  }

  useEffect(() => {

    switch (page) {
      case 0:
        animateView();
        nameRef.current.focus();
        break;
      case 1:
        animateView();
        emailRef.current.focus();
        break;
      case 2:
        animateView();
        heightRef.current.focus();
        break;
      case 3:
        animateView();
        weightRef.current.focus();
        break;
      case 4:
        animateView();
        break;
      case 5:
        animateView();
        break;

      default:
        break;
    }
  }, [page])


  function handleBack() {
    if (page - 1 >= 0) {
      setPage(page - 1)
    }
  }

  function handleNext() {
    if (page + 1 <= 5) {
      setPage(page + 1)
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
          setPage(position);
        }}
      />

      {
        page === 0 && (
          <Animated.View style={{ ...styles.animatedView, opacity }}>
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
                // blurOnSubmit={false}
                onSubmitEditing={() => setPage(1)}

              />
            </Body>
          </Animated.View>
        )}

      {page === 1 && (
        <Animated.View style={{ ...styles.animatedView, opacity }}>
          <Headline>Seu melhor email</Headline>
          <Body>
            <Input
              ref={emailRef}
              value={email}
              placeholder="Digite seu email"
              autoCapitalize='none'
              onChangeText={text => setEmail(text.trim())}
              textAlign="center"
              returnKeyType="next"
              autoCompleteType="email"
              keyboardType="email-address"
              blurOnSubmit={false}
              onSubmitEditing={() => setPage(2)}

            />
          </Body>
        </Animated.View>
      )}

      {page === 2 && (
        <Animated.View style={{ ...styles.animatedView, opacity }}>
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
              onSubmitEditing={() => setPage(3)}
            />
          </Body>
          <TipText />
        </Animated.View>
      )}

      {page === 3 && (
        <Animated.View style={{ ...styles.animatedView, opacity }}>
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
              onSubmitEditing={() => setPage(4)}

            />
          </Body>
          <TipText />
        </Animated.View>
      )}

      {page === 4 && (
        <Animated.View style={{ ...styles.animatedView, opacity }}>
          <Headline>Quando você nasceu?</Headline>
          <Body>
            <BirthdayButton onPress={() => setShowDate(true)} >
              <BirthdayText>{format(birthday, 'dd/MM/yyyy', { locale: pt })}</BirthdayText>
            </BirthdayButton>
            {showDate &&

              <DateTimePicker
                isVisible={showDate}
                date={birthday}
                mode="date"
                display="spinner"
                datePickerModeAndroid="spinner"
                onConfirm={(date) => {
                  setBirthday(date)
                  setShowDate(false)
                }}
                onCancel={() => setShowDate(false)}
                maximumDate={new Date()}
                minimumDate={new Date(1930, 1, 1)}
              />
            }
          </Body>
          <TipText />
        </Animated.View>
      )}

      {page === 5 && (
        <Animated.View style={{ ...styles.animatedView, opacity }}>

        </Animated.View>
      )}

      <Footer>
        <Button onPress={() => handleBack()}>
          <Label>Voltar</Label>
        </Button>

        <Button onPress={() => handleNext()}>
          <Label>Avançar</Label>
        </Button>
      </Footer>
    </Container >
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


const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    padding: 15,
  }
})