import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'
import configureStore from '../store/configure-store'
import { AddNewGroup } from '../components/Qualifications'
import * as Actions from '../actions/group-actions'
import UnitsContainer from '../components/UnitsContainer'
import testData from '../test-data'
Enzyme.configure({ adapter: new Adapter() })

it('adds a new group', () => {
	const store = configureStore(testData)

	const addNewGroup = () => {
		store.dispatch(Actions.addNewGroup())
	}

	const component = mount(<AddNewGroup addNewGroup={addNewGroup} />)
	const button = component.find('button')
	button.simulate('click')
	expect(Object.keys(store.getState().qualReducer.groups.length === 5))
})

it('adds an initial group', () => {

	const store = configureStore({qualReducer:{...testData.qualReducer, groups:{}}})
	const addNewGroup = () => {
		store.dispatch(Actions.addNewGroup())
	}

	const component = mount(<AddNewGroup addNewGroup={addNewGroup} />)
	const button = component.find('button')
	button.simulate('click')
	expect(Object.keys(store.getState().qualReducer.groups)).toEqual(['1'])
})

it('removes a unit from a group', () => {
	const store = configureStore(testData)
	const component = mount(<UnitsContainer store={store} />)
	const button = component.find('button').at(0)
	button.simulate('click')
	expect(store.getState().qualReducer.groups[1].units === [ '3' ])
})

it('adds a unit to a group', () => {
	const store = configureStore(testData)
	const component = mount(<UnitsContainer store={store} />)
	const menuItem = component.find('DropdownMenu SafeAnchor > a').first()
	menuItem.simulate('click')
	expect(store.getState().qualReducer.groups[1].units).toEqual([ '3', '1', '2' ])
})

