import styled from 'styled-components/native';
import { StyleSheet } from 'react-native'
export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: 15px;
  background: #fafafa;
`;


export const Body = styled.View`
  flex-direction: row;
  margin-top: 10px;
  background: #fafafa;
  align-items: center;
`;

export const Tip = styled.Text`
  font-size: 15px;
  margin: 10px 0;
  color: rgba(0,0,0,.5)
`;

export const Headline = styled.Text`
  font-size: 30px;
  color: rgba(0,0,0,0.7);
  font-family: Quicksand-Bold
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 50px;
  font-size: 22px;
  border: 1px solid #999;
  border-radius: 5px;
  padding: 5px 15px;
  margin-top: 15px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between
`;

export const Button = styled.TouchableOpacity`
  background: #196a65;
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const Label = styled.Text`
  color: #fff;
  font-weight:bold;
  font-size: 19px ;
  padding: 10px;
`;

export const BirthdayText = styled.Text`
font-size: 30px;
  margin: 10px 0;
  color: rgba(0,0,0,.5)
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
  background: ${props => props.active ? '#196a65' : '#ddd'};
  margin: 5px;
  border-radius: 5px;
  margin-top: 15px;

  `;

export const GenderText = styled.Text`
  color: ${props => props.active ? '#fafafa' : 'rgba(0,0,0,0.7)'};
  /* font-weight:bold; */
  font-size: 19px ;
  padding: 10px;
`;