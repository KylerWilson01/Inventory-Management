import { useSelector } from 'react-redux'

const ADD_ITEM = 'inventory/ADD_ITEM'

const initialState = {
  inventory: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, inventory: action.payload }
    default:
      return state
  }
}

export function useInventory() {
  const inventory = useSelector(appState => appState.inventoryState.inventory)

  return { inventory }
}