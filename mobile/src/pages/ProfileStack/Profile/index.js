import React, { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Text, StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import { format, differenceInYears, parseISO } from 'date-fns';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {
  Container,
  Input,
  Headline,
  Footer,
  Label,
  Button,
  AgeInput,
  Gender,
  GenderText,
  Age,
} from './styles';

import { updateRequest } from '~/store/modules/user/actions';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();

  const birthdayInit = useSelector(state => state.user.birthday);
  const genderInit = useSelector(state => state.user.gender);
  const weightInit = useSelector(state => state.user.weight);
  const heightInit = useSelector(state => state.user.height);
  const email = useSelector(state => state.user.email);
  const loading = useSelector(state => state.user.loading);


  const [birthday, setBirthday] = useState(parseISO(birthdayInit) || new Date());
  const [weight, setWeight] = useState(String(weightInit));
  const [height, setHeight] = useState(String(heightInit));
  const [gender, setGender] = useState(genderInit);

  const [showDate, setShowDate] = useState(false);

  const weightRef = useRef();
  const heightRef = useRef();

  function handleUserUpdate() {
    dispatch(
      updateRequest({
        email,
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
          <Headline>Altura (cm)</Headline>
          <Input
            ref={heightRef}
            value={height}
            placeholder="  cm"
            onChangeText={text => setHeight(text.replace(/[^0-9]+/g, ''))}
            textAlign="center"
            keyboardType="numeric"
            returnKeyType="next"
            blurOnSubmit={false}
            maxLength={3}
            onSubmitEditing={() => weightRef.current.focus()}
          />
        </View>

        <View style={styles.animatedView}>
          <Headline>Peso (kg)</Headline>
          <Input
            ref={weightRef}
            value={weight}
            placeholder="  kg"
            onChangeText={text => setWeight(text.replace(/[^0-9;,]+/g, ''))}
            textAlign="center"
            maxLength={5}
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => setShowDate(true)}
          />
        </View>

        <View style={styles.animatedView}>
          <Headline>Idade</Headline>
          <AgeInput>
            <Age onPress={() => setShowDate(true)}>{age}</Age>
          </AgeInput>

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

        </View>

        <View style={styles.animatedView}>
          <Headline>Sexo</Headline>
          <Gender
            style={{ marginRight: 5 }}
            active={gender === 'female'}
            onPress={() => setGender('female')}
          >
            <GenderText active={gender === 'female'}>Feminino</GenderText>
          </Gender>

          <Gender
            style={{ marginLeft: 5 }}
            active={gender === 'male'}
            onPress={() => setGender('male')}
          >
            <GenderText active={gender === 'male'}>Masculino</GenderText>
          </Gender>

        </View>
        <Button disabled={loading} onPress={handleUserUpdate}>
          {loading ?
            <ActivityIndicator />
            :
            <Label>Atualizar</Label>

          }
        </Button>
      </ScrollView>
      {/* <Footer>
        <Button onPress={handleUserUpdate}>
          <Label>Atualizar</Label>
        </Button>
      </Footer> */}
    </Container >
  );
}

Profile.navigationOptions = {
  header: null,
};

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
