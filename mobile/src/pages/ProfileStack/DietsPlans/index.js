import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import DietPlantItem from './DietPlanItem'
// import { Container } from './styles';

import {
  getDietPlansRequest,
  deleteDietPlanRequest,
  changeActiveDietPlan,
} from '~/store/modules/dietPlan/actions'

export default function DietsPlans() {
  const dispatch = useDispatch();

  const dietPlans = useSelector(state => state.dietPlan.dietPlans);
  const loading = useSelector(state => state.dietPlan.loading);

  useEffect(() => {
    // if (dietPlans.length === 0) {
    dispatch(getDietPlansRequest());
    // }
  }, [])

  function handleDeleteDietPlan({ id }, index) {
    Alert.alert('Cuidado!', `Deseja excluir a Dieta ${index}?`,
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Excluir', onPress: () => dispatch(deleteDietPlanRequest(id)) },
      ],
      // { cancelable: false },
    )
  }

  return (
    <View >
      {dietPlans === [] ?

        <Text>Sem planos de dieta</Text>
        :
        (<FlatList
          refreshing={loading}
          onRefresh={() => dispatch(getDietPlansRequest())}
          data={dietPlans}
          renderItem={({ item, index }) =>
            (<DietPlantItem
              item={item}
              index={index}
              onLongPress={() => handleDeleteDietPlan(item, index)}
              onPress={() => dispatch(changeActiveDietPlan(item.id))}
            />)}
        // showsVerticalScrollIndicator={false}

        />
        )
      }
    </View>
  );
}
