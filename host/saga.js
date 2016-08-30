import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, changePage, updateQuestion } from './actions'

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

function* updateQuestionSaga() {
  while(true) {
    const { payload } = yield take(`${updateQuestion}`)
    yield call(sendData, 'update question', payload)
  }
}

function* saga() {
  yield fork(changePageSaga)
  yield fork(fetchContentsSaga)
  yield fork(updateQuestionSaga)
}

export default saga
