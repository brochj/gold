import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { translatedDifficulty } from '~/lib/strings/enToPtbr';

export default function RecipeInfos({ item, iconColor, color }) {
  const { preparation_time, servings, difficulty } = item;

  const ptbrDifficulty = translatedDifficulty(difficulty);

  return (
    <View style={styles.stats}>
      <View style={styles.row}>
        <Icon name="timer" size={16} color={iconColor} />
        <Text style={{ color }} category="h6">
          {' '}
          {preparation_time} min
        </Text>
      </View>
      <View style={styles.row}>
        <Icon
          name={servings === 1 ? 'person' : 'people'}
          size={18}
          color={iconColor}
        />
        <Text style={{ color }} category="h6">
          {' '}
          {servings === 1 ? `${servings} porção` : `${servings} porções`}
        </Text>
      </View>
      <View style={styles.row}>
        <Icon name="network-check" size={18} color={iconColor} />
        <Text style={{ color }} category="h6">
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

RecipeInfos.defaultProps = {
  color: '#777',
  iconColor: '#666',
};

RecipeInfos.propTypes = {
  color: PropTypes.string,
  iconColor: PropTypes.string,
  item: PropTypes.shape({
    preparation_time: PropTypes.number.isRequired,
    servings: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
};
