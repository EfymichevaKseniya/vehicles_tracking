import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StatusBar, StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import fetchMockData from '../../helpers/fetchMockData';
import { Vehicle } from './vehicles.options';
import {
  Switch,
  ListItem,
} from "@react-native-material/core";
import Map from '../../components/map/map';
import { NavigationProp, ParamListBase, Route, RouteProp, useNavigation } from '@react-navigation/native';
import store from '../../store/store';
import { SET_VEHICLES_LIST } from '../../store/actions';
import Filter from '../../components/filter/filter';

function Vehicles() {
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [showMap, setShowMap] = useState<boolean>(false)
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  useEffect(() => {
    getVehicles()
  }, [])

  // получение всех ТС из имитации запроса
  async function getVehicles() {
    try {
      setLoading(true);
      const data = await fetchMockData();
      store.dispatch({ type: SET_VEHICLES_LIST, payload: data})
      setLoading(false);
      setVehiclesList(data as Vehicle[]);
    } catch (error) {
      setLoading(false);
      setVehiclesList([]);
      return Alert.alert(error as string);
    }
  }

  // обновление страницы с получением ТС
  const onRefresh = React.useCallback(() => {
    getVehicles()
  }, []);

  // переход на экран ТС
  const goToVehicleInfo = (id: string) => {
    navigation.navigate('VehicleInfo', {id: id})
  }

  const toggleShowMap = () => {
    setShowMap(!showMap)
  }

  const menuItems = [...new Set(vehiclesList?.map((Val) => Val.name))];

  const filterItem = (category: string) => {
    const list = vehiclesList;
    const filteredList = list?.filter((newVal) => {
      return newVal.name === category;
    });
    setVehiclesList(filteredList);
  };

  if (loading) {
    return (
      <ActivityIndicator style={styles.preloader} />
    )
  }

  return (
    <View style={styles.container}>
      <ListItem
        title="Show map"
        trailing={
          <Switch value={showMap} onValueChange={toggleShowMap}/>
        }
      />
      <Filter
        filterItem={filterItem}
        setItem={setVehiclesList}
        menuItems={menuItems}
      />
      <>
        {!showMap ? (
          <FlatList
            data={vehiclesList}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                colors={["#9Bd35A", "#689F38"]}
                refreshing={loading}
                onRefresh={onRefresh}
              />
            }
            renderItem={({item, index}) => (
              <TouchableOpacity style={styles.item} onPress={() => goToVehicleInfo(item.id)}>
                <Text style={styles.title}>{`${item.name}#${index}`}</Text>
                <Text style={styles.title}>{item.driver_name}</Text>
                <Text style={styles.title}>{item.type}</Text>
              </TouchableOpacity>
            )}
          />) : (
            <Map markers={vehiclesList || []}/>
          )
        }
      </>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
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
  preloader: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  },
  text: {
    color: '#000'
  }
});

export default Vehicles;