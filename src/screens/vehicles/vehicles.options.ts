import { Float } from 'react-native/Libraries/Types/CodegenTypes'

export type Vehicle = {
  id: string,
  driver_name: string
  type: string
  phone: string
  longitude: Float
  latitude: Float
  name: string
}

export type P = {
  list: Vehicle[]
}

export type NavigationProps = {
  route: string,
  id?: string
}