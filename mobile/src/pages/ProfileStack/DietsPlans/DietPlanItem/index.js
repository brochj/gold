import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

import CalorieIcon from '~/components/Icons/CalorieIcon'
import {
  Container, Header, Title, Body, Row, Kcal, CalorieGoal,
  Label, Value, ValueText, Divider
} from './styles';


export default function DietPlanItem({ item, onPress, onLongPress, index }) {

  const difficultyTranslated = useMemo(() => {
    switch (item.difficulty) {
      case 'easy':
        return 'Fácil';
      case 'medium':
        return 'Médio';
      case 'hard':
        return 'Difícil';
      default:
        break;
    }
  }, [item.difficulty]);

  const objectiveTranslated = useMemo(() => {
    switch (item.objective) {
      case 'gainMuscle':
        return 'Ganhar Massa Muscular';
      case 'maintainWeight':
        return 'Manter o Peso';
      case 'weightLoss':
        return 'Perder Peso';
      default:
        break;
    }
  }, [item.objective]);

  const activityTranslated = useMemo(() => {
    switch (item.physical_activity) {
      case 'light':
        return 'Leve';
      case 'moderate':
        return 'Moderado';
      case 'high':
        return 'Elevado';
      case 'intense':
        return 'Intenso';
      default:
        break;
    }
  }, [item.physical_activity]);

  return (
    <Container onPress={onPress} onLongPress={onLongPress}style={{ elevation: 5 }}>
      <Header>
        <Title>DIETA {index + 1}</Title>
      </Header>
      <Body>

        <Row>
          <Label>Minha Meta é</Label>
          <Value>
            <CalorieIcon size={17} color="rgba(255,0,0,0.6)" />
            <CalorieGoal>{item.calorie_goal}</CalorieGoal>
            <Kcal>kcal</Kcal>
          </Value>
        </Row>
        <Divider />

        <Row>
          <Label>Dificuldade</Label>
          <Value>
            <ValueText>{difficultyTranslated}</ValueText>
          </Value>
        </Row>
        <Divider />

        <Row>
          <Label>Gasto Diário</Label>
          <Value>
            <CalorieIcon size={17} color="rgba(255,0,0,0.6)" />
            <CalorieGoal>{item.calorie_intake}</CalorieGoal>
            <Kcal>kcal</Kcal>
          </Value>
        </Row>
        <Divider />

        <Row>
          <Label>Objetivo</Label>
          <Value>
            <ValueText>{objectiveTranslated}</ValueText>
          </Value>
        </Row>
        <Divider />

        <Row>
          <Label>Atividade Física</Label>
          <Value>
            <ValueText>{activityTranslated}</ValueText>
          </Value>
        </Row>
        <Divider />

      </Body>
    </Container>
  );
}
