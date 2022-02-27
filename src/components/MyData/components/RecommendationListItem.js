import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { List, Chip } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RecommendationListItem = ({
  options,
  title,
  accordionContent,
  handleClick,
  disabled,
  handleAddNewOption,
  handleRemoveOption,
} = {}) => {
  return (
    <View>
      <Text
        style={{
          alignSelf: 'flex-start',
          fontSize: 20,
          paddingTop: 12,
          marginBottom: 10,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginBottom: 14,
        }}
      >
        {options?.map((element, index) => (
          <View
            style={{
              height: 40,
              borderColor: 'orchid',
              borderWidth: 2,
              marginRight: 4,
              marginBottom: 6,
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: element.selected
                ? 'rgba(63, 195, 128, .8)'
                : !element.selected && disabled
                ? 'rgb(220,220,220)'
                : null,
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              onPress={() =>
                handleClick({ ...element, selected: !element.selected })
              }
              style={{ flexDirection: 'row' }}
            >
              <MaterialCommunityIcons
                color={'black'}
                name={element.selected ? 'check' : 'plus'}
                size={18}
                style={{ marginRight: 4 }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  fontWeight: element.customOption && 'bold',
                }}
              >
                {element.label}
              </Text>
            </TouchableOpacity>
            {element.customOption ? (
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    width: 2,
                    height: 20,
                    backgroundColor: 'gray',
                    marginLeft: 20,
                    marginRight: 12,
                    alignSelf: 'center',
                  }}
                />
                <TouchableOpacity
                  onPress={() => handleRemoveOption(element)}
                  style={{ paddingLeft: 12 }}
                >
                  <FontAwesome color="black" size={24} name="trash-o" />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        ))}
        <Chip
          key={`chip-element-add-new`}
          textStyle={{
            fontSize: 13,
            color: 'black',
            fontWeight: 'bold',
          }}
          icon={({ size }) => (
            <MaterialCommunityIcons color="black" name="plus" size={size} />
          )}
          style={{
            marginRight: 3,
            marginBottom: 6,
            borderColor: 'orchid',
            borderWidth: 2,
            backgroundColor: 'rgba(218,112,214, .3)',
          }}
          onPress={handleAddNewOption}
        >
          Add your own
        </Chip>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>
          Selected options will appear on your dashboard
        </Text>
      </View>
      <List.Accordion
        style={{
          height: 35,
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: 'black',
          padding: 0,
          borderRadius: 8,
          margin: 0,
        }}
        titleStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          margin: 0,
          display: 'flex',
          color: 'black',
        }}
        title="Why is this important?"
        left={(props) => (
          <List.Icon
            style={{ marginRight: 0, marginLeft: 0 }}
            icon="information-outline"
          />
        )}
      >
        <View
          style={{
            marginTop: 10,
            padding: 10,
            paddingLeft: 14,
            backgroundColor: 'rgba(0, 140, 227, .3)',
            borderRadius: 14,
          }}
        >
          <Text
            style={{
              lineHeight: 20,
              fontSize: 14,
            }}
          >
            {accordionContent}
          </Text>
        </View>
      </List.Accordion>
    </View>
  );
};

export default RecommendationListItem;
