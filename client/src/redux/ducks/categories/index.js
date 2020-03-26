import { useSelector, useDispatch } from 'react-redux'
import { api } from '../../../lib/react-auth'

const ADD_CAT = 'categories/ADD_ITEM'
const GET_CAT = 'categories/GET_CAT'

const initialState = {
  cat: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAT:
      return { ...state, cat: action.payload }
    case GET_CAT:
      return { ...state, cat: action.payload }
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

export function useCats() {
  const dispatch = useDispatch()
  const categories = useSelector(appState => appState.categoriesState.cat)

  const getCats = username => dispatch(getCategories(username))

  return { categories, getCats }
}