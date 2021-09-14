import React from 'react';
import { View, Text } from 'react-native';
import { Divider, Input } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import InputScrollView from 'react-native-input-scroll-view';

const data = [
  { key: 'First Name', val: 'Sean' },
  { key: 'Surname', val: 'Rooney' },
  { key: 'Username', val: 'SeanRoo' },
  { key: 'Email', val: 'sean@test.ie' },
];
const Profile = () => {
  return (
    <View style={{ flex: 1, display: 'flex', backgroundColor: 'white' }}>
      <InputScrollView
        keyboardOffset={100}
        useAnimatedScrollView
        keyboardAvoidingViewProps={{ keyboardVerticalOffset: 40 }}
        automaticallyAdjustContentInsets
      >
        <View
          style={{
            height: 200,
            backgroundColor: 'rgba(218,112,214, .3)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{ borderRadius: 50, padding: 5, backgroundColor: 'white' }}
          >
            <AntDesign name="user" size={90} color="black" />
          </View>
          <Text style={{ fontSize: 24, marginTop: 12 }}>Sean Rooney</Text>
        </View>
        <View style={{ backgroundColor: 'white' }}>
          <View style={{ marginLeft: 30, marginTop: 30 }}>
            {data.map((item) => (
              <View
                style={{
                  marginBottom: 20,
                  // backgroundColor: 'green',
                }}
              >
                <View
                  style={{ flexDirection: 'row', display: 'flex', flex: 1 }}
                >
                  <View style={{ flex: 0.4, justifyContent: 'center' }}>
                    <Text
                      style={{
                        fontSize: 18,
                        height: 50,
                        color: 'rgba(0,0,0,.5)',
                      }}
                    >
                      {item.key}
                    </Text>
                  </View>
                  <Input
                    value={item.val}
                    inputStyle={{ fontWeight: 'bold' }}
                    containerStyle={{
                      flex: 0.5,
                    }}
                    inputContainerStyle={{
                      borderBottomWidth: 0,
                    }}
                    rightIcon={<SimpleLineIcons name="pencil" />}
                  />
                </View>
                <Divider />
              </View>
            ))}
          </View>
        </View>
      </InputScrollView>
    </View>
  );
};

export default Profile;
