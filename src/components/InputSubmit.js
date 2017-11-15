import FormControl from "react-bootstrap/lib/FormControl"
import Button from 'react-bootstrap/lib/Button'
import React from "react"

export default class InputSubmit extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { title: ''}
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleUpdate(e) {
        this.setState({title: e.target.value})
    }

    handleSubmit(e) {
        this.props.submitAction(this.state.title)
    }

    render() {
        return (
            <div>
            <FormControl
                componentClass='input'
                placeholder='qualification title'
                onChange={e => this.handleUpdate(e)}
                value={this.state.title}
            />
            <Button onClick={ e => this.handleSubmit(e)}>
                Submit
            </Button>
            </div>
        )
    }
}