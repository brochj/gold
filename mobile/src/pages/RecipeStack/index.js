import { createStackNavigator } from 'react-navigation-stack';

import Recipes from '~/pages/RecipeStack/Recipes';
import ShowRecipe from '~/pages/RecipeStack/ShowRecipe';

const RecipeStack = createStackNavigator(
  {
    Recipes,
    ShowRecipe,
  },
  {
    initialRouteName: 'Recipes',
    navigationOptions: {
      title: "Receitas"
    }
  }
);

export default RecipeStack;
