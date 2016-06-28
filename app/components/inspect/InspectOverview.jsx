import React from 'react'
import {connect} from "react-redux"
import bytes from 'bytes'

import {Button,Icon} from '../../controls'
import {removeEntries} from '../../actions/inspect'

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

function Expiry({expiry}) {
    return <Row head='Expiry'>
        <form>
            <input type='text' value={expiry} />
            <Button icon='pencil' text='Set' />
            <Button icon='eraser' text='Unset' />
        </form>
    </Row>
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

    return (
        <div className='qdb-entry-overview pure-form'>
            <h3><Icon className="fa fa-book" /> Overview</h3>
            <table>
                <tbody>
                    <Alias alias={alias} />
                    <Type type={entryType} />
                    {entryType == 'blob' && <Mime mime={mime} />}
                    {entryType == 'blob' && <Size size={size} />}
                    <Expiry expiry={expiry} />
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
        size: entry.size
    }
}

export default connect(mapStateToProps)(InspectOverview);