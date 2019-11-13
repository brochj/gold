import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  translatedDifficulty,
  translatedObjective,
  translatedActivity,
} from '~/lib/strings/enToPtbr';

import CalorieIcon from '~/components/Icons/CalorieIcon';
import {
  Container,
  Header,
  Title,
  Body,
  Row,
  Kcal,
  CalorieGoal,
  Label,
  Value,
  ValueText,
  Divider,
} from './styles';

export default function DietPlanItem({ item, onPress, onLongPress, index }) {
  const difficultyTranslated = useMemo(
    () => translatedDifficulty(item.difficulty),
    [item.difficulty]
  );

  const objectiveTranslated = useMemo(
    () => translatedObjective(item.objective),
    [item.objective]
  );

  const activityTranslated = useMemo(
    () => translatedActivity(item.physical_activity),
    [item.physical_activity]
  );

  return (
    <Container
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ elevation: 5 }}
    >
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

DietPlanItem.propTypes = {
  item: PropTypes.shape({
    difficulty: PropTypes.string.isRequired,
    objective: PropTypes.string.isRequired,
    physical_activity: PropTypes.string.isRequired,
    calorie_intake: PropTypes.string.isRequired,
    calorie_goal: PropTypes.string.isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func.isRequired,
  index: PropTypes.func.isRequired,
};
