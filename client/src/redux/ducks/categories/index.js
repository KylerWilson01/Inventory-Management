import { useSelector, useDispatch } from 'react-redux'
import { api, useAuth } from '../../../lib/react-auth'
import { useEffect } from 'react'

const ADD_CAT = 'categories/ADD_ITEM'
const GET_CAT = 'categories/GET_CAT'
const DELETE_CATEGORY = 'categories/DELETE_CATEGORY'

const initialState = {
  cats: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAT:
      return { ...state, cats: [...state.cats, action.payload] }
    case GET_CAT:
      return { ...state, cats: action.payload }
    case DELETE_CATEGORY:
      return { ...state, cats: [...state.cats.filter(id => id !== action.payload)] }
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

  const getCats = username => dispatch(getCategories(username))
  const addCat = cat => dispatch(addCategory(cat))
  const delCat = id => dispatch(deleteCat(id))

  // useEffect(() => {
  //   getCategories(profile.username)
  //   console.log('hey')
  // }, [categories])

  return { categories, getCats, addCat, delCat }
}