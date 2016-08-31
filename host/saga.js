import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, changePage, updateMessage } from './actions'

function* changePageSaga() {
  while (true) {
    const { payload } = yield take(`${changePage}`)
    console.log("change page")
    yield call(sendData, 'change page', payload)
  }
}

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* updateMessageSaga() {
  while(true) {
    const { payload } = yield take(`${updateMessage}`)
    yield call(sendData, 'update message', payload)
  }
}

function* saga() {
  yield fork(changePageSaga)
  yield fork(fetchContentsSaga)
  yield fork(updateMessageSaga)
}

export default saga
