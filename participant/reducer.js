function reducer(state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case "FETCH_CONTENTS":
      return Object.assign({}, state, {
        page: action.page,
        status: action.status,
        message: action.message,
        joined: action.joined,
      })

    case "ADD_USER":
      return Object.assign({}, state, {
        joined: action.joined,
      })

    case "CHANGE_PAGE":
      return Object.assign({}, state, {
        page: action.page,
        status: action.status,
        message: action.message,
        joined: action.joined,
      })

    case "SUBMIT_ANSWER":
      return Object.assign({}, state, {
        status: action.status,
        joined: action.joined,
      })

    case "UPDATE_MESSAGE":
      return Object.assign({}, state, {
        message: action.message,
      })

    default:
      return state
  }
}

export default reducer
