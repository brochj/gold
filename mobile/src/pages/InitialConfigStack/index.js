import { createStackNavigator } from 'react-navigation-stack';


import PhysicalActivity from '~/pages/InitialConfigStack/PhysicalActivity';
import Difficulty from '~/pages/InitialConfigStack/Difficulty';
import CaloricExpenditure from '~/pages/InitialConfigStack/CaloricExpenditure';
import Objective from '~/pages/InitialConfigStack/Objective';
import MealsCalories from '~/pages/InitialConfigStack/MealsCalories';


const InitialConfigStack = createStackNavigator(
  {
    PhysicalActivity,
    CaloricExpenditure,
    Objective,
    Difficulty,
    MealsCalories,
  },
  {
    initialRouteName: 'PhysicalActivity',
  }
);

export default InitialConfigStack;