import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import { getConsultants } from '../../../api/ConsultantApi';
import Loading from '../../Loading';

const ConsultantList = ({ navigation }) => {
  const currentUser = auth().currentUser.uid;
  const [consultantList, setConsultantList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!consultantList) {
      getConsultants(currentUser, setConsultantList);
    } else {
      setIsLoading(false);
    }
  }, [consultantList]);

  const consultantListIsLoaded =
    consultantList && Object.keys(consultantList)?.length && !isLoading;

  const consultantListIsEmpty =
    consultantList && !Object.keys(consultantList)?.length && !isLoading;

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: isLoading ? 'center' : 'space-between',
        flexGrow: isLoading || consultantListIsEmpty ? 1 : 0,
        display: 'flex',
      }}
    >
      {consultantListIsLoaded ? (
        Object.values(consultantList)?.map((element) => (
          <View
            style={{
              minHeight: 120,
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
              width: '96%',
              alignSelf: 'center',
              borderColor: 'orchid',
              borderWidth: 0.5,
            }}
          >
            <View
              style={{
                flex: 0.15,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Feather name="user" size={50} />
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginLeft: 10,
                flex: 0.85,
                paddingRight: 8,
                minHeight: 110,
              }}
            >
              <View style={{ width: '90%' }}>
                <Text style={{ color: 'black' }}>
                  {element?.consultantName}
                </Text>
                <Text style={{ color: 'black' }}>
                  {element?.consultantType}
                </Text>
                <Text style={{ fontSize: 12, color: 'gray' }}>
                  {element?.address?.desc}
                </Text>
              </View>
              <View
                style={{
                  // justifyContent: 'flex-end',
                  // alignItems: 'flex-end',
                  // flexDirection: 'row',
                  // marginTop: 14,
                  // backgroundColor: 'green',
                  // alignSelf: 'flex-end',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    padding: 4,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#24a0ed',
                    marginRight: 4,
                  }}
                  onPress={() => Linking.openURL(`tel:${element?.phoneNumber}`)}
                >
                  <Text
                    style={{ marginRight: 4, fontSize: 12, color: '#24a0ed' }}
                  >
                    Call
                  </Text>
                  <MaterialCommunityIcons
                    name="phone-outline"
                    size={17}
                    color="#24a0ed"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    // backgroundColor: '#24a0ed',
                    padding: 4,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#24a0ed',
                    marginRight: 4,
                  }}
                  onPress={() => {
                    const latLng = `${element.address.lat},${element.address.lng}`;
                    Linking.openURL(
                      `https://www.google.com/maps/search/?api=1&query=${latLng}&query_place_id=${element.address.id}`,
                    );
                  }}
                >
                  <Text
                    style={{ marginRight: 4, fontSize: 12, color: '#24a0ed' }}
                  >
                    Map
                  </Text>
                  <MaterialCommunityIcons
                    name="map-marker-radius-outline"
                    size={17}
                    color="#24a0ed"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    padding: 4,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: 'red',
                  }}
                  onPress={() => Linking.openURL(`tel:${element?.phoneNumber}`)}
                >
                  <Text style={{ marginRight: 4, fontSize: 12, color: 'red' }}>
                    Remove
                  </Text>
                  <Feather name="trash-2" size={17} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      ) : consultantListIsEmpty ? (
        <View style={{ alignItems: 'center' }}>
          <Feather
            name="user-x"
            size={100}
            style={{ marginTop: '20%' }}
            color="orchid"
          />
          <Text style={{ fontWeight: 'bold', fontSize: 22, marginTop: 10 }}>
            No Consultants to Display
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Add a Consultant')}
            style={{
              borderWidth: 1,
              borderColor: 'blue',
              padding: 10,
              borderRadius: 15,
              marginTop: 20,
            }}
          >
            <Text>Add a Consultant</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Loading />
      )}
    </ScrollView>
  );
};

export default ConsultantList;
