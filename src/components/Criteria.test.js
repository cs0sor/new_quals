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
  const component = container.find('CriteriaItem').first()
})