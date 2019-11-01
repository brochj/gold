import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function EyeIcon({ showPassword, onPress, color }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.passwordIcon}
    >
      <Icon
        name={showPassword ? 'visibility' : 'visibility-off'}
        size={25}
        color={color || "rgba(0,0,0,0.6)"}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  passwordIcon: {
    position: 'absolute',
    zIndex: 99,
    paddingRight: 20,
    paddingLeft: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});