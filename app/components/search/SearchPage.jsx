import React              from 'react';
import {connect}          from 'react-redux'
import {withRouter} from 'react-router'

import SearchForm         from './SearchForm.jsx';
import SearchResults      from './SearchResults.jsx';
import {Spinner}          from '../../controls'

function computeLocation({text, mode}) {
    return {
        pathname: 'search',
        query: {text, mode}
    }
}

function SearchError({error}) {
    return <h4>ERROR: {error}</h4>
}

function SearchProgress({text}) {
    return (
        <div>
            <p>Searching for <em>{text}</em>...</p>
            <p><Spinner /></p>
        </div>
    )
}


class SearchPage extends React.Component {

    search = (cfg) => {
        const {router} = this.props;
        router.push(computeLocation(cfg));
    }

    render() {
        const {isSearching,error,mode,text} = this.props;
        return (
            <div id='search-page' className='page'>
                <h3>Database search</h3>
                <SearchForm
                    text={text} mode={mode}
                    disabled={isSearching}
                    onSubmit={this.search} />
                <SearchResults />
                {isSearching && <SearchProgress text={text} /> }
                {error && <SearchError error={error} />}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        text: state.search.text,
        mode: state.search.mode,
        error: state.search.error,
        isSearching: state.search.isSearching
    }
}

export default withRouter(connect(mapStateToProps)(SearchPage));