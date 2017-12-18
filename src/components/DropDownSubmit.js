import React from 'react'
import * as bs from 'react-bootstrap/lib/'

export default class DropDownSubmit extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: this.props.options[0][0],
			context: this.props.context
		}
		this.handleAdd = this.handleAdd.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(e) {
		this.props.submitAction(this.state)
	}

	handleAdd(e) {
		this.setState({
			selected: parseInt(e.target.value, 10)
		})
	}

	render() {
		const options = (opts) => {
			return opts.map((item) => (
				<option key={item[0]} value={item[0]}>
					{item[1]}
				</option>
			))
		}

		return (
			<div>
					<div style={{float: 'left'}}>
					<bs.FormControl
						componentClass="select"
						placeholder={this.props.placeholder}
						onChange={(e) => this.handleAdd(e)}
					>	
						{options(this.props.options)}
					</bs.FormControl>   
					</div>
					<div style={{float: 'left'}}>
					<bs.Button id="dropdown-submit" disabled={! this.state.selected } onClick={(e) => this.handleSubmit(e)}> Merge </bs.Button>
					</div>
			</div>
		)
	}
}
