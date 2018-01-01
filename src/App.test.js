import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from './store/configure-store'
import App from './App'
import { Provider } from 'react-redux'
import jestFetchMock from 'jest-fetch-mock'


Enzyme.configure({ adapter: new Adapter() })

const mockServerResponse = {

	units: {
		1: { name: 'Unit 1', credit: 2, visible: true},
		2: { name: 'Unit 2', credit: 3, visible: true},
		3: { name: 'Unit 3', credit: 1, visible: true },
		4: { name: 'Unit 4', credit: 2, visible: true },
		5: { name: 'Unit 5', credit: 2, visible: true },
		6: { name: 'Unit 6', credit: 1, visible: true },
		7: { name: 'Unit 7', credit: 1, visible: true },
		8: { name: 'Unit 8', credit: 3, visible: true },
		9: { name: 'Unit 9', credit: 2, visible: true },
		10: { name: 'Unit 10', credit: 1, visible: true },
	},

	qualification: {id: '102/11/2', title: 'A Qual'},
	groups: {
		'1': {
			qualId: '1',
			units: [ '3', '1' ]
		},
		'2': {
			qualId: '1',
			units: [ '7', '5' ]
		},
		'3': {
			qualId: '1',
			units: [ '9' ]
		},
		'4': {
			qualId: '1',
			units: [ '6', '8', '10' ]
		}
	},

	criteria: {
		'1': {
			qualId: '1',
			groups: [ '1' ],
			type: 'MANDITORY',
			criteria: null,
			minimumScore: null,
		},
		'2': {
			qualId: '1',
			groups: [ '2', '3' ],
			type: 'OPTIONAL',
			criteria: 'COMPLETE_ON_CREDITS',
			minimumScore: 0
		},
		'3': {
			qualId: '1',
			groups: [ '4' ],
			type: 'OPTIONAL',
			criteria: 'COMPLETE_ON_UNITS',
			minimumScore: 0
		},
		'4': {
			qualId: '2',
			groups: [ '2' ],
			type: 'OPTIONAL',
			criteria: 'COMPLETE_ON_CREDITS',
			minimumScore: 0
		}
	}
}

it('App doesnt crash the app', () => {

	const store = configureStore()
	global.fetch = jestFetchMock;

	fetch.mockResponse(JSON.stringify(mockServerResponse))
	renderer.create(
		<Provider store={store}>
			<App />
		</Provider>
	)
})
