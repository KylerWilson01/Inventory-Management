import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { api, useAuth } from "../../../lib/react-auth"
import { useCats } from '../categories'

const ADD_ITEM = "inventory/ADD_ITEM"
const GET_INVENTORY = "inventory/GET_INVENTORY"
const UPDATE_QUANTITY = "inventory/UPDATE_QUANTITY"
const DELETE_ITEM = "inventory/DELETE_ITEM"

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
    case DELETE_ITEM:
      return { ...state, inventory: [...state.inventory.filter(id => id !== action.payload)] }
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

function deleteItem(id) {
  console.log(id)
  return dispatch => {
    api.delete("/inventory/" + id).then(resp => {
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    })
  }
}

export function useInventory() {
  const { getCats, categories } = useCats()
  const { profile } = useAuth()
  const dispatch = useDispatch()
  const inventory = useSelector(appState => appState.inventoryState.inventory)

  const fetchInventory = catid => dispatch(getInventory(catid))
  const post = (form, catid) => dispatch(addInventory(form, catid))
  const update = (quantity, id) => dispatch(updateQuantity(quantity, id))
  const del = id => dispatch(deleteItem(id))

  useEffect(() => {
    getCats(profile.username)
    console.log(inventory)
  }, [inventory])

  return { inventory, fetchInventory, post, update, del }
}
