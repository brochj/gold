import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { View, Text, Button } from 'react-native';

import { changeObjective } from '~/store/modules/user/actions';

// import { Container } from './styles';

export default function Objective({ navigation }) {
  const dispatch = useDispatch();

  function handleObjective(objective) {
    dispatch(changeObjective(objective));
    navigation.navigate('Difficulty');
  }
  return (
    <View>
      <Text>Objective</Text>
      <Button
        title="Difficulty"
        onPress={() => navigation.navigate('Difficulty')}
      />

      <Button
        style={{ marginTop: 15 }}
        title="maintainWeight"
        onPress={() => handleObjective('maintainWeight')}
      />

      <Button
        style={{ marginTop: 15 }}
        title="gainMuscle"
        onPress={() => handleObjective('gainMuscle')}
      />

      <Button
        style={{ marginTop: 15 }}
        title="weightLoss"
        onPress={() => handleObjective('weightLoss')}
      />
    </View>
  );
}

Objective.navigationOptions = {
  title: 'Objective',
};

Objective.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
