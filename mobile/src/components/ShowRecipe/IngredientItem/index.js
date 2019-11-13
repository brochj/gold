import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function IngredientItem({ data }) {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={styles.rowView}>
          <Icon name="circle-medium" color="#196a65" size={25} />
          <Text style={styles.item}>{data.quantity}</Text>
          <Text style={styles.unit}>{data.unit}</Text>
          <Text style={styles.item}>{data.food.name}</Text>
        </View>
        <Text style={styles.preparation}>Pré-preparo: {data.preparation}</Text>
        {/* <Text style={styles.item}>({data.preparation})</Text> */}
        <Text style={styles.tip}>{data.tip}</Text>
      </View>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  separator: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eee',
    height: 0.9,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  item: {
    fontSize: 18.5,
    paddingLeft: 10,
    textAlign: 'justify',
    textAlignVertical: 'bottom',
  },
  unit: {
    fontSize: 16,
    paddingLeft: 3,
    justifyContent: 'center',
    textAlignVertical: 'bottom',
  },
  tip: {
    color: 'rgba(0,0,0,0.5)',
    paddingLeft: 30,
    marginTop: 2,
  },
  preparation: {
    fontSize: 16,
    paddingLeft: 30,
  },
});
