import React from 'react'
import Autocomplete from 'react-autocomplete'
import quasardbApi from '../api/QuasardbApi'

const styles = {
  item: {
    color: 'black',
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  }
}

export default class AliasInput extends React.Component {
    state = {
        alias: '',
        aliases: [],
        loading: false
    }

    get alias() {
        return this.state.alias;
    }

    onChange = (event, alias) => {
        if (alias != '') {
            this.setState({ alias, loading: true })
            quasardbApi.prefixSearch(alias, 4)
                .then(({aliases}) => this.setState({ aliases, loading: false }))
        } else {
            this.setState({ alias, aliases: []})
        }
    }

    render() {
        return <Autocomplete
          inputProps={{autoFocus: true}}
          value={this.state.alias}
          items={this.state.aliases}
          getItemValue={alias => alias}
          onSelect={(alias) => {
            this.setState({ alias, aliases: [ alias ] })
          }}
          onChange={this.onChange}
          renderItem={(alias, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={alias}
              id={alias}
            >{alias}</div>
          )}
        />
    }
}