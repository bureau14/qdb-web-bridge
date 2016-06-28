import React from 'react'
import Infinite from 'react-infinite'
import {Link} from 'react-router'
import {Checkbox,Spinner} from '../../controls'

const itemHeight = 33;

function EntryListItem({alias,selected,onSelect,onUnselect}) {
    let className = 'entry-list-item';
    if (selected) className += ' selected';

    return (
        <div className={className}>
            <Checkbox checked={selected} onChange={selected ? onUnselect : onSelect} />
            <Link to={'/inspect/'+encodeURIComponent(alias)} className="alias">{alias}</Link>
        </div>
    )
}

export default class EntryList extends React.Component {
    getSelected = () => {
        return Object.keys(this.state.selection);
    }

    render() {
        const {hasMore,height,onFetchMore,isFetching,entries,onSelect,onUnselect} = this.props;

        return (
            <Infinite
                className='entry-list'
                infiniteLoadBeginEdgeOffset={hasMore ? 100*itemHeight : undefined}
                containerHeight={height}
                elementHeight={itemHeight}
                loadingSpinnerDelegate={<Spinner />}
                onInfiniteLoad={onFetchMore}
                isInfiniteLoading={isFetching}
                useWindowAsScrollContainer={!height}>
                {entries.map(entry =>
                    <EntryListItem
                        key={entry.alias}
                        alias={entry.alias}
                        selected={entry.selected}
                        onSelect={() => onSelect(entry.alias)}
                        onUnselect={() => onUnselect(entry.alias)}
                    />
                )}
            </Infinite>
        )
    }
}
