import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Text, Icon } from 'react-native-ui-kitten';
import CalorieIcon from '~/components/Icons/CalorieIcon';

import { MealCard, MealHeader, CalorieView } from './styles';

function FlashIcon() {
  return <Icon name="flash" />;
}

export default function MealCardItem({ data, onPress }) {
  return (
    <MealCard>
      <Icon name="star" />
      <TouchableOpacity onPress={() => onPress(data)}>
        <MealHeader>
          <Text category="h6" style={{ color: '#fff' }}>
            {data.title}
          </Text>
          <CalorieView>
            <CalorieIcon />
            <FlashIcon />
            <Text category="h5" style={{ color: '#fff' }}>
              {data.calorie}
            </Text>
          </CalorieView>
        </MealHeader>
      </TouchableOpacity>
    </MealCard>
  );
}

MealCardItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    calorie: PropTypes.string.isRequired,
  }).isRequired,
};
