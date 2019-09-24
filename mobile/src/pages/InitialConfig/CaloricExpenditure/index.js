import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';

// import { Container } from './styles';

export default function CaloricExpenditure({ navigation }) {
  return (
    <View>
      <Text>CaloricExpenditure</Text>
      <Button
        title="ActivityLevel"
        onPress={() => navigation.navigate('ActivityLevel')}
      />
      <Button
        title="Dashboard"
        onPress={() => navigation.navigate('Dashboard')}
      />
    </View>
  );
}

CaloricExpenditure.navigationOptions = {
  title: 'CaloricExpenditure',
};

CaloricExpenditure.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
