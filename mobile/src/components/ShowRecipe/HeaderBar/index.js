import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

export default function HeaderBar({ onClose, onAdd }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onAdd}>
        <Text style={styles.title}>Adicionar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.title}>Fechar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#fcfcfc',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  title: {
    fontSize: 16,
    flex: 1,
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },

  button: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
