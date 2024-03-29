import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, ActivityIndicator } from 'react-native';

import RecipeCardItem from './RecipeCardItem';
import api from '~/services/api';

import styles from './styles';

export default function Recipes({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [refreshing] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getRecipes();
  }, []); // eslint-disable-line

  async function getRecipes() {
    const response = await api.get(`recipes`);

    if (response.data) {
      setRecipes([...recipes, ...response.data]);
      setPage(page + 1);
    }
  }

  async function refreshRecipes() {
    const response = await api.get(`recipes`);

    if (response.data) {
      setRecipes(response.data);
      setPage(1);
    }
  }

  async function handleOnEndReached() {
    const response = await api.get(`recipes?page=${page + 1}`);

    if (response.data) {
      setRecipes([...recipes, ...response.data]);
      setPage(page + 1);
    }
  }

  function handleSelectedRecipe(id) {
    // alert(id);
    navigation.navigate('ShowRecipe', { id });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={item => String(item.id)}
        refreshing={refreshing}
        onRefresh={refreshRecipes}
        onEndReachedThreshold={0.3}
        onEndReached={() => handleOnEndReached()}
        ListFooterComponent={<ActivityIndicator />}
        renderItem={({ item }) => (
          <RecipeCardItem
            data={item}
            onPress={() => handleSelectedRecipe(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

Recipes.navigationOptions = () => {
  return {
    title: 'Sua Dieta',
    header: null,
  };
};

Recipes.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
