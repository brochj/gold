import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Cover, Name, Body } from './styles';

export default function RecipeItem({ item }) {
  const { name, preparation_time, servings, difficulty, cover } = item;

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
    <Container>
      <Cover />
      <Body>

        <Name numberOfLines={1}>{name}</Name>

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
      </Body>

    </Container>
  );
}


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    width: '100%'
  },

  info: {
    color: '#777',
  },
});
