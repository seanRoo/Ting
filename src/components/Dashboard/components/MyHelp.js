import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import CheckBox from 'react-native-check-box';
import { setRecommendations } from '../../../api/RecommendationsApi';
import useFetchRecommendations from '../hooks/useFetchRecommendations';

const MyHelp = () => {
  const today = new Date();
  const currentUser = auth().currentUser.uid;

  const { recommendations } = useFetchRecommendations({
    currentUser,
    date: today,
  });

  const { sleep, stress } = recommendations || {};
  let listItems =
    sleep && stress
      ? [
          ...sleep.filter((element) => element.selected),
          ...stress.filter((element) => element.selected),
        ]
      : [];

  const handleClick = (element) => {
    const newRemedies = [...listItems];
    const newElementIndex = newRemedies.findIndex(
      (current) => current.label === element.label,
    );
    const newElement = { ...newRemedies[newElementIndex] };
    newElement.attempted = !newElement.attempted;

    newRemedies[newElementIndex] = newElement;

    let newRecommedations = JSON.parse(JSON.stringify(recommendations));

    const recommendationToUpdateIndex = newRecommedations[
      newElement.category
    ].findIndex((element) => element.id === newElement.id);

    newRecommedations[newElement.category][
      recommendationToUpdateIndex
    ].attempted =
      !newRecommedations[newElement.category][recommendationToUpdateIndex]
        .attempted;

    console.log(newRecommedations);
    setRecommendations(currentUser, today, newRecommedations);

    listItems = newRemedies;
  };

  return (
    <View style={{ display: 'flex', flex: 1 }}>
      <View style={{ paddingLeft: 8 }}>
        <Text style={{ fontSize: 19 }}>
          Relief options you want to try this month
        </Text>
        <Text style={{ paddingBottom: 20, fontSize: 16, fontWeight: 'bold' }}>
          January 2022
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'space-between',
          display: 'flex',
        }}
      >
        {listItems?.map((element) => (
          <View
            style={{
              minHeight: 100,
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
                flex: 0.95,
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
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ fontSize: 20, alignSelf: 'center' }}>
                    {element.label}
                  </Text>
                  <Text style={{ fontWeight: 'bold' }}>
                    Category:{' '}
                    {element.category.charAt(0).toUpperCase() +
                      element.category.slice(1)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleClick(element)}
                  style={{ flexDirection: 'column', alignSelf: 'flex-start' }}
                >
                  <Text>I tried this</Text>
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
      </ScrollView>
    </View>
  );
};

export default MyHelp;
