import { createAction } from 'redux-act'

export const fetchContents = createAction('fetch contents')
export const submitAnswer = createAction('submit answer')
export const finishDescription = createAction('finish description')

export const updateSnum = createAction("update snum")