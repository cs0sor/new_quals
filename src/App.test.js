import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from './store/configure-store'
import App from './App'
import { Provider } from 'react-redux'

Enzyme.configure({ adapter: new Adapter() })

it('App doesnt crash the app', () => {
	const store = configureStore()
	renderer.create(
		<Provider store={store}>
			<App />
		</Provider>
	)
})
