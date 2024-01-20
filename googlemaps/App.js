import React, { useState, useEffect } from 'react';
import MapView, {Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Constants } from 'expo-constants';
import MapViewDirection from 'react-native-maps-directions'
import * as Location from 'expo-location';

const GOOGLE_API_KEY = "AIzaSyBo988K53_gLTRL0MHoiZGkIjOUoJheyEQ"

const { width, height } = Dimensions.get("window")

const initalPosition = {
  latitude: 10.768879,
  longitude: 106.656034,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02 * width / height
}

const cordinates = [
  {
    latitude: 10.763354,
    longitude: 106.682120
  },
  {
    latitude: 10.768879,
    longitude: 106.656034
  }
]

const marker = {
  title: 'HCMUS',
  description: 'Trường đại học Khoa học tự nhiên TP Hồ Chí Minh',
  latlng: {
    latitude: 10.768879,
    longitude: 106.656034
  }
}



export default function App() {

  const [hasLocationPermission, setHasLocationPermission] = useState(true)
  const [location, setLocation] = useState(null);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [location]);
  

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        provider={PROVIDER_DEFAULT}
        initialRegion={initalPosition}
        showsUserLocation={true}
        userLocationAnnotationTitle="Your Location">
        <Marker
          coordinate={cordinates[1]}
          title={'Sân cầu lông Phú Thọ'}
          description={'Sân cầu lông Phú Thọ'}
        />
        {
          location !== null ? (
            <MapViewDirection
              origin={location.coords}
              destination={cordinates[1]}
              apikey={GOOGLE_API_KEY}
            />
          ) : ('')
        }
        
      </MapView>

      <View style={styles.textAutoComplete}>
        <GooglePlacesAutocomplete
          styles={styles.search}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: 'vi',
          }}
          placeholder='Search...'/>
      </View>

      <View>
        {location ? (
          <Text>
            Location: {location.coords.latitude}, {location.coords.longitude}
          </Text>
        ) : (
          <Text>Loading location...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff"
  },
  map: {
    width: '100%',
    height: '100%',
  },
  textAutoComplete: {
    position: 'absolute',
    width: '90%',
    padding: 2,
    backgroundColor: "#ffffff",
    color: "red",
    borderRadius: 10,
    borderColor: '2px solid black',
    flex: 1,
    alignContent: 'center', 
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
    top: 40,
  },
  search: {
    backgroundColor: "#ffffff",
    shadowColor: "black"
  }
});
