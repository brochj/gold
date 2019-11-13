import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px 5px;
  align-items: center;
`;
export const Body = styled.View`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
  height: 50px;
`;

export const Cover = styled.Image`
  background: #444;
  height: 50px;
  width: 50px;
  border-radius: 100px;
`;

export const Name = styled.Text`
  font-size: 17px;
  color: #444;
`;
