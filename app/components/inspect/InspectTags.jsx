import React from "react"
import {connect} from 'react-redux'
import {addTags,removeTags,removeEntries,getTags,getMoreTags,selectTag,unselectTag} from '../../actions/inspect'
import {EntryList,EntryOperations} from "../entries"

const HEIGHT = 300;

class InpectTags extends React.Component
{
    state = {selectedCount: 0}

    onSelect = () => {
        let {selectedCount} = this.state;
        selectedCount++;
        this.setState({selectedCount});
    }

    onUnselect = () => {
        let {selectedCount} = this.state;
        selectedCount--;
        this.setState({selectedCount});
    }

    componentWillMount() {
        const {alias,entries,dispatch} = this.props;
        if (!entries) dispatch(getTags(alias));
    }

    componentWillReceiveProps(newProps) {
        const {alias,entries} = newProps;
        const {dispatch} = this.props;
        if (!entries) dispatch(getTags(alias));
    }

    render() {
        const {alias,entries,paginationToken,isFetching,dispatch,selectedAliases} = this.props;
        if (!entries) return null;

        return (
            <div id='inspect-tags'>
                <h3>Tags</h3>
                <EntryList
                    ref={x => this.list = x}
                    height={HEIGHT}
                    entries={entries}
                    hasMore={!!paginationToken}
                    isFetching={isFetching}
                    onFetchMore={() => dispatch(getMoreTags(alias, paginationToken))}
                    onSelect={tag => dispatch(selectTag(alias, tag))}
                    onUnselect={tag => dispatch(unselectTag(alias, tag))}
                />
                <EntryOperations
                    count={selectedAliases.length}
                    entryType='tag'
                    attachTag={tag => dispatch(addTags(alias, tag))}
                    detachSelectedTags={() => dispatch(removeTags(alias, selectedAliases))}
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
    const tags = state.entries[alias].tags;
    return tags ? {
        alias,
        entries: tags.entries,
        selectedAliases: tags.entries.filter(x=>x.selected).map(x=>x.alias),
        paginationToken: tags.paginationToken,
        isFetching: tags.isFetching || tags.isFetchingMore
    } : {
        alias, isFetching: true
    }
}

export default  connect(mapStateToProps)(InpectTags);