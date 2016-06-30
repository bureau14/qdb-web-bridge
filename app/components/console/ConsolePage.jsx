import {connect} from 'react-redux'
import React from 'react';
import {invokeCmd} from '../../actions/console'

const hidden = {visibility:'hidden'}

class ConsolePage extends React.Component {
    state = {
        input: "",
        historyPosition: 0
    }

    onInputChange = e => {
        this.setState({input: e.target.value});
    }

    onSubmit = (e) => {
        const {dispatch} = this.props;
        const {input} = this.state;

        e.preventDefault();
        if (input != '') {
            dispatch(invokeCmd(input, () => this.input.focus()));
            this.setState({input: '',historyPosition: 0});
        }
    }

    onClick = () => {
        this.input.focus();
    }

    onKeyDown = event => {
        const upArrow = event.keyCode == 38;
        const downArrow = event.keyCode == 40;

        if (!upArrow && !downArrow) return;

        const {history} = this.props;
        let {historyPosition,input} = this.state;

        if (upArrow && historyPosition<history.length) {
            historyPosition++;
        }

        if (downArrow && historyPosition>0) {
            historyPosition--;
        }

        if (historyPosition != 0) {
            input = history[history.length-historyPosition];
        } else {
            input = ''
        }

        this.setState({input,historyPosition})
    }

    render() {
        const {lines,busy,progress} = this.props;
        const {input} = this.state;
        return (
            <div className='console page'>
                <pre className='console-text' onClick={this.onClick}>
                    {lines.map((line, index) => <p key={index} className={line.type}>{line.text}</p>)}
                    {busy && <progress value={progress} />}
                    <form className='console-input' onSubmit={this.onSubmit} style={busy ? hidden : {}}>
                        <span>qdb> </span>
                        <input ref={ref => this.input = ref} value={input} onChange={this.onInputChange} onKeyDown={this.onKeyDown} />
                    </form>
                </pre>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        lines: state.console.lines,
        busy: state.console.busy,
        progress: state.console.progress,
        history: state.console.history
    }
}

export default connect(mapStateToProps)(ConsolePage);
