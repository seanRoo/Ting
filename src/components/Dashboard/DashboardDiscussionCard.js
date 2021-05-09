import React from 'react';
import { Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardDiscussionCard = () => {
  return (
    <View style={{ flex: 0.5, flexDirection: 'column' }}>
      <View
        style={{
          flex: 0.98,
          marginRight: 8,
          borderRadius: 10,
          padding: 8,
          paddingBottom: 0,
          borderWidth: 1,
          marginBottom: 8,
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text style={{ fontSize: 18, color: 'orchid', fontWeight: 'bold' }}>
            Discussions
          </Text>
          <MaterialCommunityIcons
            style={{
              position: 'absolute',
              right: 0,
            }}
            size={20}
            name="forum-outline"
            color="orchid"
          />
        </View>
      </View>
    </View>
  );
};

export default DashboardDiscussionCard;
