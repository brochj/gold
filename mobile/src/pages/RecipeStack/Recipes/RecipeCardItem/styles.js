import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    marginBottom: 15,
    elevation: 4,
    marginHorizontal: 10,
    borderRadius: 5,
  },

  img: {
    height: 200,
    width: '100%',
  },

  title: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 21,
    fontFamily: "Quicksand-Bold",
    color: '#333'

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },

  info: {
    color: '#777',
  },
});
