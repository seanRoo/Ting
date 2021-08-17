import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { StyleSheet, View, ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AddConsultantForm from './AddConsultantForm';

// const styles = StyleSheet.create({
//   // container: {
//   //   ...StyleSheet.absoluteFillObject,
//   //   height: '100%',
//   //   width: '100%',
//   //   justifyContent: 'flex-end',
//   //   alignItems: 'center',
//   // },
//   // map: {
//   //   ...StyleSheet.absoluteFillObject,
//   // },
//   height: '100%',
// });

const MapPage = () => (
  // <View style={styles.container}>
  //   {/* <MapView
  //     provider={PROVIDER_GOOGLE} // remove if not using Google Maps
  //     style={styles.map}
  //     region={{
  //       latitude: 37.78825,
  //       longitude: -122.4324,
  //       latitudeDelta: 0.015,
  //       longitudeDelta: 0.0121,
  //     }}
  //   /> */}

  // <GooglePlacesAutocomplete
  //   placeholder="Search"
  //   onPress={(data, details = null) => {
  //     // 'details' is provided when fetchDetails = true
  //     console.log(data, details);
  //   }}
  //   query={{
  //     key: 'AIzaSyBkUX2MyIzlkGLyAib3f09u0TmmI4uqiyU',
  //     language: 'en',
  //   }}
  // />
  // </View>
  <>
    <AddConsultantForm />
    {/* <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyBkUX2MyIzlkGLyAib3f09u0TmmI4uqiyU',
        language: 'en',
        components: 'country:ie',
      }}
      fetchDetails
    /> */}
  </>

  // <WebView
  //   source={{ html: require('./template').template() }}
  //   style={{ flex: 1 }}
  // />
);

export default MapPage;
