import React from 'react';
import { Text, View } from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';

const MyDataCard = () => {
  return (
    <View
      style={{
        flex: 0.6,
        borderWidth: 1,
        borderColor: 'orchid',
        paddingRight: 12,
        borderRadius: 10,
        marginTop: 0,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 8,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'flex-start',
          flex: 0.8,
          padding: 8,
          margin: 4,
          marginLeft: 0,
        }}
      >
        <Text style={{ fontSize: 18, color: 'orchid', fontWeight: 'bold' }}>
          My Data
        </Text>
        <Foundation
          style={{ marginLeft: 20 }}
          name="graph-bar"
          size={20}
          color="orchid"
        />
      </View>
      {/* <View style={{ flex: 0.6 }}>
        <TouchableOpacity
          onPress={handleFilterClick}
          style={{
            position: 'absolute',
            right: 10,
            flexDirection: 'row',
            borderRadius: 8,
            borderWidth: 1,
            padding: 4,
            paddingRight: 12,
            paddingLeft: 12,
          }}
        >
          <Text style={{ fontSize: 16 }}>Filter</Text>
          <MaterialCommunityIcons
            name="filter"
            size={20}
            style={{ marginTop: 3, marginLeft: 4 }}
          />
        </TouchableOpacity>
      </View> */}
      {/* <LineChart /> */}
    </View>
  );
};

export default MyDataCard;
