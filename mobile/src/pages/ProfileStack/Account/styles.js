import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: 15px;
  background: #fafafa;
`;

export const Body = styled.View`
  flex-direction: row;
  margin-top: 5px;
  background: #fafafa;
  align-items: center;
  justify-content: flex-end;
`;

export const Headline = styled.Text`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.7);
  font-family: Quicksand-Bold;
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 50px;
  font-size: 18px;
  border: 1px solid #999;
  border-radius: 5px;
  padding: 5px 15px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  background: ${props => (props.color ? props.color : '#196a65')};
  align-items: center;
  justify-content: center;
  margin: 15px;
  border-radius: 5px;
  height: 50px;
`;

export const Label = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 19px;
  padding: 10px;
`;

export const BirthdayText = styled.Text`
  font-size: 30px;
  margin: 10px 0;
  color: rgba(0, 0, 0, 0.5);
`;

export const BirthdayButton = styled.TouchableOpacity`
  flex: 1;
  height: 50px;
  border: 1px solid #999;
  border-radius: 5px;
  padding: 5px 15px;
  margin-top: 15px;
  align-items: center;
  justify-content: center;
`;

export const Gender = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: ${props => (props.active ? '#196a65' : '#ddd')};
  margin: 5px;
  border-radius: 5px;
  margin-top: 15px;
`;

export const GenderText = styled.Text`
  color: ${props => (props.active ? '#fafafa' : 'rgba(0,0,0,0.7)')};
  /* font-weight:bold; */
  font-size: 19px;
  padding: 10px;
`;

export const Age = styled.Text`
  color: rgba(0, 0, 0, 0.7);
  /* font-weight:bold; */
  font-size: 30px;
  margin-top: 15px;
  margin-bottom: -10px;
  /* padding: 10px; */
`;
