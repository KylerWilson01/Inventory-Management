import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { api, useAuth } from '../../../lib/react-auth'

const ADD_CAT = 'categories/ADD_ITEM'
const GET_CAT = 'categories/GET_CAT'
const DELETE_CATEGORY = 'categories/DELETE_CATEGORY'
const SEARCH_CATEGORY = 'categories/SEARCH_CATEGORY'

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
      return { ...state, cats: [...state.cats.filter(id => id !== action.payload)] }
    case SEARCH_CATEGORY:
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

function searchInv(username, item) {
  return dispatch => {
    api.get(`/search/${username}/${item}`).then(resp => {
      dispatch({
        type: SEARCH_CATEGORY,
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
    api.delete('/category/' + id).then(resp => {
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
  const results = useSelector(appState => appState.categoriesState.results)

  const getCats = username => dispatch(getCategories(username))
  const addCat = cat => dispatch(addCategory(cat))
  const delCat = id => dispatch(deleteCat(id))
  const search = (item, username) => dispatch(searchInv(item, username))

  useEffect(() => {
    getCats(profile.username)
    searchInv(profile.username, null)
  }, [results])

  return { categories, results, getCats, addCat, delCat, search }
}