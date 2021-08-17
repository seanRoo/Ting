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
          borderColor: 'orchid',
          marginBottom: 8,
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
