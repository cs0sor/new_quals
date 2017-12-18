import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'
import configureStore from '../store/configure-store'
import DropDownAdd from '../components/DropDownSubmit'
import { addUnitToQualification } from '../actions/qualification-actions'

Enzyme.configure({ adapter: new Adapter() })

it('renders the Dropdown Submit component', () => {
	const units = [
		['1', 'Option 1'],
		['2', 'Option 2'],
		['3', 'Option 3']
	]

	const component = mount(<DropDownAdd options={units} />)

	expect(component.state().selected).toEqual('1')
})

it('selects an option', () => {
	const units = [
		['1', 'Option 1'],
		['2', 'Option 2'],
		['3', 'Option 3']
	]
	
	const component = mount(<DropDownAdd options={units} />)

	component.find('select').simulate('change', { target: { value: '3' } })
	expect(component.state().selected).toEqual(3)
})

it('submits an option', () => {
	const store = configureStore()

	const handleSubmit = (selected) => {
		store.dispatch(addUnitToQualification(selected))
	}

	const units = [
		['1', 'Option 1'],
		['2', 'Option 2'],
		['3', 'Option 3']
	]

	const component = mount(<DropDownAdd options={units} submitAction={handleSubmit} />)

	component.find('select').simulate('change', { target: { value: '2' } })
	const button = component.find('button')
	button.simulate('click')
})
