import React from 'react'
import {connect} from "react-redux"
import bytes from 'bytes'
import Datetime from 'react-datetime'
import toastr from 'toastr';

import {Button,Icon} from '../../controls'
import {removeEntries} from '../../actions/inspect'
import {setExpiry} from '../../actions/quasardb'

function Row({head, children}) {
    return (
        <tr>
            <th>{head}</th>
            <td>{children}</td>
        </tr>
    )
}

function Alias({alias}) {
    return <Row head='Alias'><pre>{alias}</pre></Row>
}

function Type({type}) {
    return <Row head='Type'><pre>{type}</pre></Row>
}

function Mime({mime}) {
    return <Row head='MIME'><pre>{mime}</pre></Row>
}

function Size({size}) {
    return <Row head='Size'><pre>{bytes(size)}</pre></Row>
}

class Expiry extends React.Component {
    state = {}

    componentWillMount() {
        this.setExpiry(this.props.expiry);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.expiry != newProps.expiry)
            this.setExpiry(newProps.expiry);
    }

    setExpiry = expiry => {
        this.setState({
            expiry,
            value: expiry != 0 ? new Date(expiry*1000) : "Never",
            canSave: false,
            canClear: expiry != 0
        })
    }

    onChange = moment => {
        try {
            this.setState({
                value: moment,
                expiry: moment.unix(),
                canSave: true,
                canClear: true
            });
        }
        catch(e) {
            this.setState({
                expiry: undefined,
                value: moment,
                canSave: false,
                canClear: true
            });
        }
    }

    onSave = () => {
        this.props.onSave(this.state.expiry);
    }

    onClear = () =>  {
        this.setState({
            expiry: 0,
            value: "Never",
            canSave: true,
            canClear: false
        });
    }

    render() {
        const {value,canSave,canClear} = this.state;
        return (
            <Row head='Expiry'>
                <form>
                    <Datetime value={value} onChange={this.onChange} />
                    <Button icon='eraser' text='' onClick={canClear && this.onClear} />
                    <Button icon='floppy-o' text='Save' onClick={canSave && this.onSave}/>
                </form>
            </Row>
        )
    }
}

function RemoveButton({onClick}) {
    return (
        <Button
            icon='trash'
            text='Remove entry'
            onClick={onClick}
            />
    );
}

function InspectOverview({dispatch,alias,entryType,expiry,mime,size}) {
    function onRemoveClick() {
        if (confirm('This will delete entry.\nAre you sure?'))
            dispatch(removeEntries(alias));
    }

    function onSetExpiry(newExpiry) {
        dispatch(setExpiry(alias, newExpiry))
            .catch(err => toastr.error(err))
    }

    return (
        <div className='qdb-entry-overview pure-form'>
            <h3><Icon className="fa fa-book" /> Overview</h3>
            <table>
                <tbody>
                    <Alias alias={alias} />
                    <Type type={entryType} />
                    {entryType == 'blob' && <Mime mime={mime} />}
                    {entryType == 'blob' && <Size size={size} />}
                    <Expiry expiry={expiry} onSave={onSetExpiry}/>
                </tbody>
            </table>
            <RemoveButton onClick={onRemoveClick} />
        </div>
    )
}

function mapStateToProps(state, ownProps) {
    const {alias} = ownProps;
    const entry = state.entries[alias];
    return {
        alias,
        entryType: entry.entryType,
        mime: entry.mime,
        size: entry.size,
        expiry: entry.expiry
    }
}

export default connect(mapStateToProps)(InspectOverview);