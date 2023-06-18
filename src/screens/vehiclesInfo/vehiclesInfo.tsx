import React from 'react';
import { Alert, Linking, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Vehicle } from '../vehicles/vehicles.options';
import {
  Button,
  Text,
} from "@react-native-material/core";
import { useSelector } from 'react-redux';
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import Map from '../../components/map/map';

function VehicleInfo() {
  const vehicles = useSelector(({ vehicles }) => vehicles)
  const route = useRoute<RouteProp<ParamListBase>>()
  const { id } = route.params as { id: string };
  const vehicle = vehicles.filter((item: Vehicle) => item.id === id)

  const message = 'Добрый день, подскажите пожалуйста, какой номер заказа у вас сейчас в работе'

  const callNumber = () => {
    let phoneNumber = vehicle.phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    else  {
      phoneNumber = `tel:${phoneNumber}`;
    }
    Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      {vehicle.map((item: Vehicle) => {
        return (
          <View style={styles.item} key={item.id}>
            <Text style={styles.title}>{item.type}</Text>
            <Text style={styles.title}>{item.driver_name}</Text>
            <Text style={styles.title}>{item.phone}</Text>
            <View style={styles.buttons}>
              <Button
                title='Call'
                onPress={callNumber}
              />
              <Button
                title='Message'
                onPress={() => {
                  Linking.openURL(`whatsapp://send?text=${message}&phone=${item.phone}`)
                }}
              />
            </View>
          </View>
          )
        })
      }
      <Map markers={vehicle} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 20
  }
});

export default VehicleInfo;