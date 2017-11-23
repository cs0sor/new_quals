import { getSelectedGroupedUnits } from './quals-reducer'

it('groups units based on group and qual', () => {

	const state = {
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
        qualId: '2',
        units: ['1', '2', '3']
      }
    },
    selectedQual: '1',
  }
  
  const expectResult = { '1': '1', '3': '1', '5': '2', '7': '2', '9': '3' }

  expect(getSelectedGroupedUnits(state)).toEqual(expectResult)

})
