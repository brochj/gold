import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Alert, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DietPlantItem from './DietPlanItem';
// import { Container } from './styles';

import {
  getDietPlansRequest,
  deleteDietPlanRequest,
  changeActiveDietPlan,
} from '~/store/modules/dietPlan/actions';

export default function DietsPlans() {
  const dispatch = useDispatch();

  const dietPlans = useSelector(state => state.dietPlan.dietPlans);
  const loading = useSelector(state => state.dietPlan.loading);

  useEffect(() => {
    // if (dietPlans.length === 0) {
    dispatch(getDietPlansRequest());
    // }
  }, [dispatch]);

  function handleDeleteDietPlan({ id }, index) {
    Alert.alert(
      'Cuidado!',
      `Deseja excluir a Dieta ${index}?`,
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Excluir', onPress: () => dispatch(deleteDietPlanRequest(id)) },
      ]
      // { cancelable: false },
    );
  }

  return (
    <View>
      <StatusBar backgroundColor="#196a65" barStyle="light-content" />
      {dietPlans === [] ? (
        <Text>Sem planos de dieta</Text>
      ) : (
        <FlatList
          refreshing={loading}
          onRefresh={() => dispatch(getDietPlansRequest())}
          data={dietPlans}
          renderItem={({ item, index }) => (
            <DietPlantItem
              item={item}
              index={index}
              onLongPress={() => handleDeleteDietPlan(item, index)}
              onPress={() => dispatch(changeActiveDietPlan(item.id))}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

DietsPlans.navigationOptions = {
  header: null,
  title: 'Dietas',
};
