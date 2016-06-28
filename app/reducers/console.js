import {
    CMD_CANCELLED,
    CMD_FAILED,
    CMD_INVOKED,
    CMD_PROGRESS,
    CMD_SUCCEEDED
} from '../actions/console/actionTypes'

const initialState = {
    lines: [],
    busy: false,
    history: []
}

export default function consoleReducer(state=initialState, action) {
    switch(action.type) {

    case CMD_CANCELLED:
        return {
            ...state,
            busy: false,
            lines: state.lines.concat({
                type: "cancel",
                text: "Cancelled."
            })
        }

    case CMD_FAILED:
        return {
            ...state,
            busy: false,
            lines: state.lines.concat({
                type: "error",
                text: action.error
            })
        }

    case CMD_INVOKED:
        return {
            ...state,
            busy: true,
            progress: undefined,
            lines: state.lines.concat({
                type: "invocation",
                text: `qdb> ${action.commandLine}`
            }),
            history: state.history.concat(action.commandLine)
        }

    case CMD_PROGRESS:
        return {
            ...state,
            progress: action.progress
        }

    case CMD_SUCCEEDED:
        return {
            ...state,
            busy: false,
            lines: state.lines.concat({
                type: "success",
                text: action.result
            })
        }

    default:
        return state;
    }
}