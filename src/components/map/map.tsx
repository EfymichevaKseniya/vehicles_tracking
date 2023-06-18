import React from 'react';
import { YaMap, Marker, Geocoder } from 'react-native-yamap';
import { Image, StyleSheet } from 'react-native';
import Car from '../../../assets/car.png';
import Truck from '../../../assets/truck.png'
import Special from '../../../assets/special.png'
import { P } from './map.options';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const API_KEY = "12d0c7a6-81a5-4d24-ac4a-e6d10ab7742e"
const GEOCODER = "78bff2c2-7e95-4951-91c9-21ec600dd8b2"

YaMap.init(API_KEY);
Geocoder.init(GEOCODER);

const Map = ({ markers }: P) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const onMarkerPress = (id: string) => {
    navigation.navigate('VehicleInfo', {id: id})
  }
  return (
    <>
      <YaMap
        mapType={'vector'}
        style={MapStyles.map}
      >
        {markers &&
          markers.map(marker => {
            let markerImage;
            switch (marker.type) {
              case 'B':
                markerImage = Car
                break;
              case 'C':
                markerImage = Truck
                break;
              case 'D':
                markerImage = Special
                break;
              default: return
            }
            return (
              <Marker
                key={marker.id}
                children={
                  <Image
                    style={MapStyles.marker}
                    source={markerImage} />
                }
                point={{ lat: marker.latitude, lon: marker.longitude }}
                onPress={() => onMarkerPress(marker.id)}
              />
            )
          })
        }
      </YaMap>
    </>
  );
};

export default Map;

const MapStyles  = StyleSheet.create({
  map: {
    width: '100%',
    height: 300,
    marginTop: 20
  },

  marker: {
    width: 60,
    height: 60,
  },
})
