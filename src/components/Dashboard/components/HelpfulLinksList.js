import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const helpfulLinks = [
  {
    url: 'https://www2.hse.ie/conditions/tinnitus/symptoms.html',
    title: 'Tinnitus - Symptoms - HSE.ie',
    snippet:
      'Tinnitus can sound like: ringing; buzzing; whooshing; humming; hissing; throbbing; music or singing. You may hear these sounds in 1 or both ears',
    publisher: 'https://www2.hse.ie',
  },
  {
    url:
      'https://www.mayoclinic.org/diseases-conditions/tinnitus/diagnosis-treatment/drc-20350162#:~:text=If%20tinnitus%20is%20especially%20noticeable,Limit%20alcohol%2C%20caffeine%20and%20nicotine.',
    title: 'Tinnitus - Diagnosis and treatment',
    snippet:
      "If tinnitus is especially noticeable in quiet settings, try using a white noise machine to mask the noise from tinnitus. If you don't have a white noise machine, a fan, soft music or low-volume radio static also may help. Limit alcohol, caffeine and nicotine.",
    publisher: 'https://www.mayoclinic.org',
  },
  {
    url: 'https://www.healthline.com/health/tinnitus-remedies',
    title: '11 Tinnitus Remedies: How to Get Rid of Tinnitus',
    snippet:
      'Learn about ways to treat and stop tinnitus symptoms. ... (NCRAR) at the VA. They have a step-by-step tinnitus workbook and educational materials that may be helpful',
    publisher: 'https://www.healthline.com',
  },
  {
    url: 'https://www.hear-it.org/How-to-live-with-tinnitus',
    title: 'How to deal with tinnitus | Living with tinnitus | Get good advice',
    snippet:
      "It does take practice to develop good relaxation techniques, and what may help one day, may not do so the next – so don't give up if at first it does not seem to help ...",
    publisher: 'https://www.hear-it.org',
  },
];

const HelpfulLinksList = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'space-between',
        display: 'flex',
      }}
    >
      {helpfulLinks.map((element) => (
        <TouchableOpacity
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
            width: '96%',
            alignSelf: 'center',
          }}
          activeOpacity={0.8}
          onPress={() => Linking.openURL(element.url)}
        >
          <View style={{ flexDirection: 'column', flex: 0.95 }}>
            <View style={{ flex: 0.5 }}>
              <View style={{ flexDirection: 'row', display: 'flex' }}>
                <Text style={{ fontWeight: 'bold', flex: 0.9 }}>
                  {element.title}
                </Text>
                <Feather
                  style={{ position: 'absolute', right: 0 }}
                  name="external-link"
                  size={20}
                  color="black"
                />
              </View>
              <Text style={{ fontSize: 12, color: 'gray', marginBottom: 10 }}>
                {element.publisher}
              </Text>
              <Text>{element.snippet}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={{
          height: 35,
          backgroundColor: 'orchid',
          borderRadius: 20,
          marginBottom: 8,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        onPress={() =>
          Linking.openURL(
            'https://www.google.com/search?q=helpful+tinnitus+sources&newwindow=1&rlz=1C5CHFA_enIE893IE893&sxsrf=ALeKk01fGosd786I1VjNYiEQdMvcnjXmMQ%3A1624710379159&ei=6xzXYOuICa2j1fAPpeuq2As&oq=helpful+tinnitus+sources&gs_lcp=Cgdnd3Mtd2l6EAM6BAgjECc6BQgAEJECOggIABCxAxCDAToLCC4QsQMQxwEQowI6CAguEMcBEK8BOgQIABBDOgQILhBDOgcILhCxAxBDOgcIABCxAxBDOgIIADoGCAAQFhAeOgUIIRCgAToHCCEQChCgAUoECEEYAFDDwEBYkpNBYPeTQWgBcAJ4AIABeogBjwuSAQQyMC4xmAEAoAEBqgEHZ3dzLXdpesABAQ&sclient=gws-wiz&ved=0ahUKEwirqozopbXxAhWtURUIHaW1CrsQ4dUDCA4&uact=5',
          )
        }
      >
        <Text
          style={{
            marginRight: 10,
            fontSize: 18,
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          See More
        </Text>
        <Feather
          name="external-link"
          size={20}
          color="white"
          style={{ paddingBottom: 2 }}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HelpfulLinksList;
