import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { View, ScrollView } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { changeCalorieGoal } from '~/store/modules/user/actions';
import { createDietPlanRequest } from '~/store/modules/dietPlan/actions';

import {
  Container,
  // Headline,
  Input,
  DifficultyButton,
  DifficultyText,
  Description,
  // CalorieText,
  // CalorieValue,
  Confirm,
  CalorieGoal,
  Tip,
  Title,
} from './styles';

function Card({ difficulty, level, children, onPress, description }) {
  return (
    <DifficultyButton
      style={{ elevation: 4 }}
      active={difficulty === level}
      onPress={onPress}
    >
      <DifficultyText active={difficulty === level}>{children}</DifficultyText>
      {difficulty === level && (
        <Description active={difficulty === level}>{description}</Description>
      )}
    </DifficultyButton>
  );
}

Card.propTypes = {
  difficulty: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};

export default function Difficulty({ navigation }) {
  const dispatch = useDispatch();
  const objective = useSelector(state => state.user.objective);
  const calorieGoal = useSelector(state => state.user.calorieGoal);
  const calorieIntake = useSelector(state => state.user.calorieIntake);
  const physicalActivity = useSelector(state => state.user.physicalActivity);
  const [difficulty, setDifficulty] = useState(null);

  const calorieDifference = useMemo(() => calorieGoal - calorieIntake, [
    calorieGoal,
    calorieIntake,
  ]);
  const caloriePercent = useMemo(() => {
    return ((calorieGoal / calorieIntake - 1) * 100).toFixed(0);
  }, [calorieGoal, calorieIntake]);

  const textDifference = useMemo(
    () => (calorieDifference > 0 ? 'aumentando' : 'diminuindo'),
    [calorieDifference]
  );

  const percentDifference = useMemo(
    () => (calorieDifference > 0 ? 'um aumento' : 'uma diminuição'),
    [calorieDifference]
  );

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
    setDifficulty(_difficulty);
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
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <CalorieText>Suas gasto calórico atual</CalorieText>
          <CalorieValue>{calorieIntake} kcal</CalorieValue>
        </View> */}

      <CalorieGoal>Sua nova meta de calorias</CalorieGoal>
      <Input
        value={String(calorieGoal)}
        onChangeText={text =>
          dispatch(changeCalorieGoal(text.replace(/[^0-9]+/g, '')))
        }
        maxLength={5}
        keyboardType="phone-pad"
      />
      {difficulty && (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Tip>
              Você está {textDifference} {calorieDifference} kcal em relação ao
              seu gasto calórico atual.
            </Tip>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Tip>
              Isso representa {percentDifference} de {caloriePercent}%
            </Tip>
          </View>
        </>
      )}
      {/* <Button
        title="Meals calories"
        onPress={() => navigation.navigate('MealsCalories')}
      /> */}
      {/* <Button title="Create diet plan" onPress={handleDietPlan} /> */}
      <View style={{ height: 1, backgroundColor: '#ddd', marginTop: 15 }} />
      {!difficulty && <Title>Escolha um nível de dificuldade</Title>}
      <ScrollView>
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
          description="Será um pouco mais difícil, porém sem esforços não há ganhos. Recomendado"
        >
          Médio
        </Card>

        <Card
          difficulty={difficulty}
          level="hard"
          onPress={() => handleDifficulty('hard')}
          description="Difícil de manter a dieta. Só para quem realmente está muito focado e sabe o que está fazendo."
        >
          Difícil
        </Card>
      </ScrollView>

      {difficulty && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MealsCalories');
            handleDietPlan();
          }}
        >
          <Confirm>Confirmar</Confirm>
        </TouchableOpacity>
      )}
    </Container>
  );
}

Difficulty.navigationOptions = () => ({
  title: 'Dificuldade da Dieta',
  // headerRight: (
  //   <TouchableOpacity onPress={() => {
  //     navigation.navigate('MealsCalories');
  //   }}>
  //     <Confirm>Confirmar</Confirm>
  //   </TouchableOpacity>
  // )
});

Difficulty.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
