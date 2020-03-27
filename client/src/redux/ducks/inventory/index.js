import { useSelector, useDispatch } from "react-redux"
import { api } from "../../../lib/react-auth"

const ADD_ITEM = "inventory/ADD_ITEM"
const GET_INVENTORY = "inventory/GET_INVENTORY"
const UPDATE_QUANTITY = "inventory/UPDATE_QUANTITY"

const initialState = {
  inventory: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, inventory: [...state.inventory, action.payload] }
    case GET_INVENTORY:
      return { ...state, inventory: action.payload }
    case UPDATE_QUANTITY:
      return { ...state, inventory: [...state.inventory, action.payload] }
    default:
      return state
  }
}

function updateQuantity(quantity, id) {
  return dispatch => {
    api.patch("/inventory", { quantity, id }).then(resp => {
      dispatch({
        type: UPDATE_QUANTITY,
        payload: { quantity, id }
      })
    })
  }
}

function getInventory(catid) {
  return dispatch => {
    api.get(`/inventory/${catid}`).then(resp => {
      dispatch({
        type: GET_INVENTORY,
        payload: resp.results
      })
    })
  }
}

function addInventory(form, catid) {
  const item = { form, catid }
  return dispatch => {
    api.post("/inventory", item).then(resp => {
      dispatch({
        type: ADD_ITEM,
        payload: item
      })
    })
  }
}

export function useInventory() {
  const dispatch = useDispatch()
  const inventory = useSelector(appState => appState.inventoryState.inventory)

  const fetchInventory = catid => dispatch(getInventory(catid))
  const post = (form, catid) => dispatch(addInventory(form, catid))
  const update = (quantity, id) => dispatch(updateQuantity(quantity, id))

  return { inventory, fetchInventory, post, update }
}
