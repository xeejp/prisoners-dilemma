import { createAction } from 'redux-actions'

export const fetchContents = createAction('fetch contents')
export const changePage = createAction('change page', page => page)
export const updateMessage = createAction('update message', message => message)
export const updateConfig = createAction('update config', config => config)
