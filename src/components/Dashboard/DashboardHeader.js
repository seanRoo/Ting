import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Popover from 'react-native-popover-view';
import { Menu, Divider } from 'react-native-paper';

const DashboardHeader = () => {
  return (
    <View style={{ flex: 0.2 }}>
      <View style={{ flex: 0.7, flexDirection: 'row', marginTop: 12 }}>
        <View>
          <Text style={{ fontSize: 24 }}>
            Hi, <Text style={{ fontWeight: 'bold' }}>Sean!</Text>
          </Text>
          <Text style={{ color: 'gray', marginTop: 4 }}>
            Your dashboard for today
          </Text>
        </View>
        <Popover
          from={
            <TouchableOpacity
              style={{ position: 'absolute', right: 0, marginTop: 4 }}
            >
              <FontAwesome name="user-circle" size={45} />
            </TouchableOpacity>
          }
        >
          <Menu.Item icon="account-edit" onPress={() => {}} title="Profile" />
          <Menu.Item
            icon="account-supervisor"
            onPress={() => {}}
            title="My Consultants"
          />
          <Menu.Item icon="cog-outline" onPress={() => {}} title="Settings" />
          <Divider />
          <Menu.Item icon="logout-variant" onPress={() => {}} title="Log Out" />
        </Popover>
      </View>
    </View>
  );
};

export default DashboardHeader;
