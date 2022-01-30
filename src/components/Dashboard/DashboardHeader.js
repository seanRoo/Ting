import React, { useState, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Popover from 'react-native-popover-view';
import { Menu, Divider } from 'react-native-paper';
import TextCustomFont from '../TextCustomFont';
import { AuthContext } from '../../AuthProvider';

const DashboardHeader = ({ handleClick, userInfo, styleProps }) => {
  const { logout } = useContext(AuthContext);
  const [popoverIsVisible, setPopoverIsVisible] = useState(false);

  return (
    <View style={{ ...styleProps }}>
      <View style={{ flex: 0.7, flexDirection: 'row', marginTop: 12 }}>
        <View>
          <TextCustomFont style={{ fontSize: 24 }}>
            Hi,{' '}
            <TextCustomFont style={{ fontWeight: 'bold' }}>
              {userInfo?.firstName}!
            </TextCustomFont>
          </TextCustomFont>
          <TextCustomFont style={{ color: 'gray', marginTop: 4 }}>
            Your dashboard for today
          </TextCustomFont>
        </View>
        <Popover
          isVisible={popoverIsVisible}
          onRequestClose={() => setPopoverIsVisible(false)}
          from={
            <TouchableOpacity
              onPress={() => setPopoverIsVisible(!popoverIsVisible)}
              style={{ position: 'absolute', right: 0, marginTop: 4 }}
            >
              <FontAwesome name="user-circle" size={45} />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            icon="account-edit"
            onPress={() => {
              handleClick('Profile');
              setPopoverIsVisible(false);
            }}
            title="Profile"
          />
          <Menu.Item
            icon="account-multiple-plus"
            onPress={() => {
              handleClick('Add a Consultant');
              setPopoverIsVisible(false);
            }}
            title="Add a Consultant"
          />
          {/* <Menu.Item icon="cog-outline" onPress={() => {}} title="Settings" /> */}
          <Divider />
          <Menu.Item icon="logout-variant" onPress={logout} title="Log Out" />
        </Popover>
      </View>
    </View>
  );
};

export default DashboardHeader;
