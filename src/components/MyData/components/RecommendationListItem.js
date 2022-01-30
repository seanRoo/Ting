import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { List, Chip } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RecommendationListItem = ({
  options,
  title,
  bodyText,
  accordionContent,
  handleClick,
  disabled,
} = {}) => {
  return (
    <View>
      <Text style={{ alignSelf: 'center', fontSize: 24, paddingTop: 12 }}>
        {title}
      </Text>
      {bodyText}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginBottom: 14,
        }}
      >
        {options?.map((element, index) => (
          <Chip
            key={`chip-element=${index}`}
            textStyle={{
              fontSize: 13,
              color: element.selected ? 'white' : 'black',
            }}
            //icon={element.selected ? 'check' : 'plus'}
            icon={({ size }) => (
              <MaterialCommunityIcons
                color={element.selected ? 'white' : 'black'}
                name={element.selected ? 'check' : 'plus'}
                size={size}
              />
            )}
            selected={element.selected}
            style={{
              backgroundColor: element.selected
                ? 'green'
                : !element.selected && disabled
                ? 'rgb(220,220,220)'
                : null,
              marginRight: 3,
              marginBottom: 6,
              borderColor: 'orchid',
              borderWidth: 2,
            }}
            onPress={() =>
              handleClick({ ...element, selected: !element.selected })
            }
            disabled={disabled}
          >
            {element.label}
          </Chip>
        ))}
        <Text style={{ color: 'black', fontWeight: 'bold' }}>
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
        <Text
          style={{
            lineHeight: 20,
            marginTop: 10,
            paddingLeft: 0,
            fontSize: 16,
          }}
        >
          {accordionContent}
        </Text>
      </List.Accordion>
    </View>
  );
};

export default RecommendationListItem;
