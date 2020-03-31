import { useSelector, useDispatch } from "react-redux"
import { api, useAuth } from "../../../lib/react-auth"
import { useEffect } from "react"

const ADD_CAT = "categories/ADD_ITEM"
const GET_CAT = "categories/GET_CAT"
const DELETE_CATEGORY = "categories/DELETE_CATEGORY"
const SEARCH_INVENTORY = "categories/SEARCH_INVENTORY"

const initialState = {
  cats: [],
  results: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAT:
      return { ...state, cats: [...state.cats, action.payload] }
    case GET_CAT:
      return { ...state, cats: action.payload }

    case DELETE_CATEGORY:
      return {
        ...state,
        cats: [...state.cats.filter(id => id !== action.payload)]
      }
    case SEARCH_INVENTORY:
      return { ...state, results: action.payload }
    default:
      return state
  }
}

function getCategories(username) {
  return dispatch => {
    api.get(`/categories/${username}`).then(resp => {
      dispatch({
        type: GET_CAT,
        payload: resp.cats
      })
    })
  }
}

function invSearch(name) {
  return dispatch => {
    api.get("/search/" + name).then(resp => {
      dispatch({
        type: SEARCH_INVENTORY,
        payload: resp.results
      })
    })
  }
}

function addCategory(cat) {
  return dispatch => {
    api.post(`/categories/${cat.user}`, cat).then(resp => {
      dispatch({
        type: ADD_CAT,
        payload: cat
      })
    })
  }
}

function deleteCat(id) {
  return dispatch => {
    api.delete("/category/" + id).then(resp => {
      dispatch({
        type: DELETE_CATEGORY,
        payload: id
      })
    })
  }
}

export function useCats() {
  const { profile } = useAuth()
  const dispatch = useDispatch()
  const categories = useSelector(appState => appState.categoriesState.cats)

  const getCats = username => dispatch(getCategories(username))
  const addCat = cat => dispatch(addCategory(cat))
  const delCat = id => dispatch(deleteCat(id))
  const search = name => dispatch(invSearch(name))

  return { categories, getCats, addCat, delCat, search }
}

// if (action.value) {
//   const search = state.cats.map(cat => {
//     cat.inventory.filter(item =>
//       item.name.split("").includes(action.value) ? console.log(item) : ""
//     )
//   })
//   console.log(search)

// if (name)
//     api.get('/search/' + name).then(resp => {
//         const search = initialState.cats.map(cat => {
//           cat.inventory.filter(item =>
//             item.name.split("").includes(name) ? item : ""
//           )
//         })
