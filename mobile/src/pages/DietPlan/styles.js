import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons'

export const Container = styled.ScrollView`
  flex: 1;
`;

export const Header = styled.View`
 
`;

export const Title = styled.Text`
  color: #333;
  font-size: 22px;
`;

export const CalorieGoal = styled.Text`
  color: #333;
`;

export const CalorieIcon = styled(Icon).attrs(props => ({
  size: props.size || 28,
  name: props.name || 'whatshot',
  color: props.color || '#fff',
}))``;

export const DishCard = styled.View.attrs({
  elevation: 4
})`
  margin: 10px 15px 15px;
  padding: 3px;
  border-radius: 5px;
`;

export const DishHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background: #196a65;
  padding: 8px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const DishTitle = styled.Text`
  color: #fff;
  font-size: 22px;
`;

export const Calorie = styled.Text`
  color: #fff;
  font-size: 22px;

`;

export const DishContent = styled.View`
  padding: 5px;
`;






