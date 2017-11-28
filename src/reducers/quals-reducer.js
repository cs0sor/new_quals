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
		'1': { name: 'Unit 1' },
		'2': { name: 'Unit 2' },
		'3': { name: 'Unit 3' },
		'4': { name: 'Unit 4' },
		'5': { name: 'Unit 5' },
		'6': { name: 'Unit 6' },
		'7': { name: 'Unit 7' },
		'8': { name: 'Unit 8' },
		'9': { name: 'Unit 9' },
		'10': { name: 'Unit 10' }
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

	criteria: {
		'1': {
			qualId: '1',
			groups: [ '1' ],
			type: MANDITORY
		},
		'2': {
			qualId: '1',
			groups: [ '2', '3' ],
			type: OPTIONAL,
			criteria: CREDIT,
			minimum: 10
		},
		'3': {
			qualId: '1',
			groups: [ '4' ],
			type: OPTIONAL,
			criteria: CREDIT,
			minimum: 10
		},
		'4': {
			qualId: '2',
			groups: [ '2' ],
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
		case types.ADD_UNIT_TO_GROUP:
			const updatedGroup = {
				...state.groups[action.selected.groupId],
				units: state.groups[action.selected.groupId].units.concat(action.selected.unitId)
			}

			return { ...state, groups: { ...state.groups, [action.selected.groupId]: updatedGroup } }

		case types.REMOVE_UNIT_FROM_GROUP:
			const deletedUnitGroup = {
				...state.groups[action.selected.groupId],
				units: [
					...state.groups[action.selected.groupId].units.filter((unit) => unit !== action.selected.unitId)
				]
			}
			return { ...state, groups: { ...state.groups, [action.selected.groupId]: deletedUnitGroup } }
		case types.ADD_NEW_GROUP:
			const newGroupKey = nextObjKey(state.groups)
			const newCriteriaKey = nextObjKey(state.criteria)
			return {
				...state,
				groups: { ...state.groups, [newGroupKey]: { qualId: state.selectedQual, units: [] } },
				criteria: {
					...state.criteria,
					[newCriteriaKey]: { qualId: state.selectedQual, type: OPTIONAL, groups: [ newGroupKey ] }
				}
			}
		case types.SPLIT_FROM_CRITERIA:
			const critGroupRemoved = {
				...state.criteria[action.criteriaId],
				groups: state.criteria[action.criteriaId].groups.filter((groupId) => groupId !== action.groupId)
			}
			const newCriteria = { qualId: state.selectedQual, type: OPTIONAL, groups: [ action.groupId ] }
			const amendedCriterias = {
				...state.criteria,
				[action.criteriaId]: critGroupRemoved,
				[nextObjKey(state.criteria)]: newCriteria
			}
			return { ...state, criteria: amendedCriterias }
		default:
			return state
	}
}

// Given a teh state of selectedQualId, this iterates through groups generating a key value pair of unit:group
export const getSelectedGroupedUnits = (state) => {
	const mmap = Object.entries(state.groups)
		.filter((item) => item[1].qualId === state.selectedQual)
		.map((entry) => entry[1].units.map((unit) => [ unit, entry[0] ]))
	return [].concat.apply([], mmap).reduce((result, value) => ({ ...result, [value[0]]: value[1] }), {})
}

// Given a qual id, this iterates through groups generating a key value pair of unit:group but
// also adds those units not in groups and gives them the key:value of key:undefined
export const getAllGroupedUnits = (state) => {
	const groupedUnits = getSelectedGroupedUnits(state)
	return { ...Object.keys(state.units).reduce((result, v) => ({ ...result, [v]: undefined }), {}), ...groupedUnits }
}

// Returns the groups based on selected qualification
export const getQualificationGroups = (state) =>
	getQualGroups(state.qualReducer.selectedQual, state.qualReducer.groups).map((groupId) => ({
		...state.qualReducer.groups[groupId],
		groupId
	}))

// Returns criteria for a particular Qual
export const getCriteriaForQual = (state) =>
	Object.keys(state.criteria)
		.filter((index) => state.criteria[index].qualId === state.selectedQual)
		.reduce((result, key) => ({ ...result, [key]: state.criteria[key] }), {})
