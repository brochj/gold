import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  margin: 20px;
  color: #fafafa;
`;

export const Header = styled.View`
  
`;

export const Title = styled.Text`
  color: rgba(0,0,0,0.7);
  font-family: Quicksand-Bold;
  font-size: 18px;
  margin-bottom: 15px;
`;

export const Body = styled.View`
  
`;
export const Row = styled.View`
  flex-direction: row;
  align-items: center;

`;

export const Kcal = styled.Text`
  font-size: 15px;
  margin-left: 5px;
`;

export const CalorieGoal = styled.Text`
  font-size: 20px;
`;

export const Label = styled.Text`
  flex: 1;
  font-size: 15px;
  text-align: right;
  padding-right: 15px;
  color: rgba(0,0,0,0.5)
`;

export const Value = styled.View`
  flex: 1.5;
  flex-direction: row;
  align-items: center;
`;

export const ValueText = styled.Text`
  font-size: 15px;
  color: rgba(0,0,0,0.7)
`;

export const Divider = styled.View.attrs({
  borderBottomWidth: 0.5,
  borderColor: 'rgba(0, 0, 0, 0.5)',

})`
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 5px;
  margin-bottom: 5px;
`;
