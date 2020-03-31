import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { api, useAuth } from "../../../lib/react-auth"
import { useCats } from "../categories"

const ADD_ITEM = "inventory/ADD_ITEM"
const GET_INVENTORY = "inventory/GET_INVENTORY"
const UPDATE_QUANTITY = "inventory/UPDATE_QUANTITY"
const DELETE_ITEM = "inventory/DELETE_ITEM"
const SEARCH_INV = "inventory/SEARCH_INV"

const initialState = {
  inventory: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, inventory: [...state.inventory, action.payload] }
    case UPDATE_QUANTITY:
      return { ...state, inventory: [...state.inventory, action.payload] }
    case DELETE_ITEM:
      return {
        ...state,
        inventory: [...state.inventory.filter(id => id !== action.payload)]
      }
    case SEARCH_INV:
      return { ...state, inventory: action.payload }
    default:
      return state
  }
}

function searchInv(item, id) {
  return dispatch => {
    api.get(`/search/${item}/${id}`).then(resp => {
      dispatch({
        type: SEARCH_INV,
        payload: resp.payload
      })
    })
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
  const { getCats } = useCats()
  const { profile } = useAuth()
  const dispatch = useDispatch()
  const inventory = useSelector(appState => appState.inventoryState.inventory)

  const post = (form, catid) => dispatch(addInventory(form, catid))
  const update = (quantity, id) => dispatch(updateQuantity(quantity, id))
  const del = id => dispatch(deleteItem(id))
  const search = (item, id) => dispatch(searchInv(item, id))

  return { inventory, post, update, del, search }
}
