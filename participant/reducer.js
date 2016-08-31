function reducer(state = {}, action) {
  const { type, payload } = action
  switch (type) {
    case "FETCH_CONTENTS":
      return Object.assign({}, state, {
        page: action.page,
        status: action.status,
        message: action.message,
        join_experiment: action.join_experiment,
      })

    case "ADD_USER":
      return Object.assign({}, state, {
        join_experiment: action.join_experiment,
      })

    case "CHANGE_PAGE":
      return Object.assign({}, state, {
        page: action.page,
        status: action.status,
        message: action.message,
        join_experiment: action.join_experiment,
      })

    case "SUBMIT_ANSWER":
      return Object.assign({}, state, {
        status: action.status,
        join_experiment: action.join_experiment,
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
