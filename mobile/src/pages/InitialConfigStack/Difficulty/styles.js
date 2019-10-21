import styled from 'styled-components/native';

export const Input = styled.TextInput`
  flex: 1;
  height: 50px;
  font-size: 30px;
  border: 1px solid #999;
  border-radius: 5px;
  padding: 5px 15px;
  margin: 5px;
  margin-top: 15px;
  text-align: center;
`;


export const Container = styled.ScrollView`
  flex: 1;
  padding: 15px;
  background: #fafafa;
`;

export const Headline = styled.Text`
  font-size: 30px;
  color: rgba(0, 0, 0, 0.7);
  font-family: Quicksand-Bold;
  text-align: center;
  margin-bottom: 25px;
`;

export const DifficultyButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background: ${props => (props.active ? '#196a65' : '#eee')};
  margin: 5px;
  border-radius: 5px;
  margin-top: 20px;
  padding: 15px;
`;

export const DifficultyText = styled.Text`
  color: ${props => (props.active ? '#fafafa' : 'rgba(0,0,0,0.7)')};
  font-size: 25px;
  font-family: Quicksand-Bold;
  text-transform: uppercase;
`;

export const Description = styled.Text`
  color: ${props => (props.active ? '#ddd' : 'rgba(0,0,0,0.3)')};
  font-size: 19px;
  margin-top: 10px;
  text-align: center;
`;

export const CalorieText = styled.Text`
  color: rgba(0,0,0,0.7);
  font-size: 19px;
  text-align: center;
`;

export const CalorieValue = styled.Text`
  color: rgba(0,0,0,0.7);
  font-size: 19px;
  text-align: center;
`;

export const Tip = styled.Text`
  color: rgba(0,0,0,0.3);
  font-size: 17px;
  text-align: center;
  /* font-family: Quicksand-Regular; */
`;

export const CalorieGoal = styled.Text`
  color: rgba(0,0,0,0.7);
  font-size: 24px;
  text-align: center;
  font-family: Quicksand-Bold;
  margin-top: 20px;
`;
