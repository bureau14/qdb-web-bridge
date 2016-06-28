import React from "react"
import {connect} from 'react-redux'
import {addTags,removeTags,removeEntries,getTagged,getMoreTagged,selectTagged,unselectTagged} from '../../actions/inspect'
import {EntryList,EntryOperations} from "../entries"

const HEIGHT = 300;

class InpectTagged extends React.Component
{
    componentWillMount() {
        const {alias,entries,dispatch} = this.props;
        if (!entries) dispatch(getTagged(alias));
    }

    componentWillReceiveProps(newProps) {
        const {alias,entries} = newProps;
        const {dispatch} = this.props;
        if (!entries) dispatch(getTagged(alias));
    }

    render() {
        const {alias,entries,paginationToken,isFetching,dispatch,selectedAliases} = this.props;
        if (!entries) return null;

        return (
            <div id='inspect-tagged'>
                <h3>Tagged entries</h3>
                <EntryList
                    height={HEIGHT}
                    entries={entries}
                    hasMore={!!paginationToken}
                    isFetching={isFetching}
                    onFetchMore={() => dispatch(getMoreTagged(alias, paginationToken))}
                    onSelect={tagged => dispatch(selectTagged(alias, tagged))}
                    onUnselect={tagged => dispatch(unselectTagged(alias, tagged))}
                />
                <EntryOperations
                    count={selectedAliases.length}
                    entryType='entry'
                    attachTagged={entry => dispatch(addTags(entry,alias))}
                    detachSelectedTagged={() => dispatch(removeTags(selectedAliases, alias))}
                    attachTagToSelected={tag => dispatch(addTags(selectedAliases, tag))}
                    detachTagFromSelected={tag => dispatch(removeTags(selectedAliases, tag))}
                    removeSelected={() => dispatch(removeEntries(selectedAliases))}
                    />
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const {alias} = ownProps;
    const tagged = state.entries[alias].tagged;
    return tagged ? {
        alias,
        entries: tagged.entries,
        selectedAliases: tagged.entries.filter(x=>x.selected).map(x=>x.alias),
        paginationToken: tagged.paginationToken,
        isFetching: tagged.isFetching || tagged.isFetchingMore
    } : {
        alias, isFetching: true
    }
}

export default  connect(mapStateToProps)(InpectTagged);