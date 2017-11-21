import FormControl from 'react-bootstrap/lib/FormControl'
import Button from 'react-bootstrap/lib/Button'
import React from 'react'

export default class DropDownSubmit extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: Object.keys(this.props.options)[0]
		}
		this.handleAdd = this.handleAdd.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(e) {
		this.props.submitAction(this.state.selected)
	}

	handleAdd(e) {
		this.setState({
			selected: e.target.value
		})
	}

	render() {
		const options = (opts) =>
			Object.entries(opts).map((item) => (
				<option key={item[0]} value={item[0]}>
					{' '}
					{item[1]}{' '}
				</option>
			))

		return (
			<div>
				<FormControl
					componentClass="select"
					placeholder="qualification title"
					onChange={(e) => this.handleAdd(e)}
				>
					{' '}
					{options(this.props.options)}{' '}
				</FormControl>{' '}
				<Button onClick={(e) => this.handleSubmit(e)}> Submit </Button>{' '}
			</div>
		)
	}
}
