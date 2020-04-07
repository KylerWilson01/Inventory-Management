import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { api, useAuth } from "../../../lib/react-auth"
import { useCats } from "../categories"
import axios from "axios"

const ADD_ITEM = "inventory/ADD_ITEM"
const GET_INVENTORY = "inventory/GET_INVENTORY"
const UPDATE_ITEM = "inventory/UPDATE_ITEM"
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
    case UPDATE_ITEM:
      return { ...state, inventory: [...state.inventory, action.payload] }
    case DELETE_ITEM:
      return {
        ...state,
        inventory: [...state.inventory.filter(id => id !== action.payload)]
      }
    default:
      return state
  }
}

const config = {
  headers: {
    "content-type": "multipart/form-data"
  }
}

function updateItem(form, id) {
  return dispatch => {
    api.patch("/inventory", { form, id }).then(resp => {
      dispatch({
        type: UPDATE_ITEM,
        payload: { form, id }
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

function addPicture(picture) {
  return dispatch => {
    axios
      .post("/api/upload", picture, config)
      .then(resp => { })
      .catch(err => console.log(err))
  }
}

function addInventory(form, catid, picture) {
  const item = { form, catid, picture }
  return dispatch => {
    api
      .post("/inventory", item)
      .then(resp => {
        dispatch({
          type: ADD_ITEM,
          payload: item
        })
      })
      .catch(e => console.log(e))
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

  const fetchInventory = catid => dispatch(getInventory(catid))
  const update = (form, id) => dispatch(updateItem(form, id))
  const post = (form, catid, picture) =>
    dispatch(addInventory(form, catid, picture))
  const addPic = picture => dispatch(addPicture(picture))
  const del = id => dispatch(deleteItem(id))

  useEffect(() => {
    getCats(profile.username)
  }, [inventory])

  return { inventory, fetchInventory, post, update, del, addPic }
}
