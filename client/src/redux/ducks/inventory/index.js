import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { api, useAuth } from "../../../lib/react-auth"
import { useCats } from "../categories"
import axios from "axios"

const GET_PICTURES = "inventory/GET_PICTURES"
const ADD_ITEM = "inventory/ADD_ITEM"
const UPDATE_ITEM = "inventory/UPDATE_ITEM"
const DELETE_ITEM = "inventory/DELETE_ITEM"

const initialState = {
  inventory: [],
  pictures: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PICTURES:
      return { ...state, pictures: action.payload }
    case ADD_ITEM:
      return { ...state, inventory: [...state.inventory, action.payload] }
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

function updateItem(form, picture, id) {
  return dispatch => {
    api.patch("/inventory", { form, picture, id }).then(resp => {
      dispatch({
        type: UPDATE_ITEM,
        payload: { form, picture, id }
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

function getImages() {
  return dispatch => {
    axios.get("/api/images").then(resp => {
      dispatch({
        type: GET_PICTURES,
        payload: resp.data
      })
    })
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
  const picture = useSelector(appState => appState.inventoryState.pictures)


  const update = (form, picture, id) => dispatch(updateItem(form, picture, id))
  const post = (form, catid, picture) =>
    dispatch(addInventory(form, catid, picture))
  const addPic = picture => dispatch(addPicture(picture))
  const del = id => dispatch(deleteItem(id))

  useEffect(() => {
    getCats(profile.username)
    dispatch(getImages())
  }, [dispatch, inventory])

  return { inventory, picture, post, update, del, addPic }
}
