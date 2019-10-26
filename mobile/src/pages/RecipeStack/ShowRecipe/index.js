import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Tags from 'react-native-tags';
import { useDispatch, useSelector } from 'react-redux';
import R from '~/res/R';

import IngredientsSection from './IngredientsSection';
import IngredientItem from './IngredientItem';
import StepsSection from './StepsSection';
import { capitalize } from '~/lib/scripts/stringScript';

import { getRecipeRequest } from '~/store/modules/recipe/actions';

const tags = ['high protein', 'low carb', 'chicken', 'lunch', 'easy'];

export default function ShowRecipe({ navigation }) {
  const dispatch = useDispatch();
  // const [recipe, SetRecipe] = useState({
  //   ...initialRecipe.recipe,
  //   sections: initialRecipe.sections,
  // });
  // const [tags, SetTags] = useState([]);
  const recipe = useSelector(state => state.recipe.recipe);

  useEffect(() => {
    const recipeId = navigation.getParam('id');
    dispatch(getRecipeRequest(recipeId));
  }, []); // eslint-disable-line

  return (
    <View style={styles.body}>
      <ScrollView style={styles.scrollContainer}>
        {/* <Text>{JSON.stringify(this.state.recipeData, null, 3)}</Text> */}
        {/* <Image
          source={{ uri: recipe.cover.url }}
          style={styles.recipeImage}
        /> */}
        <View style={styles.headerView}>
          <Text style={styles.nameTxt}>{recipe.name}</Text>
          <View style={styles.rowView}>
            <MaterialCommunityIcons name="fire" color="#196a65" size={30} />
            {/* <Text style={styles.caloriesTxt}>{recipe.calories} kcal</Text> */}
            <Text style={styles.caloriesTxt}>100 kcal</Text>
          </View>
          <View style={styles.separator} />
          <Text style={styles.descriptionTxt}>{recipe.description}</Text>

          <View style={styles.separator} />

          <View style={styles.infoRowView}>
            <View style={styles.infoView}>
              <View style={[styles.infoInsideView, styles.infoInsideLeftView]}>
                <Icon name="timer" size={25} color="#196A65" />
                <Text style={styles.infoTxt}>
                  {recipe.preparation_time} min
                </Text>
              </View>
              <View style={[styles.infoInsideView, styles.infoInsideLeftView]}>
                <Icon name="group" size={25} color="#196A65" />
                <Text style={styles.infoTxt}>
                  Serve {recipe.servings} pessoa(s)
                </Text>
              </View>
            </View>

            <View style={styles.infoView}>
              <View style={[styles.infoInsideView, styles.infoInsideRightView]}>
                <Icon name="shopping-cart" size={25} color="#196A65" />
                <Text style={styles.infoTxt}>
                  {recipe.preparation_time} ingredientes
                </Text>
              </View>
              <View style={[styles.infoInsideView, styles.infoInsideRightView]}>
                <Icon name="network-check" size={25} color="#196A65" />
                <Text style={styles.infoTxt}>{recipe.difficulty}</Text>
              </View>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.tagsView}>
            <Tags
              readonly
              initialText="monkey"
              // textInputProps={{
              //     placeholder: "Any type of animal"
              // }}
              initialTags={tags}
              onChangeTags={tags_1 => console.log(tags_1)}
              onTagPress={(index, tagLabel, event, deleted) => {}}
              containerStyle={{ justifyContent: 'center' }}
              inputStyle={{ backgroundColor: 'white' }}
              renderTag={({
                tag,
                index,
                onPress,
                deleteTagOnPress,
                readonly,
              }) => (
                <TouchableOpacity
                  key={`${tag}-${index}`}
                  onPress={onPress}
                  style={styles.tagTouch}
                >
                  <Text style={styles.tagTxt}>#{capitalize(tag)}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <View style={styles.ingredientsView}>
          <View style={styles.ingredientsHeaderView}>
            <MaterialCommunityIcons
              name="food-variant"
              color="#196a65"
              size={30}
            />
            <Text style={styles.ingredientsTxt}>Ingredientes</Text>
          </View>
          <View style={[styles.separator, { marginBottom: 0, height: 0.9 }]} />
          {/* <IngredientsSection data={recipe.ingredients} /> */}
        </View>

        <View style={styles.intructionsView}>
          <View style={styles.ingredientsHeaderView}>
            <MaterialCommunityIcons name="rice" color="#196a65" size={30} />
            <Text style={styles.ingredientsTxt}>Modo de preparo</Text>
          </View>
          <View style={[styles.separator, { marginBottom: 0, height: 0.9 }]} />
          <StepsSection data={recipe.sections} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  recipeImage: {
    height: 300,
    width: '100%',
  },
  headerView: {
    marginBottom: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    ...R.styles.shadow,
  },
  nameTxt: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#196A65',
    marginTop: 10,
  },
  rowView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 5,
  },
  caloriesTxt: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  descriptionTxt: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'justify',
  },

  infoRowView: {
    flexDirection: 'row',
  },
  infoView: {
    flex: 1,
  },
  infoInsideView: {
    flex: 1,
    flexDirection: 'row',
    padding: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#196A65',
  },
  infoInsideLeftView: {
    marginRight: 5,
    marginBottom: 5,
  },
  infoInsideRightView: {
    marginRight: 0,
    marginBottom: 5,
  },
  infoTxt: {
    flex: 1,
    fontSize: 15,
    padding: 5,
  },

  tagsView: {
    alignItems: 'center',
  },
  tagTouch: {
    justifyContent: 'center',
    height: 30,
    margin: 5,
    paddingHorizontal: 10,
    backgroundColor: '#196A65',
    borderRadius: 15,
  },
  tagTxt: {
    fontSize: 14,
    color: '#fff',
  },
  ingredientsView: {
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    ...R.styles.shadow,
  },
  ingredientsHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ingredientsTxt: {
    textTransform: 'uppercase',
    fontSize: 18,
    paddingVertical: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#196a65',
  },

  intructionsView: {
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    ...R.styles.shadow,
  },

  separator: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eee',
    height: 0.7,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});
