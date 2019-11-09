import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'

import DietPlantItem from './DietPlanItem'
// import { Container } from './styles';

import { getDietPlansRequest } from '~/store/modules/dietPlan/actions'

export default function DietsPlans() {
  const dispatch = useDispatch();

  const dietPlans = useSelector(state => state.dietPlan.dietPlans);
  const loading = useSelector(state => state.dietPlan.loading);

  useEffect(() => {
    if (dietPlans === []) {
      dispatch(getDietPlansRequest());
    }
  }, [dietPlans])

  return (
    <View >
      <FlatList
        refreshing={loading}
        onRefresh={() => dispatch(getDietPlansRequest())}
        data={dietPlans}
        renderItem={({ item, index }) => <DietPlantItem item={item} index={index} />}
      />
    </View>
  );
}
