import * as types from '../actions/action-types'
import warning from 'warning'

const MANDITORY = 'MANDITORY'
const OPTIONAL = 'OPTIONAL'
const CREDIT = 'CREDIT'

// Given an Objects whose 'keys' are integers return a unique key
const nextObjKey = (obj) => parseInt(Object.keys(obj).sort().reverse()[0], 10) + 1

// Given a Qualification id, return groups that belong to the Qualification
const getQualGroups = (qualId, allGroups) =>
	Object.entries(allGroups).filter((item) => item[1].qualId === qualId).map((item) => item[0])

export const addUnitToGroup = (unit, selectedGroup, selectedQual, allGroups) => {
	const groupKeys = getQualGroups(selectedQual, allGroups)
	// check to see if selected group is in the selected qual group
	// if so return all groups and update selected group with new unit
	return groupKeys.find((item) => item === selectedGroup)
		? {
				...allGroups,
				[selectedGroup]: {
					...allGroups[selectedGroup],
					// make a set of units so any duplications will not be registered
					units: Array.from(new Set(allGroups[selectedGroup].units.concat(unit)))
				}
			}
		: // if the selected group is not in the qual group warn and return original group
			(warning(
				true,
				`Could not find group with key ${selectedGroup} in
         qualification with key ${selectedQual}, ignoring...`
			),
			allGroups)
}

export var initialData = {
	availableQuals: {
		'1': 'A Qual',
		'2': 'Another Qual'
	},
	selectedQual: '1',
	selectedGroup: '10',
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
		'10': 'Unit 10'
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
			qualId: '1',
			units: [ '6', '8', '10' ]
		}
	},

	completionCriteria: {
		'1': {
			qualId: '1',
			criteria: [ '1', '2' ]
		}
	},

	criteria: {
		'1': {
			groups: [ '1' ],
			type: MANDITORY
		},
		'2': {
			groups: [ '2', '3' ],
			type: OPTIONAL,
			criteria: CREDIT,
			minimum: 10
		},
		'3': {
			groups: [ '4' ],
			type: OPTIONAL,
			criteria: CREDIT,
			minimum: 10
		}
	}
}

export default (state = initialData, action) => {
	switch (action.type) {
		case types.ADD_QUALIFICATION:
			let nextID = nextObjKey(state.availableQuals)
			return {
				...state,
				availableQuals: {
					...state.availableQuals,
					[nextID]: action.title
				},
				selectedQual: nextID
			}
		case types.ADD_UNIT_TO_QUALIFICATION:
			const newGroups = addUnitToGroup(action.selected, state.selectedGroup, state.selectedQual, state.groups)
			return {
				...state,
				groups: newGroups
			}
		default:
			return state
	}
}

export const getGroupedUnits = (state, qualId) => {
	const mmap = Object.entries(state.groups)
		.filter((item) => item[1].qualId === qualId)
    .map((entry) => entry[1].units.map((unit) => [ unit, entry[0] ]))

	return [].concat.apply([], mmap).reduce((result, value) => ({ ...result, [value[0]]: value[1] }), {})
}

export const getQualificationGroups = (state) =>
	getQualGroups(state.qualReducer.selectedQual, state.qualReducer.groups).map((groupId) => ({
		...state.qualReducer.groups[groupId],
		groupId
	}))
