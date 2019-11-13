import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import { Container } from './styles';

export default function RecipeInfos({ item, iconColor, color }) {
  const { preparation_time, servings, difficulty, cover } = item;

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
    <View style={styles.stats}>
      <View style={styles.row}>
        <Icon name="timer" size={16} color={iconColor || '#666'} />
        <Text style={{ color: color || '#777' }} category="h6">
          {' '}
          {preparation_time} min
        </Text>
      </View>
      <View style={styles.row}>
        <Icon
          name={servings === 1 ? 'person' : 'people'}
          size={18}
          color={iconColor || '#666'}
        />
        <Text style={{ color: color || '#777' }} category="h6">
          {' '}
          {servings === 1 ? `${servings} porção` : `${servings} porções`}
        </Text>
      </View>
      <View style={styles.row}>
        <Icon name="network-check" size={18} color={iconColor || '#666'} />
        <Text style={{ color: color || '#777' }} category="h6">
          {' '}
          {ptbrDifficulty}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    width: '100%',
  },
});
