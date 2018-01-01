import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'
import configureStore from '../store/configure-store'
import CriteriaContainer from '../components/CriteriaContainer'
import { creditsTotal, unitsTotal } from '../components/Criteria'
import testData from '../test-data'

Enzyme.configure({ adapter: new Adapter() })

const data = {
  units: {
    '1': { name: 'Unit 1', credit: 2 },
    '2': { name: 'Unit 2', credit: 3 },
    '3': { name: 'Unit 3', credit: 1 },
    '4': { name: 'Unit 4', credit: 2 },
  },
  criteria: {
    qualId: '1',
    groups: [ '1', '2' ],
    type: 'OPTIONAL',
    criteria: 'COMPLETE_ON_CREDITS',
    minimumScore: 0  
  },
  groups: {
    '1': {
      qualId: '1',
      units: [ '1', '2' ]
    },
    '2': {
      qualId: '1',
      units: [ '3', '4' ]
    },
  },
}

it('renders the container without crashing', () => {
  const store = configureStore(testData)
  const container = mount(<CriteriaContainer store={store}/>)
  container.find('CriteriaItem').first()
})

it('merges a group into another criteria', () => {
  const store = configureStore(testData)
  const container = mount(<CriteriaContainer store={store}/>)
  const component = container.find('FormControl > select').first()
  component.simulate('change', { target: { value: '3' } })
  const button = container.find('#dropdown-submit').first()
  button.simulate('click')
  expect(Object.keys(store.getState().qualReducer.criteria).length).toEqual(3)
})

it('removes a group from a criteria', () => {
	const store = configureStore(testData)
  const component = mount(<CriteriaContainer store={store} />)
  const deleteGroup = component.find('QualGroups > Group > div > ButtonGroup > div > Button').first()
  deleteGroup.simulate('click')
  expect(Object.keys(store.getState().qualReducer.groups).length).toEqual(3)
	expect(Object.keys(store.getState().qualReducer.criteria).length).toEqual(3)
})

it('splits a group into new criteria', () => {
  const store = configureStore(testData)
  const component = mount(<CriteriaContainer store={store} />)
  const deleteGroup = component.find('.split-from-criteria').first()
  deleteGroup.simulate('click')
  expect(Object.keys(store.getState().qualReducer.criteria).length).toEqual(5)
})

it('removes a unit from a group in criteria panel', () => {
  const store = configureStore(testData)
  const component = mount(<CriteriaContainer store={store} />)
  const deleteGroup = component.find('.remove-from-group').first()
  deleteGroup.simulate('click')
})

it ('changes criteria score type', () => {
  const store = configureStore(testData)
  const component = mount(<CriteriaContainer store={store} />)
  const deleteGroup = component.find('.remove-from-group').first()
  deleteGroup.simulate('click')
})

it('Calculates total credits for a criteria group', () => {
  expect(creditsTotal(data.criteria, data.groups, data.units)).toEqual(8) 
})

it('Calculates units for a criteria group', () => {
  expect(unitsTotal(data.criteria, data.groups, data.units)).toEqual(4) 
})

it('selects credits on score criteria', () => {
  const store = configureStore(testData)
  const component = mount(<CriteriaContainer store={store} />)
  component.find('.score-criteria').first().simulate('change', { target: { value: 'COMPLETE_ON_CREDITS' } })
})

it('selects units on score criteria', () => {
  const store = configureStore(testData)
  const component = mount(<CriteriaContainer store={store} />)
  component.find('.score-criteria').first().simulate('change', { target: { value: 'COMPLETE_ON_UNITS' } })
})

it('updates score criteria', () => {
  const store = configureStore(testData)
  const component = mount(<CriteriaContainer store={store} />)
  component.find('.cert-type').first().simulate('change', { target: { value: '2' } })
})