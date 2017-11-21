import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'
import configureStore from '../store/configure-store'
import InputSubmit from '../components/InputSubmit'

import { addQualification } from '../actions/qualification-actions'

Enzyme.configure({ adapter: new Adapter() })

it('renders the input and submit component', () => {
	const component = renderer.create(<InputSubmit />)
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
})

it('checks to see if text is rendered by input', () => {
	const component = mount(<InputSubmit id="input-contol" />)

	const input = component.find('input')

	input.simulate('change', { target: { value: 'A New Qualification' } })
	expect(component.state().title).toEqual('A New Qualification')
})

it('check action button submit', () => {
	const store = configureStore()

	const addQuestion = (e) => {
		store.dispatch(addQualification(e))
	}

	const component = mount(<InputSubmit id="input-contol" store={store} submitAction={addQuestion} />)

	const input = component.find('input')
	input.simulate('change', { target: { value: 'A New Qualification' } })

	const button = component.find('button')
	button.simulate('click')

	expect(store.getState().qualReducer.availableQuals[3] === 'A New Qualification')
})
