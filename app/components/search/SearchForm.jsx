import React from 'react'

function SearchModeRadioButton(props) {
	function onChange(event) {
		if (event.target.checked)
			props.onCheck(event.target.value);
	}
	return (
		<label className="pure-radio">
			<input
				type="radio"
				name="mode"
				disabled={props.disabled}
				value={props.value}
				checked={props.checked}
				onChange={onChange} />
			{props.text}
		</label>
	)
}

export default  class SearchForm extends React.Component {
	state = {
		mode: 'prefix',
		text:''
	}

	componentWillMount() {
		const {mode,text} = this.props;
		this.setState({mode,text});
	}

	componentWillReceiveProps(nextProps) {
		let {mode,text} = this.state;
		if (nextProps.mode && this.props.mode != nextProps.mode)
			mode = nextProps.mode;
		if (nextProps.text && this.props.text != nextProps.text)
			text = nextProps.text;
		this.setState({mode,text});
	}

	setMode = mode => {
		this.setState({mode})
	}

	setText = text => {
		this.setState({text})
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit(this.state);
	}

	render() {
		const {disabled} = this.props;
		const {text,mode} = this.state;

		return (
			<form onSubmit={this.onSubmit} className="pure-form">
				<input
					disabled={disabled}
					value={text}
					onChange={e => this.setText(e.target.value)}
					placeholder={mode} />
				<button
					type="submit"
					disabled={disabled}
					className="pure-button pure-button-primary">Search</button>
				<br/>
				<SearchModeRadioButton
					disabled={disabled}
					value="prefix"
					text="by prefix"
					checked={mode=='prefix'}
					onCheck={() => this.setMode('prefix')} />
				<SearchModeRadioButton
					disabled={disabled}
					value="tag"
					text="by tag"
					checked={mode=='tag'}
					onCheck={() => this.setMode('tag')} />
				<SearchModeRadioButton
					disabled={disabled}
					value="content"
					text="by content"
					checked={mode=='content'}
					onCheck={() => this.setMode('content')} />
			</form>
		);
	}
}
