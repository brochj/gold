import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button } from 'react-native';

import { changePhysicalActivity } from '~/store/modules/user/actions';

import { Container, Headline, ActivityButton, ActivityText, Description } from './styles';

function Card({ physicalActivity, level, children, onPress, description }) {
  return (
    <ActivityButton
      // style={{ elevation: 4 }}
      active={physicalActivity === level}
      onPress={onPress}
    >
      <ActivityText
        active={physicalActivity === level}
      >{children}</ActivityText>
      <Description
        active={physicalActivity === level}
      >{description}</Description>
    </ActivityButton>
  );
}

// title='Sedentário'
//         description='Sentado na maior parte do tempo (ex.: trabalho em escritório)'
//         title='Moderada'
//         description='Em pé na maior parte do tempo (ex.: professor)'
//         title='Elevada'
//         description='Andando na maior parte do tempo (ex.: vendedor)'
//         title='Intensa'
//         description='Trabalho que exige muita atividade (ex.: pedreiro)'

export default function PhysicalActivity({ navigation }) {
  const dispatch = useDispatch();
  const physicalActivity = useSelector(state => state.user.physicalActivity)


  function handlePhysicalActivity(level) {
    dispatch(changePhysicalActivity(level));
    // navigation.navigate('CaloricExpenditure');
  }
  return (
    <Container>
      <Headline>Qual é o seu nível de atividade física atual?</Headline>

      <Card
        physicalActivity={physicalActivity}
        level="light"
        onPress={() => handlePhysicalActivity('light')}
        description="Sentado na maior parte do tempo (ex.: trabalho em escritório)"
      >LEVE
      </Card>

      <Card
        physicalActivity={physicalActivity}
        level="moderate"
        onPress={() => handlePhysicalActivity('moderate')}
        description="Em pé na maior parte do tempo (ex.: professor)"
      >MODERADO
      </Card>

      <Card
        physicalActivity={physicalActivity}
        level="high"
        onPress={() => handlePhysicalActivity('high')}
        description="Andando na maior parte do tempo (ex.: vendedor)"
      >ALTO
      </Card>

      <Card
        physicalActivity={physicalActivity}
        level="intense"
        onPress={() => handlePhysicalActivity('intense')}
        description="Trabalho que exige muita atividade (ex.: pedreiro)"
      >INTENSO
      </Card>


    </Container>
  );
}

PhysicalActivity.navigationOptions = {
  title: 'Atividade Física',
};

PhysicalActivity.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
