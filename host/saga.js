import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, changePage, updateMessage, updateConfig, rematch } from './actions'

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

function* updateConfigSaga() {
  while(true) {
    const { payload } = yield take(`${updateConfig}`)
    yield call(sendData, 'update config', payload)
  }
}

function* rematchSaga() {
  while (true) {
    yield take(`${rematch}`)
    yield call(sendData, 'rematch')
  }
}


function* saga() {
  yield fork(changePageSaga)
  yield fork(fetchContentsSaga)
  yield fork(updateMessageSaga)
  yield fork(updateConfigSaga)
  yield fork(rematchSaga)
}

export default saga
