import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  changeObjective,
  changeCalorieGoal,
} from '~/store/modules/user/actions';

import {
  Container,
  Headline,
  ObjectiveButton,
  ObjectiveText,
  Description,
} from './styles';

function Card({ objective, level, children, onPress, description }) {
  return (
    <ObjectiveButton
      style={{ elevation: 4 }}
      active={objective === level}
      onPress={onPress}
    >
      <ObjectiveText active={objective === level}>{children}</ObjectiveText>
      {description && (
        <Description active={objective === level}>{description}</Description>
      )}
    </ObjectiveButton>
  );
}

Card.propTypes = {
  objective: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default function Objective({ navigation }) {
  const dispatch = useDispatch();
  const calorieIntake = useSelector(state => state.user.calorieIntake);
  const objective = useSelector(state => state.user.objective);

  function handleObjective(_objective) {
    dispatch(changeObjective(_objective));

    if (_objective === 'maintainWeight') {
      dispatch(changeCalorieGoal(calorieIntake));

      navigation.navigate('MealsCalories');
    } else {
      navigation.navigate('Difficulty');
    }
  }
  return (
    <Container>
      <Headline>Qual o seu objetivo?</Headline>

      <Card
        objective={objective}
        level="maintainWeight"
        onPress={() => handleObjective('maintainWeight')}
      >
        Manter Peso
      </Card>

      <Card
        objective={objective}
        level="gainMuscle"
        onPress={() => handleObjective('gainMuscle')}
      >
        Ganhar Massa Muscular
      </Card>

      <Card
        objective={objective}
        level="weightLoss"
        onPress={() => handleObjective('weightLoss')}
      >
        Emagrecer
      </Card>
    </Container>
  );
}

Objective.navigationOptions = {
  title: 'Objetivo',
};

Objective.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
