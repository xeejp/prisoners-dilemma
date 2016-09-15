function reducer(state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case "FETCH_CONTENTS":
      return Object.assign({}, state, {
        page: action.page,
        own_id: action.own_id,
        status: action.status,
        message: action.message,
        joined: action.joined,
        logs: action.logs,
        own_data: action.own_data,
        config: action.config,
        users: action.users,
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
        config: action.config,
        joined: action.joined,
        logs: action.logs,
        own_data: action.own_data,
        users: action.users,
      })

    case "SUBMIT_ANSWER":
      return Object.assign({}, state, {
        logs: action.logs,
        own_data: action.own_data,
      })

    case "UPDATE_MESSAGE":
      return Object.assign({}, state, {
        message: action.message,
      })

    case "UPDATE_CONFIG":
      return Object.assign({}, state, {
        config: action.config,
      })

    default:
      return state
  }
}

export default reducer
