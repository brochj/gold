import React from 'react';
import PropTypes from 'prop-types';
import { Container, Cover, Name, Body } from './styles';

import RecipeInfos from '~/components/RecipeInfos';

export default function RecipeItem({ item, onPress }) {
  const { name } = item;

  return (
    <Container onPress={onPress}>
      <Cover />
      <Body>
        <Name numberOfLines={1}>{name}</Name>
        <RecipeInfos item={item} color="#999" iconColor="#aaa" />
      </Body>
    </Container>
  );
}

RecipeItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
