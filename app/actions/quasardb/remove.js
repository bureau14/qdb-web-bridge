import qdb from '../../api/QuasardbApi.js';
import {ENTRY_REMOVED} from './actionTypes'

export function remove(alias) {
	return dispatch => qdb.remove(alias).then(() => {dispatch(entryRemoved(alias)) })
}

function entryRemoved(alias) {
	return {
		type: ENTRY_REMOVED,
		alias
	}
}
