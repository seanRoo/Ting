import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { setRecommendations } from '../../../api/RecommendationsApi';
import useFetchRecommendations from '../hooks/useFetchRecommendations';
import Loading from '../../Loading';
import ReliefOptionsList from './ReliefOptionsList';

const MyHelp = ({ navigation }) => {
  const today = new Date();
  const currentUser = auth().currentUser.uid;
  const [listItems, setListItems] = useState(null);

  const monthString = today.toLocaleString('default', {
    month: 'long',
  });

  const { recommendations, recommendationsLoaded } = useFetchRecommendations({
    currentUser,
    date: today,
  });

  const { sleep, stress } = recommendations || {};

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

    setRecommendations(currentUser, today, newRecommedations);

    setListItems(newRemedies);
  };

  const sleepListItems = listItems?.filter((item) => item.category === 'sleep');
  const stressListItems = listItems?.filter(
    (item) => item.category === 'stress',
  );

  useEffect(() => {
    if (sleep && stress) {
      const newListItems = [
        ...sleep.filter((element) => element.selected),
        ...stress.filter((element) => element.selected),
      ];
      if (newListItems.length) {
        setListItems(newListItems);
      }
    }
  }, [sleep, stress]);

  console.log(recommendationsLoaded);
  return (
    <View style={{ display: 'flex', flex: 1 }}>
      {listItems?.length ? (
        <>
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'space-between',
              display: 'flex',
            }}
          >
            <View
              style={{
                alignSelf: 'flex-end',
                borderWidth: 1,
                borderRadius: 10,
                padding: 4,
                paddingRight: 8,
                paddingLeft: 8,
                marginBottom: 30,
              }}
            >
              <Text style={{ fontWeight: 'bold', color: 'black' }}>
                {monthString}, {new Date(today).getFullYear()}
              </Text>
            </View>
            <ReliefOptionsList
              listItems={sleepListItems}
              title="Sleep Improvement"
              handleClick={handleClick}
            />
            {stressListItems?.length ? (
              <View
                style={{
                  width: '100%',
                  height: 2,
                  marginBottom: 20,
                  marginTop: 20,
                  backgroundColor: 'lightgray',
                  alignSelf: 'center',
                }}
              />
            ) : null}
            <ReliefOptionsList
              listItems={stressListItems}
              title="Stress Improvement"
              handleClick={handleClick}
            />
          </ScrollView>
        </>
      ) : recommendationsLoaded && !listItems?.length ? (
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 0.85 }}
        >
          <FontAwesome5Icon
            name="hand-holding-medical"
            size={80}
            color="orchid"
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 20,
              textAlign: 'center',
            }}
          >
            No relief options to display
          </Text>
          <Text
            style={{
              marginTop: 6,
              textAlign: 'center',
              fontSize: 14,
              lineHeight: 22,
              width: '80%',
            }}
          >
            You can add new relief options through the{' '}
            <Text style={{ fontWeight: 'bold' }}>Relief Recommendations</Text>{' '}
            button in <Text style={{ fontWeight: 'bold' }}>Data page</Text>
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Relief')}
            style={{
              marginTop: 16,
              borderRadius: 15,
              paddingTop: 10,
              paddingBottom: 10,
              padding: 30,
              borderColor: 'blue',
              backgroundColor: 'white',
              borderWidth: 1,
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowOpacity: 0.8,
              elevation: 6,
              shadowRadius: 15,
              shadowOffset: { width: 1, height: 13 },
            }}
          >
            <Text>Take me there</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default MyHelp;
