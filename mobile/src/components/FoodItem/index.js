import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Image,
  Content,
  Title,
  AmountView,
  Amount,
  Unit,
  CalorieView,
  CalorieIcon,
  Calorie,
  Divider,
} from './styles';

export default function FoodItem({ data }) {
  return (
    <>
      <Container>
        <Image source={data.image} />
        <Content>
          <Title numberOfLines={1}>{data.title}</Title>
          <AmountView>
            <Amount style={{ textAlignVertical: 'bottom' }}>
              {data.amount}
            </Amount>
            <Unit style={{ textAlignVertical: 'bottom' }}>{data.unit}</Unit>
          </AmountView>
        </Content>
        <CalorieView>
          <CalorieIcon />
          <Calorie>{data.calorie}</Calorie>
        </CalorieView>
      </Container>
      <Divider />
    </>
  );
}

FoodItem.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    calorie: PropTypes.string.isRequired,
  }).isRequired,
};
