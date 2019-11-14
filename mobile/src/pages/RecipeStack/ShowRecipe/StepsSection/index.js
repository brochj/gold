import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function StepsSection({ data }) {
  function renderSectionHeader(section) {
    return (
      <View>
        <Text style={stylesHeader.section}>{section.title}</Text>
      </View>
    );
  }

  function renderItem(item) {
    return (
      <View style={{ flex: 1 }}>
        <View style={stylesItem.rowView}>
          <Icon name="circle-medium" color="#196a65" size={25} />
          <Text style={stylesItem.item}>{item.text}</Text>
        </View>
        {item.tip && <Text style={stylesItem.tip}>Dica: {item.tip}</Text>}
        <View style={stylesItem.separator} />
      </View>
    );
  }

  return (
    <SectionList
      sections={data}
      keyExtractor={item => item.text}
      renderSectionHeader={({ section }) => renderSectionHeader(section)}
      renderItem={({ item }) => renderItem(item)}
      stickySectionHeadersEnabled
    />
  );
}

const stylesHeader = StyleSheet.create({
  section: {
    fontWeight: 'bold',
    color: '#196a65',
    fontSize: 20,
    // backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    textTransform: 'capitalize',
  },
});

const stylesItem = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  item: {
    flex: 1,
    fontSize: 18.5,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'justify',
  },
  separator: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eee',
    height: 0.9,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  tip: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 15,
    marginLeft: 30,
    marginTop: 10,
  },
});

StepsSection.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
