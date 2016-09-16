const initialState = {
  page: "waiting",
  users: {},
  pairs: {},
  active_pair: 0,
  config: {
    max_round: 10,
    gain_table: [[-8, -8], [0, -15], [-15, 0], [-1, -1]]
  },
  message: {
    description: [],
    experiment: "",
  },
  joined: 0,
  finish_description: 0,
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case "ADD_USER" :
      console.log("ADD_USER")
      return Object.assign({}, state, {
        users: action.users,
        joined: action.joined,
      })

    case "CHANGE_PAGE":
      return Object.assign({}, state, {
        page: action.page,
        message: action.message,
        users: action.users,
        joined: action.joined,
        finish_description: action.finish_description,
        pairs: action.pairs,
        active_pair: action.active_pair,
      })

    case "FETCH_CONTENTS":
      console.log("FETCH_CONTENTS")
      return Object.assign({}, state, {
        page: action.page,
        message: action.message,
        users: action.participants,
        joined: action.joined,
        finish_description: action.finish_description,
        pairs: action.pairs,
        config: action.config,
        active_pair: action.active_pair,
      })

    case "SUBMIT_ANSWER":
      console.log("ok")
      return Object.assign({}, state, {
        users: action.users,
        pairs: action.pairs,
        active_pair: action.active_pair,
      })

    case "UPDATE_MESSAGE":
      return Object.assign({}, state, {
        message: action.message,
      })

    case "UPDATE_CONFIG":
      return Object.assign({}, state, {
        config: action.config,
      })

    case "FINISH_DESCRIPTION":
      return Object.assign({}, state, {
        finish_description: action.finish_description,
        users: action.users,
      })

    default:
      return state
  }
}

export default reducer
