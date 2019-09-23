import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';

// import { Container } from './styles';

export default function ActivityLevel({ navigation }) {
  return (
    <View>
      <Text>ActivityLevel</Text>
      <Button
        title="CaloricExpenditure"
        onPress={() => navigation.navigate('CaloricExpenditure')}
      />
    </View>
  );
}

ActivityLevel.navigationOptions = {
  title: 'ActivityLevel',
};

ActivityLevel.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
