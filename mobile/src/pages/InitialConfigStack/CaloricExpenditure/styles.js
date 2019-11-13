import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 15px;
  background: #fafafa;
`;

export const Headline = styled.Text`
  font-size: 30px;
  color: rgba(0, 0, 0, 0.7);
  font-family: Quicksand-Regular;
  text-align: center;
`;
export const KcalIntake = styled.Text`
  font-size: 50px;
  color: rgba(0, 0, 0, 0.7);
  font-family: Quicksand-Bold;
  text-align: center;
  margin-top: 40px;
`;
export const Kcal = styled.Text`
  font-size: 25px;
  color: rgba(0, 0, 0, 0.5);
  font-family: Quicksand-Regular;
  text-align: center;
  margin-bottom: 40px;
`;

export const BuildButton = styled.TouchableOpacity`
  justify-content: center;
  background: #196a65;
  margin: 5px;
  border-radius: 5px;
  margin-top: 15px;
  padding: 10px;
`;

export const BuildText = styled.Text`
  color: #fafafa;
  font-size: 25px;
  align-self: stretch;
  text-align: center;
`;

export const DashButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background: ${props => (props.active ? '#196a65' : '#fafafa')};
  margin: 5px;
  border-radius: 5px;
  margin-top: 15px;
`;

export const DashText = styled.Text`
  color: #196a65;
  font-weight: bold;
  font-size: 19px;
  padding: 10px;
`;
