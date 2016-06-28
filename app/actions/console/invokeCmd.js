import {CMD_CANCELLED,CMD_FAILED,CMD_INVOKED,CMD_SUCCEEDED,CMD_PROGRESS} from './actionTypes'
import commands from './commands'

export function invokeCmd(commandLine, done) {
    return dispatch => {
        var args = commandLine.split(' ').filter(Boolean);
        dispatch(cmdInvoked(commandLine));

        const mnemonic = args.shift();
        const cmd = commands[mnemonic];

        if (!cmd) {
            dispatch(cmdFailed(`Unknown command ${mnemonic}`));
            return;
        }

        if (args.length < cmd.minArgs) {
            dispatch(cmdFailed(`Not enough arguments. Command ${mnemonic} expects: ${cmd.args}`));
            return;
        }

         if (args.length > cmd.maxArgs) {
            dispatch(cmdFailed(`Too many arguments. Command ${mnemonic} expects: ${cmd.args}`));
            return;
        }

        return cmd.exec(args, {
            dispatch,
            onCancelled: () => {
                dispatch(cmdCancelled())
                done();
            },
            onSucceeded: text => {
                dispatch(cmdSucceeded(text))
                done();
            },
            onFailed: error => {
                dispatch(cmdFailed(error));
                done();
            },
            onProgess: progress => {
                dispatch(cmdProgress(progress));
            }
        });
    }
}

function cmdCancelled() {
    return {
        type: CMD_CANCELLED
    }
}

function cmdFailed(error) {
    return {
        type: CMD_FAILED,
        error
    }
}

function cmdInvoked(commandLine) {
    return {
        type: CMD_INVOKED,
        commandLine
    }
}

function cmdSucceeded(result) {
    return {
        type: CMD_SUCCEEDED,
        result
    }
}

function cmdProgress(progress) {
    return {
        type: CMD_PROGRESS,
        progress
    }
}