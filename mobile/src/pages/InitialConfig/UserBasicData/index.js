import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';

// import { Container } from './styles';

export default function UserBasicData({ navigation }) {
  return (
    <View>
      <Text>UserBasicData</Text>
      <Button
        title="ActivityLevel"
        onPress={() => navigation.navigate('ActivityLevel')}
      />
    </View>
  );
}

UserBasicData.navigationOptions = {
  title: 'User',
};

UserBasicData.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
