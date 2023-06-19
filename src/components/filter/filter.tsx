import React, { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { P } from './filter.options';
import { Vehicle } from '../../screens/vehicles/vehicles.options';
import MultiSelect from 'react-native-multiple-select';

const Filter = ({ setItem }: P) => {
  const vehiclesList = useSelector(({vehicles}) => vehicles)
  const [selectedCategiries, setSelectedCategiries] = useState<string[]>([]);
  const categories = [
    {
      id: 'car',
      name: 'car'
    }, {
      id: 'truck',
      name: 'truck'
    },
    {
      id: 'special',
      name: 'special'
    }
  ]

  useEffect(() => {
    if (selectedCategiries.length === 0) {
      setItem(vehiclesList)
    } else {
      setItem(
        vehiclesList.filter((item: Vehicle) =>
        selectedCategiries.some(category => [item.name].flat().includes(category))
        )
      )
    }
  }, [selectedCategiries])

  const onSelectedItemsChange = (selectedItems: string[]) => {
    setSelectedCategiries(selectedItems);
    const filteredItems = vehiclesList;

    if (selectedItems) {
      setItem(vehiclesList.filter((item: Vehicle) => selectedCategiries.includes(item.name)))
    } else {
      setItem(filteredItems)
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <MultiSelect
            items={categories}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedCategiries}
            selectText="Select category"
            altFontFamily="ProximaNova-Light"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#CCC"
            submitButtonText="Apply"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    marginVertical: 20,
    width: '100%'
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    color: '#000'
  },
});

export default Filter;