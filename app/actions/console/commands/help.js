export default function(commands) {
    return {
        minArgs: 0,
        maxArgs: 1,
        args: '',
        help: 'print this help message',

        exec(args, {onSucceeded}) {
            let s = "";
            for (const key in commands) {
                const {args, help} = commands[key];

                s += key;
                for (let i=0; i<12-key.length; i++) s += ' ';

                s += args;
                for (let i=0; i<20-args.length; i++) s += ' ';

                s += help + '\n\n';
            }
            onSucceeded(s);
        }
    }
}