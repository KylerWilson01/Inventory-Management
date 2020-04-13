import { useSelector, useDispatch } from "react-redux"
import { api } from "../../../lib/react-auth"

const UPDATE_PASSWORD = "user/UPDATE_PASSWORD"

const initialState = {
  password: "",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload }
    default:
      return state
  }
}

function updatePassword(password, username) {
  return (dispatch) => {
    api.patch(`/password`, { password, username }).then(resp => {
      dispatch({
        type: UPDATE_PASSWORD,
        payload: password
      })
    })
  }
}

export function useUsers() {
  const dispatch = useDispatch()
  const password = useSelector(appState => appState.userState.password)

  const changePassword = (password, username) =>
    dispatch(updatePassword(password, username))

  return { changePassword }
}
