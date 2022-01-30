import React, { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import RecommendationListItem from './components/RecommendationListItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Recommendations = ({
  route: {
    params: { date = new Date(), handleClick, chips },
  },
} = {}) => {
  const parsedDate = JSON.parse(date);

  const monthString = new Date(parsedDate).toLocaleString('default', {
    month: 'long',
  });

  const today = new Date();
  const firstDayThisMonth = today.setFullYear(
    today.getFullYear(),
    today.getMonth(),
    1,
  );
  const isMonthInThePast =
    new Date(parsedDate) < new Date(firstDayThisMonth).setHours(0, 0, 0, 0);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
        <View
          style={{
            alignSelf: 'flex-end',
            marginRight: 10,
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 10,
            padding: 4,
            paddingRight: 8,
            paddingLeft: 8,
          }}
        >
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>
            {monthString}, {new Date(parsedDate).getFullYear()}
          </Text>
        </View>
        {isMonthInThePast && (
          <View
            style={{
              marginTop: 20,
              marginBottom: 10,
              borderRadius: 10,
              width: '98%',
              backgroundColor: 'rgba(45, 85, 255, .3)',
              alignSelf: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              display: 'flex',
              padding: 8,
            }}
          >
            <MaterialCommunityIcons
              name="information-outline"
              size={25}
              style={{
                marginLeft: 10,
                flex: 0.1,
                alignSelf: 'flex-start',
              }}
            />
            <View style={{ flex: 0.95 }}>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>
                Selected options for a month in the past cannot be altered
              </Text>
            </View>
          </View>
        )}
        <RecommendationListItem
          title="Sleep"
          bodyText={
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 15 }}>
                We see your levels of sleep are on the low side this month.
                Below are some options to try to help improve your sleep.
              </Text>
            </View>
          }
          accordionContent="The importance of a good sleep in managing your tinnitus cannot be
          overstated as a lack of sleep can cause a vicious cycle whereby
          tinnitus intensity worsens, which in turn makes it harder to fall
          asleep."
          options={chips?.sleep}
          handleClick={(chip) => handleClick('sleep', chip)}
          disabled={isMonthInThePast}
        />
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'black',
            marginTop: 30,
            marginBottom: 10,
          }}
        />
        <RecommendationListItem
          title="Stress & Overall Mood"
          bodyText={
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 15 }}>
                We see your mood levels are on the low side this month. Below
                are some options to try to help improve your stress and overall
                mood levels.
              </Text>
              <Text style={{ marginBottom: 8, fontSize: 15 }}>
                For more details on the effects of mood on Tinnitus and the
                relief methods listed below, click
                <Text style={{ color: 'blue', fontSize: 15 }}> here</Text>
              </Text>
            </View>
          }
          accordionContent="While it is not always clear whether stress or a dip in mood causes the onset of tinnitus, it is common for tinnitus to start at times of high stress or after a period of stress.
          Similar to what happens from lack of sleep, increased levels of factors like stress, anxiety and depression can lead to a vicious cycle whereby stress increases tinnitus intensity which in turn increases stress."
          options={chips?.stress}
          handleClick={(chip) => handleClick('stress', chip)}
          disabled={isMonthInThePast}
        />
      </ScrollView>
    </View>
  );
};

export default Recommendations;
