const initialState = {
  page: "waiting",
  users: {},
  message: {
    waiting: "",
    description: [],
    experiment: [],
  },
  join_experiment: 0,
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case "ADD_USER" :
      console.log("ADD_USER")
      return Object.assign({}, state, {
        users: action.users,
      })

    case "CHANGE_PAGE":
      return Object.assign({}, state, {
        page: action.page,
        message: action.message,
        users: action.users,
        join_experiment: action.join_experiment,
      })

    case "FETCH_CONTENTS":
      console.log("FETCH_CONTENTS")
      return Object.assign({}, state, {
        page: action.page,
        message: action.message,
        users: action.participants,
        join_experiment: action.join_experiment,
      })

    case "SUBMIT_ANSWER":
      console.log("ok")
      return Object.assign({}, state, {
        users: action.users,
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
