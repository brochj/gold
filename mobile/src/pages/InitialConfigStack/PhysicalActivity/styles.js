import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 15px;
  background: #fafafa;
`;

export const Headline = styled.Text`
  font-size: 30px;
  color: rgba(0,0,0,0.7);
  font-family: Quicksand-Bold;
  text-align: center;
`;

export const ActivityButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background: ${props => props.active ? '#196a65' : '#eee'};
  margin: 5px;
  border-radius: 5px;
  margin-top: 15px;
  `;

export const ActivityText = styled.Text`
  color: ${props => props.active ? '#fafafa' : 'rgba(0,0,0,0.7)'};
  font-size: 25px ;
  padding-top: 5px;
  font-family: Quicksand-Bold
  
`;

export const Description = styled.Text`
color: ${props => props.active ? '#ddd' : 'rgba(0,0,0,0.3)'};
  font-size: 19px ;
  padding: 10px;
  text-align: center
`;