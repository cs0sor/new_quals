import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'
import configureStore from '../store/configure-store'
import CriteriaContainer from '../components/CriteriaContainer'

Enzyme.configure({ adapter: new Adapter() })


it('renders the container without crashing', () => {
  const store = configureStore()
  const container = mount(<CriteriaContainer store={store}/>)
  container.find('CriteriaItem').first()
})

it('merges a group into another criteria', () => {
  const store = configureStore()
  const container = mount(<CriteriaContainer store={store}/>)
  const component = container.find('FormControl > select').first()
  component.simulate('change', { target: { value: '3' } })
  const button = container.find('#dropdown-submit').first()
  button.simulate('click')
  expect(Object.keys(store.getState().qualReducer.criteria).length).toEqual(3)
})

it('removes a group from a criteria', () => {
	const store = configureStore()
  const component = mount(<CriteriaContainer store={store} />)
  const deleteGroup = component.find('QualGroups > Group > div > ButtonGroup > div > Button').first()
  deleteGroup.simulate('click')
  expect(Object.keys(store.getState().qualReducer.groups).length).toEqual(3)
	expect(Object.keys(store.getState().qualReducer.criteria).length).toEqual(3)
})

it('splits a group into new criteria', () => {
  const store = configureStore()
  const component = mount(<CriteriaContainer store={store} />)
  const deleteGroup = component.find('.split-from-criteria').first()
  deleteGroup.simulate('click')
  expect(Object.keys(store.getState().qualReducer.criteria).length).toEqual(5)
})


it('removes a unit from a group in criteria panel', () => {
  const store = configureStore()
  const component = mount(<CriteriaContainer store={store} />)
  const deleteGroup = component.find('.remove-from-group').first()
  deleteGroup.simulate('click')
})