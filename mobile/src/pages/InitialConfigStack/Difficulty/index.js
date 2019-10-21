import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button } from 'react-native';

import { changeCalorieGoal } from '~/store/modules/user/actions';
import { createDietPlanRequest } from '~/store/modules/dietPlan/actions';

import {
  Container,
  Headline,
  Input,
  DifficultyButton,
  DifficultyText,
  Description,
  CalorieText,
  CalorieValue,
  CalorieGoal,
  Tip,
} from './styles';

function Card({ difficulty, level, children, onPress, description }) {
  return (
    <DifficultyButton
      style={{ elevation: 4 }}
      active={difficulty === level}
      onPress={onPress}
    >
      <DifficultyText active={difficulty === level}>{children}</DifficultyText>
      {description &&
        <Description active={difficulty === level}>{description}</Description>
      }
    </DifficultyButton>
  );
}

export default function Difficulty({ navigation }) {
  const dispatch = useDispatch();
  const objective = useSelector(state => state.user.objective);
  const calorieGoal = useSelector(state => state.user.calorieGoal);
  const calorieIntake = useSelector(state => state.user.calorieIntake);
  const physicalActivity = useSelector(state => state.user.physicalActivity);
  const [difficulty, setDifficulty] = useState();

  const calorieDifference = useMemo(() => calorieGoal - calorieIntake, [calorieGoal])
  const caloriePercent = useMemo(() => {
    return (((calorieGoal / calorieIntake) - 1) * 100).toFixed(0)
  }, [calorieGoal])

  const textDifference = useMemo(() =>
    calorieDifference > 0 ? 'aumentando' : 'diminuindo'
    , [calorieDifference])

  const percentDifference = useMemo(() =>
    calorieDifference > 0 ? 'um aumento' : 'uma diminuição'
    , [calorieDifference])

  function handleDietPlan() {
    dispatch(
      createDietPlanRequest({
        objective,
        calorie_goal: calorieGoal,
        calorie_intake: calorieIntake,
        physical_activity: physicalActivity,
      })
    );
  }

  function handleDifficulty(_difficulty) {
    setDifficulty(_difficulty)
    // dispatch(changeDifficulty(_difficulty));

    if (objective === 'weightLoss') {
      switch (_difficulty) {
        case 'easy':
          dispatch(changeCalorieGoal(calorieIntake - 300));
          break;
        case 'medium':
          dispatch(changeCalorieGoal(calorieIntake - 500));
          break;
        case 'hard':
          dispatch(changeCalorieGoal(calorieIntake - 700));
          break;
        default:
          break;
      }
    } else if (objective === 'gainMuscle') {
      switch (_difficulty) {
        case 'easy':
          dispatch(changeCalorieGoal(calorieIntake + 300));
          break;
        case 'medium':
          dispatch(changeCalorieGoal(calorieIntake + 500));
          break;
        case 'hard':
          dispatch(changeCalorieGoal(calorieIntake + 700));
          break;
        default:
          break;
      }
    }
  }

  return (
    <Container>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <CalorieText>Suas gasto calórico atual</CalorieText>
        <CalorieValue>{calorieIntake} kcal</CalorieValue>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      </View>
      <CalorieGoal>Sua nova meta de calorias</CalorieGoal>
      <Input
        value={String(calorieGoal)}
        onChangeText={text => dispatch(changeCalorieGoal(text.replace(/[^0-9]+/g, '')))}
        maxLength={5}
        keyboardType='phone-pad'
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Tip>Você está {textDifference} {calorieDifference} kcal</Tip>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Tip>Isso representa {percentDifference} de {caloriePercent}%</Tip>
      </View>

      {/* <Button
        title="Meals calories"
        onPress={() => navigation.navigate('MealsCalories')}
      />
      <Button title="Create diet plan" onPress={handleDietPlan} /> */}

      <Card
        difficulty={difficulty}
        level="easy"
        onPress={() => handleDifficulty('easy')}
        description="Fácil de manter a dieta. Sem muito stress"
      >
        Fácil
      </Card>

      <Card
        difficulty={difficulty}
        level="medium"
        onPress={() => handleDifficulty('medium')}
        description="Será um pouco mais díficil, porém sem esforços não há ganhos. Recomendado"
      >
        Médio
      </Card>

      <Card
        difficulty={difficulty}
        level="hard"
        onPress={() => handleDifficulty('hard')}
        description="Difícil manter. Só para quem realmente está muito focado e sabe o que está fazendo."
      >
        Difícil
      </Card>
    </Container>
  );
}

Difficulty.navigationOptions = {
  title: 'Dificuldade da Dieta',
};

Difficulty.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
