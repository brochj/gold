import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import RecipeInfos from '~/components/RecipeInfos'
import bolo from '~/res/images/recipes/bolo.jpg';

import styles from './styles';

export default function RecipeCardItem({ data, onPress }) {
  const { name } = data;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.img} source={bolo} />
      <Text style={styles.title} numberOfLines={1} category="h5">
        {name}
      </Text>
      <View style={styles.stats}>
        <RecipeInfos item={data} />
      </View>
    </TouchableOpacity>
  );
}
