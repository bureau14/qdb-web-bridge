import React from 'react';
import {connect} from "react-redux"

import InspectOverview from "./InspectOverview.jsx"
import InspectError from "./InspectError"
import InspectTagged from "./InspectTagged.jsx"
import InspectTags from "./InspectTags.jsx"
import InspectContent from "./InspectContent.jsx"
import {Spinner} from '../../controls'

function InspectPage({alias,error,isFetching,entryType,mime}) {


    if (isFetching) {
        return (
            <div id='inspect-page' className='page'>
                <Spinner />
            </div>
        )
    }

    if (error) {
        return (
            <div id='inspect-page' className='page'>
                <InspectError alias={alias} error={error} />
            </div>
        )
    }

    return (
        <div id='inspect-page' className='page'>
            <InspectOverview alias={alias} />
            <InspectTags alias={alias} />
            { entryType == 'tag' && <InspectTagged alias={alias} />}
            { entryType == 'blob' && <InspectContent mime={mime} alias={alias} />}
        </div>
    )
}

function mapStateToProps(state, ownProps) {
    const {alias} = ownProps.params;
    const entry = state.entries[alias];
    return {
        alias,
        entryType: entry.entryType,
        error: entry.error,
        isFetching: entry.isFetching,
        mime: entry.mime
    }
}

export default connect(mapStateToProps)(InspectPage);
