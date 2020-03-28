import { useSelector, useDispatch } from 'react-redux'
import { api } from '../../../lib/react-auth'

const ADD_CAT = 'categories/ADD_ITEM'
const GET_CAT = 'categories/GET_CAT'

const initialState = {
  cats: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAT:
      return { ...state, cats: [...state.cats, action.payload] }
    case GET_CAT:
      return { ...state, cats: action.payload }
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

export function useCats() {
  const dispatch = useDispatch()
  const categories = useSelector(appState => appState.categoriesState.cats)

  const getCats = username => dispatch(getCategories(username))
  const addCat = cat => dispatch(addCategory(cat))

  return { categories, getCats, addCat }
}