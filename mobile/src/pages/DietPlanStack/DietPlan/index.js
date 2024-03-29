import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Text } from 'react-native-ui-kitten';

import MealCardItem from './MealCardItem';

import { Container } from './styles';

import {
  getMealsRequest,
  changeActiveMeal,
} from '~/store/modules/meal/actions';

export default function DietPlan({ navigation }) {
  const dispatch = useDispatch();
  const dietPlanId = useSelector(state => state.dietPlan.id);
  const meals = useSelector(state => state.meal.meals);
  const loading = useSelector(state => state.meal.loading);

  useEffect(() => {
    dispatch(getMealsRequest(dietPlanId));
  }, [dietPlanId, dispatch]);

  function handleMeal(meal) {
    dispatch(changeActiveMeal(meal));
    navigation.navigate('Meal', { title: meal.title, calorie: meal.calorie });
  }

  function handleRefresh() {
    dispatch(getMealsRequest(dietPlanId));
  }

  return (
    <Container>
      <Text style={{ marginLeft: 10 }} category="h4">
        Refeições
      </Text>

      <FlatList
        data={meals}
        refreshing={loading}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <MealCardItem data={item} onPress={handleMeal} />
        )}
        keyExtractor={item => item.title}
      />
    </Container>
  );
}

DietPlan.navigationOptions = () => {
  return {
    title: 'Sua Dieta',
    // headerRight: <HeaderCalorie calorie={useSelector(state => state.dietPlan.calorie)} />,
  };
};

// function HeaderCalorie({ calorie }) {
//   return (
//     <View
//       style={{ flexDirection: 'row', marginRight: 15, alignItems: 'center' }}
//     >
//       <CalorieIcon color="#333" />
//       <Text category="h5">{calorie}</Text>
//     </View>
//   );
// }

DietPlan.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
