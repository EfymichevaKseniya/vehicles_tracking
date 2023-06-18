/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Vehicles from './src/screens/vehicles/vehicles';
import { Provider } from "@react-native-material/core";
import VehicleInfo from './src/screens/vehiclesInfo/vehiclesInfo';
import store from './src/store/store';
import { Provider as ProviderStore } from 'react-redux';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <ProviderStore store={store}>
      <Provider>
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen
                name="Vehicles"
                component={Vehicles}
                options={{title: 'Vehicals List'}}
              />
              <Stack.Screen name="VehicleInfo" component={VehicleInfo} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ProviderStore>
  );
}

export default App;
