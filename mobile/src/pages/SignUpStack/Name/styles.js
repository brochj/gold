import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: 15px;
  background: #fafafa;
`;

export const Page = styled.View`
  background: #fafafa; 
  align-items: center;
  padding: 15px
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
  font-size: 20px;
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

