import React from 'react'
import {connect} from 'react-redux'
import {searchMore,selectResult,unselectResult} from '../../actions/search'
import {addTags,removeTags,removeEntries} from '../../actions/inspect'
import {EntryList,EntryOperations} from "../entries"

class SearchResults extends React.Component
{
    render() {

        const {entries,paginationToken,isFetching,dispatch,selectedAliases} = this.props;
        if (!entries) return null;

        return (
            <div id='search-results'>
                <h3>Results</h3>
                <EntryList
                    entries={entries}
                    hasMore={!!paginationToken}
                    isFetching={isFetching}
                    onFetchMore={() => dispatch(searchMore(paginationToken))}
                    onSelect={alias => dispatch(selectResult(alias))}
                    onUnselect={alias => dispatch(unselectResult(alias))}
                    />
                <EntryOperations
                    count={selectedAliases.length}
                    entryType='result'
                    attachTagToSelected={tag => dispatch(addTags(selectedAliases, tag))}
                    detachTagFromSelected={tag => dispatch(removeTags(selectedAliases, tag))}
                    removeSelected={() => dispatch(removeEntries(selectedAliases))}
                    />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        entries: state.search.entries,
        selectedAliases: state.search.entries.filter(x=>x.selected).map(x=>x.alias),
        paginationToken: state.search.paginationToken,
        isFetching: state.search.isSearching || state.search.isFetchingMore
    }
}

export default connect(mapStateToProps)(SearchResults);