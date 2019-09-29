import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

import RecipeCardItem from './RecipeCardItem';
import api from '~/services/api';

import styles from './styles';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [refreshing, _] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getRecipes();
  }, []);

  async function getRecipes(page = 1) {
    const response = await api.get(`recipes?page=${page}`);

    if (response.data) {
      setRecipes([...recipes, ...response.data]);
      setPage(page + 1)
    }
  }

  function handleSelectedRecipe(id) {
    alert(id);
  }

  return (
    <View style={styles.container}>
      {recipes ?
        <FlatList
          data={recipes}
          keyExtractor={item => String(item.id)}
          refreshing={refreshing}
          onRefresh={getRecipes}
          onEndReachedThreshold={0.3}
          onEndReached={() => getRecipes(page)}
          ListFooterComponent={<ActivityIndicator />}
          renderItem={({ item }) => (
            <RecipeCardItem
              data={item}
              onPress={() => handleSelectedRecipe(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
        :
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#196a65" />

        </View>

      }
    </View>
  );
}

Recipes.navigationOptions = {
  title: 'Receitas',
};