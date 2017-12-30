import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FuzzySearch from '../search'
import { mount } from 'enzyme'
import configureStore from '../store/configure-store'
import UnitsContainer from '../components/UnitsContainer'
import testData from '../test-data'

Enzyme.configure({ adapter: new Adapter() })

it('performs a search on units', () => {
  const store = configureStore(testData)
  const fs = FuzzySearch
  fs.init(testData.qualReducer)
  const component = mount(<UnitsContainer store={store} />)
  const units = component.find('Units')
  store.dispatch(units.props().searchUnits('Unit 1'))
  expect(store.getState().qualReducer.searchResults).toEqual(['1', '10'])
})


