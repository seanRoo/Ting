import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const ReliefOptionsList = ({ listItems, handleClick, title }) => {
  if (listItems?.length) {
    return (
      <View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <Text style={{ marginBottom: 14, fontSize: 18, fontWeight: 'bold' }}>
            {title}
          </Text>
        </View>
        {listItems?.map((element) => (
          <View
            style={{
              minHeight: 55,
              marginBottom: 14,
              borderRadius: 20,
              padding: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
              flexDirection: 'row',
              backgroundColor: 'white',
              alignSelf: 'center',
              borderColor: 'orchid',
              borderWidth: 0.5,
            }}
            activeOpacity={0.8}
          >
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 0.95,
                    height: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        //fontWeight: 'bold',
                        width: '80%',
                      }}
                    >
                      {element.label}
                    </Text>
                    {/* <TouchableOpacity
                      style={{
                        paddingTop: 2,
                        paddingBottom: 2,
                        marginRight: 6,
                        paddingRight: 4,
                        paddingLeft: 4,
                        flexDirection: 'row',
                        alignSelf: 'center',
                      }}
                    >
                      <MaterialCommunityIcons
                        size={26}
                        color="blue"
                        name="information-outline"
                      />
                    </TouchableOpacity> */}
                  </View>
                </View>
                <View
                  style={{
                    width: 2,
                    backgroundColor: 'lightgray',
                    height: '70%',
                  }}
                />
                <TouchableOpacity
                  onPress={() => handleClick(element)}
                  style={{
                    flexDirection: 'column',
                    alignSelf: 'center',
                  }}
                >
                  <Text style={{ fontSize: 13 }}>Attempted</Text>
                  <CheckBox
                    onClick={() => handleClick(element)}
                    isChecked={element?.attempted}
                    style={{ alignSelf: 'center', marginTop: 6 }}
                    checkBoxColor="green"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
  return null;
};

export default ReliefOptionsList;
