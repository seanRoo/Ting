import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import RecommendationListItem from './components/RecommendationListItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useToast } from 'native-base';
import auth from '@react-native-firebase/auth';
import { setRecommendations } from '../../api/RecommendationsApi';
import useFetchRecommendations from './hooks/useFetchRecommendations.hook';
import AddReliefModal from './components/AddReliefModal';
import Loading from '../Loading';
import {
  updateRecommendations,
  deleteRecommendation,
} from '../../api/RecommendationsApi';

const Recommendations = ({}) => {
  const today = new Date();
  const [addReliefModalVisible, setAddReliefModalVisible] = useState(false);
  const [reliefModalCategory, setReliefModalCategory] = useState(null);

  const currentUser = auth().currentUser.uid;
  const toast = useToast();

  const { chips, setChips } = useFetchRecommendations({
    currentUser,
    monthPickerValue: today,
  });

  const monthString = today.toLocaleString('default', {
    month: 'long',
  });

  const firstDayThisMonth = today.setFullYear(
    today.getFullYear(),
    today.getMonth(),
    1,
  );
  const isMonthInThePast =
    today < new Date(firstDayThisMonth).setHours(0, 0, 0, 0);

  const handleClick = (type, chip) => {
    if (chip.selected) {
      toast.show({
        duration: 3000,
        title: 'Added to your dashboard',
        isClosable: true,
        status: 'success',
      });
    }
    const newChips = JSON.parse(JSON.stringify(chips));
    const selectedElement = newChips[type].find(
      (element) => element.label === chip.label,
    );
    selectedElement.selected = chip.selected;
    if (!chip.selected) {
      selectedElement.attempted = false;
    }
    setRecommendations(currentUser, today, newChips).then(() =>
      setChips(newChips),
    );
  };

  const handleOpenReliefModal = (category) => {
    setRecommendations(currentUser, today, chips);
    setReliefModalCategory(category);
    setAddReliefModalVisible(true);
  };

  const handleCloseReliefModal = () => {
    setAddReliefModalVisible(false);
    setReliefModalCategory(null);
  };

  const handleAddReliefOption = (newOption) => {
    const newIndex = chips[reliefModalCategory].length;
    updateRecommendations(
      currentUser,
      today,
      { [newIndex]: newOption },
      reliefModalCategory,
    );
    setAddReliefModalVisible(false);
  };

  const handleRemoveOption = (element) => {
    const index = chips[element.category].findIndex(
      (item) => item.id === element.id,
    );
    deleteRecommendation(currentUser, today, element.category, index);
  };

  const modalOpenStyles = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0.1,
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {chips && (
        <>
          <AddReliefModal
            handleClose={handleCloseReliefModal}
            addReliefModalVisible={addReliefModalVisible}
            reliefModalCategory={reliefModalCategory}
            handleAddReliefOption={handleAddReliefOption}
          />
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              padding: 10,
              ...((addReliefModalVisible && modalOpenStyles) || null),
            }}
          >
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
                {monthString}, {new Date(today).getFullYear()}
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
              title="Options that could improve your sleep levels"
              accordionContent="The importance of a good sleep in managing your tinnitus cannot be
   overstated as a lack of sleep can cause a vicious cycle whereby
   tinnitus intensity worsens, which in turn makes it harder to fall
   asleep."
              options={chips?.sleep}
              handleClick={(chip) => handleClick('sleep', chip)}
              disabled={isMonthInThePast}
              handleAddNewOption={() => handleOpenReliefModal('sleep')}
              handleRemoveOption={handleRemoveOption}
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
              title="Options that could improve your stress & overall mood levels"
              // bodyText="These are options that could help improve your  levels"
              accordionContent="While it is not always clear whether stress or a dip in mood causes the onset of tinnitus, it is common for tinnitus to start at times of high stress or after a period of stress.
   Similar to what happens from lack of sleep, increased levels of factors like stress, anxiety and depression can lead to a vicious cycle whereby stress increases tinnitus intensity which in turn increases stress."
              options={chips?.stress}
              handleClick={(chip) => handleClick('stress', chip)}
              disabled={isMonthInThePast}
              handleAddNewOption={() => handleOpenReliefModal('stress')}
              handleRemoveOption={handleRemoveOption}
            />
          </ScrollView>
        </>
      )}
      {!chips && <Loading />}
    </View>
  );
};

export default Recommendations;
