import { Button } from '@react-native-material/core';
import React from "react";
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { P } from './filter.options';

const Filter = ({ filterItem, setItem, menuItems }: P) => {
  const vehiclesList = useSelector(({vehicles}) => vehicles)
  return (
    <>
      <View style={styles.container}>
        {menuItems.map((value, id) => {
          return (
            <Button
              title={value}
              onPress={() => filterItem(value)}
              key={id}
            />
          );
        })}
        <Button
          title='All'
          onPress={() => setItem(vehiclesList)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center'
  }
})

export default Filter;