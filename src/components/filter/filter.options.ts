import { Vehicle } from '../../screens/vehicles/vehicles.options'

export type P = {
  filterItem: (value: string) => void
  setItem: (items: Vehicle[]) => void
  menuItems: string[]
}