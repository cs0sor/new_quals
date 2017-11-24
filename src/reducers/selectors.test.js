import { getSelectedGroupedUnits, getAllGroupedUnits } from './quals-reducer'

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
				units: [ '1', '2', '3' ]
			}
		},
		selectedQual: '1'
	}

	const expectResult = { '1': '1', '3': '1', '5': '2', '7': '2', '9': '3' }

	expect(getSelectedGroupedUnits(state)).toEqual(expectResult)
})

it('groups units based on qual and also includes those units not in groups', () => {
	const state = {
    units: {
      '1': 'Unit 1',
      '2': 'Unit 2',
      '3': 'Unit 3',
      '4': 'Unit 4',
      '5': 'Unit 5',
      '6': 'Unit 6',
      '7': 'Unit 7',
      '8': 'Unit 8',
      '9': 'Unit 9',
      '10': 'Unit 10',
      '11': 'Unit 11',
    },

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
				units: [ '1', '2', '3' ]
			}
		},
		selectedQual: '1'
	}

	const expectResult = {
    '1': '1',
    '2': undefined,
    '3': '1',
    '4': undefined,
    '5': '2',
    '6': undefined,
    '7': '2',
    '8': undefined,
    '9': '3',
    '10': undefined }

	expect(getAllGroupedUnits(state)).toEqual(expectResult)
})
