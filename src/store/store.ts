import { createStore, ActionFromReducer } from 'redux';
import { SET_VEHICLES_LIST } from './actions';
import { Vehicle } from '../screens/vehicles/vehicles.options';

const store = createStore(reducer);

export function reducer(state = { vehicles: [] }, action: { type: string; payload: ActionFromReducer<Vehicle[]> }) {
  switch (action.type) {
    case SET_VEHICLES_LIST:
      return {...state, vehicles: action.payload}
    default:
      return state
  }
}

export default store;