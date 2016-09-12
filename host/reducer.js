const initialState = {
  page: "waiting",
  users: {},
  pairs: {},
  message: {
    waiting: "",
    description: [],
    experiment: [],
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
      })

    case "SUBMIT_ANSWER":
      console.log("ok")
      return Object.assign({}, state, {
        users: action.users,
        pairs: action.pairs,
      })

    case "UPDATE_MESSAGE":
      return Object.assign({}, state, {
        message: action.message,
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
