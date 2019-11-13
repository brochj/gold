import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, Alert } from 'react-native';

import {
  ActionButton,
  ActionIcon,
  Calorie,
  CalorieIcon,
  CalorieText,
  Container,
  Content,
  Divider,
  Header,
  MealCard,
  Title,
  Input,
  TextCalories,
  SwitchContainer,
  SwitchButton,
  SwitchText,
  Confirm,
} from './styles';

import { createMultipleMealsRequest } from '~/store/modules/meal/actions';

function MealItem({ data, editMode, changeCalorie, onDelete }) {
  function handleEditCalorie() {
    editMode();
  }

  const handleChangeCalorie = useCallback(
    calorie => {
      changeCalorie(calorie);
    },
    [changeCalorie]
  );

  return (
    <MealCard>
      <Header>
        <Title onLongPress={onDelete}>{data.title}</Title>
        <ActionButton onPress={handleEditCalorie}>
          {data.isSelected ? (
            <ActionIcon name="done" size={28} />
          ) : (
            <ActionIcon />
          )}
        </ActionButton>
      </Header>
      <Divider />
      {/* <DailyPercent onLongPress={onDelete}> 20% das calorias diárias</DailyPercent> */}
      {data.isSelected ? (
        <Content>
          {/* <ChangeCalorieIcon name="remove-circle" /> */}
          <CalorieIcon />

          <Input
            value={String(data.calorie)}
            autoFocus
            onChangeText={text =>
              handleChangeCalorie(Number(text.replace(/[^0-9]/g, '')))
            }
            onSubmitEditing={handleEditCalorie}
            keyboardType="phone-pad"
            maxLength={4}
          />
          {/* <ChangeCalorieIcon name="add-circle" /> */}
          <CalorieText>kcal</CalorieText>
        </Content>
      ) : (
        <Content>
          <CalorieIcon />
          <Calorie onPress={handleEditCalorie} onLongPress={onDelete}>
            {data.calorie}
          </Calorie>
          <CalorieText>kcal</CalorieText>
        </Content>
      )}
    </MealCard>
  );
}

MealItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    calorie: PropTypes.number,
    isSelected: PropTypes.bool,
  }).isRequired,
  editMode: PropTypes.func.isRequired,
  changeCalorie: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

function Switch({ numberOfMeals, number, title, onPress }) {
  return (
    <SwitchButton
      style={{ elevation: 4 }}
      active={numberOfMeals === number}
      onPress={onPress}
    >
      <SwitchText active={numberOfMeals === number}>{title}</SwitchText>
    </SwitchButton>
  );
}

Switch.propTypes = {
  numberOfMeals: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default function MealsCalories({ navigation }) {
  const dispatch = useDispatch();
  const calorieGoal = useSelector(state => state.user.calorieGoal);
  const dietPlanId = useSelector(state => state.dietPlan.id);

  const apiMeals = [];

  const [numberOfMeals, setNumberOfMeals] = useState(4);

  const [meals, setMeals] = useState(
    apiMeals.map(meal => ({
      ...meal,
      isSelected: false,
    }))
  );

  useEffect(() => {
    navigation.setParams({ meals });
  }, [meals, navigation]);

  useEffect(() => {
    switch (numberOfMeals) {
      case 3:
        setMeals([
          {
            id: 1,
            calorie: Math.round(calorieGoal * 0.325),
            title: 'Café da manhã',
          },
          { id: 2, calorie: Math.round(calorieGoal * 0.375), title: 'Almoço' },
          { id: 3, calorie: Math.round(calorieGoal * 0.3), title: 'Jantar' },
        ]);
        break;
      case 4:
        setMeals([
          {
            id: 1,
            calorie: Math.round(calorieGoal * 0.275),
            title: 'Café da manhã',
          },
          {
            id: 2,
            calorie: Math.round(calorieGoal * 0.075),
            title: 'Lanche da manhã ou da tarde',
          },
          { id: 3, calorie: Math.round(calorieGoal * 0.375), title: 'Almoço' },
          { id: 4, calorie: Math.round(calorieGoal * 0.275), title: 'Jantar' },
        ]);
        break;
      case 5:
        setMeals([
          {
            id: 1,
            calorie: Math.round(calorieGoal * 0.25),
            title: 'Café da manhã',
          },
          {
            id: 2,
            calorie: Math.round(calorieGoal * 0.075),
            title: 'Lanche da manhã',
          },
          { id: 3, calorie: Math.round(calorieGoal * 0.35), title: 'Almoço' },
          {
            id: 4,
            calorie: Math.round(calorieGoal * 0.075),
            title: 'Lanche da tarde',
          },
          { id: 5, calorie: Math.round(calorieGoal * 0.25), title: 'Jantar' },
        ]);
        break;
      default:
        break;
    }
  }, [calorieGoal, numberOfMeals]);

  const totalCalories = useMemo(
    () => meals.reduce((a, b) => +a + +b.calorie, 0),
    [meals]
  );

  const handleEditMode = useCallback(
    index => {
      const selectedMeal = meals[index];
      setMeals(
        Object.assign([], meals, {
          [index]: { ...selectedMeal, isSelected: !selectedMeal.isSelected },
        })
      );
    },
    [meals]
  );

  const handleChangeCalorie = useCallback(
    (calorie, index) => {
      const selectedMeal = meals[index];
      setMeals(
        Object.assign([], meals, {
          [index]: { ...selectedMeal, calorie },
        })
      );
    },
    [meals]
  );

  const handleDelete = useCallback(
    index => {
      Alert.alert(
        'Alerta',
        'Você deseja excluir essa refeição',
        [
          {
            text: 'Cancelar',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              const newMeals = meals;
              newMeals.splice(index, 1);
              setMeals(newMeals);
            },
          },
        ],
        { cancelable: false }
      );
    },
    [meals]
  );

  function handleCreateMeals() {
    dispatch(createMultipleMealsRequest(meals, dietPlanId));
  }

  return (
    <Container>
      {/* <Button
        title="Dashboard"
        onPress={() => navigation.navigate('Dashboard')}
      />

      <Button title="Create Meals" onPress={handleCreateMeals} /> */}
      <SwitchContainer>
        <Switch
          title="3 Refeições"
          numberOfMeals={numberOfMeals}
          number={3}
          onPress={() => setNumberOfMeals(3)}
        />
        <Switch
          title="4 Refeições"
          numberOfMeals={numberOfMeals}
          number={4}
          onPress={() => setNumberOfMeals(4)}
        />
        <Switch
          title="5 Refeições"
          numberOfMeals={numberOfMeals}
          number={5}
          onPress={() => setNumberOfMeals(5)}
        />
      </SwitchContainer>
      <TextCalories>Sua meta é {calorieGoal} kcal</TextCalories>
      <TextCalories>A soma atual é {totalCalories} kcal</TextCalories>
      <FlatList
        data={meals}
        extraData={meals}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <MealItem
            data={item}
            editMode={() => handleEditMode(index)}
            onDelete={() => handleDelete(index)}
            changeCalorie={calorie => handleChangeCalorie(calorie, index)}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Dashboard');
          handleCreateMeals();
        }}
      >
        <Confirm>Finalizar</Confirm>
      </TouchableOpacity>
    </Container>
  );
}

MealsCalories.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setParams: PropTypes.func,
  }).isRequired,
};

MealsCalories.navigationOptions = () => ({
  title: 'Refeições',
  // headerRight: (
  //   <Text style={{ marginRight: 15, fontSize: 17 }}
  //     // onPress={() => navigation.navigate('Dashboard')}
  //     onPress={() => console.tron.log(navigation.getParam('meals', []))}
  //   >Finalizar</Text>
  // )
});
