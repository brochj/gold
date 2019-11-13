import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import ShowRecipeModal from '~/components/ShowRecipe'

// import { Container } from './styles';

export default function Dashboard() {

  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Text>Dashboard</Text>

      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text>Ver receita</Text>
      </TouchableOpacity>
      <ShowRecipeModal
        recipeId={24}
        visible={visible}
        changeVisible={() => setVisible(false)}
      />
    </View>

  );
}
