import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { differenceInCalendarYears, parseISO } from 'date-fns';

import { changeCalorieIntake } from '~/store/modules/user/actions';

import calculateCalories from '~/lib/scripts/dietScript';

import {
  Container,
  Headline,
  KcalIntake,
  Kcal,
  DashButton,
  DashText,
  BuildButton,
  BuildText,
} from './styles';

export default function CaloricExpenditure({ navigation }) {
  const dispatch = useDispatch();

  const name = useSelector(state => state.user.name);
  const calorieIntake = useSelector(state => state.user.calorieIntake);
  const birthday = useSelector(state => state.user.birthday);
  const height = useSelector(state => state.user.height);
  const weight = useSelector(state => state.user.weight);
  const gender = useSelector(state => state.user.gender);
  const physicalActivity = useSelector(state => state.user.physicalActivity);

  useEffect(() => {
    const calculatedKcal = calculateCalories({
      age: differenceInCalendarYears(new Date(), parseISO(birthday)),
      height,
      weight,
      gender,
      physicalActivity,
    });
    dispatch(changeCalorieIntake(calculatedKcal));
  }, [birthday, dispatch, gender, height, physicalActivity, weight]);

  const firstName = useMemo(() => {
    return name.split(' ')[0];
  }, [name]);

  // useEffect(() => {
  //   Animated.timing(calorie, {
  //     toValue: 100,
  //     duration: 5000
  //   }).start()
  // }, [calorieIntake])

  return (
    <Container>
      <Headline>
        {firstName}, você tem um gasto calórico diário de aproximadamente
      </Headline>
      <KcalIntake>{calorieIntake}</KcalIntake>
      <Kcal>kcal</Kcal>

      <BuildButton
        style={{ elevation: 10 }}
        onPress={() => navigation.navigate('Objective')}
      >
        <BuildText>Montar Dieta</BuildText>
      </BuildButton>
      <DashButton onPress={() => navigation.navigate('Dashboard')}>
        <DashText>Ir para a Home</DashText>
      </DashButton>
    </Container>
  );
}

CaloricExpenditure.navigationOptions = {
  title: 'Gasto Calórico',
};

CaloricExpenditure.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
