import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import bolo from '~/res/images/recipes/bolo.jpg';

import styles from './styles';

export default function RecipeCardItem({ data, onPress }) {
  const { id, name, preparation_time, servings, difficulty, cover } = data;
  let ptbrDifficulty;

  switch (difficulty) {
    case 'easy':
      ptbrDifficulty = 'Fácil';
      break;
    case 'medium':
      ptbrDifficulty = 'Médio';
      break;
    case 'hard':
      ptbrDifficulty = 'Difícil';
      break;
    default:
      break;
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.img} source={bolo} />
      <Text style={styles.title} numberOfLines={1} category="h5">
        {name}
      </Text>
      <View style={styles.stats}>
        <View style={styles.row}>
          <Icon name="timer" size={16} color="#666" />
          <Text style={styles.info} category="h6">
            {' '}
            {preparation_time} min
          </Text>
        </View>
        <View style={styles.row}>
          <Icon
            name={servings === 1 ? 'person' : 'people'}
            size={18} color="#666"
          />
          <Text style={styles.info} category="h6">
            {' '}
            {servings === 1 ? `${servings} porção` : `${servings} porções`}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="network-check" size={18} color="#666" />
          <Text style={styles.info} category="h6">
            {' '}
            {ptbrDifficulty}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
