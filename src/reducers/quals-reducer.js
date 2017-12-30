import * as types from '../actions/action-types'
import warning from 'warning'
import FuzzySearch from '../search'
export const MANDITORY = 'MANDITORY'
export const OPTIONAL = 'OPTIONAL'

export const COMPLETE_ON_CREDITS = 'COMPLETE_ON_CREDITS'
export const COMPLETE_ON_UNITS = 'COMPLETE_ON_UNITS'

// Given an Objects whose 'keys' are integers return a unique key
const nextObjKey = (obj) => Object.keys(obj).length > 0 ? parseInt(Object.keys(obj).sort().reverse()[0], 10) + 1 : 1

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
  },
  dataLoaded: false,
  selectedQual: null,
  selectedGroup: null,
  searchResults: [],
  units: {},
  groups: {},
  criteria: {}
}

export default (state = initialData, action) => {
  switch (action.type) {
    case types.SET_QUALIFICATION_STATE:
      return action.payload
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

    case types.SEARCH_UNITS:
      const fs = FuzzySearch
      fs.searcher.search(action.term)
      const searchResults = fs.searcher.search(action.term).map(item => item.key)
      return {...state, searchResults}

    case types.MERGE_GROUP:
      const groupKey = action.payload.context.group
      const currentCriteriaKey = action.payload.context.criteria
      const mergeCritieraKey = action.payload.selected
      const mergedCriteria = {
        ...state.criteria[mergeCritieraKey],
        groups: state.criteria[mergeCritieraKey].groups.concat(groupKey)
      }
      const criteria = {
        ...Object.keys(state.criteria)
          .filter((item) => item !== currentCriteriaKey)
          .reduce((result, item) => ({ ...result, [item]: state.criteria[item] }), {}),
        [mergeCritieraKey]: mergedCriteria
      }
      return { ...state, criteria }

    case types.CHANGE_SCORE_CRITERIA:
      return {
        ...state,
        criteria: {...state.criteria, [action.payload.criteria]: {...state.criteria[action.payload.criteria],
          criteria: action.payload.value,
          minimumScore: 0}
      }}

    case types.UPDATE_MIN_SCORE:
      return {
        ...state,
        criteria: {
          ...state.criteria,
          [action.payload.criteria]: {...state.criteria[action.payload.criteria],
            minimumScore: parseInt(action.payload.value, 10)}}
        }

    case types.DELETE_GROUP:
      const delGroupCrit = Object.keys(state.criteria).reduce(
        (previous, item) => ({
          ...previous,
          [item]: {
            ...state.criteria[item],
            groups: state.criteria[item].groups.filter((item) => item !== action.groupId)
          }
        }),
        {}
      )

      const delGroupCritRemoveEmpty = Object.keys(delGroupCrit).reduce(
        (previous, item) =>
          delGroupCrit[item].groups.length > 0 ? {...previous, [item]:delGroupCrit[item]}:{...previous}, {})
      const delGroup = Object.keys(state.groups).reduce(
        (previous, item) =>
          item !== action.groupId ? { ...previous, [item]: { ...state.groups[item] } } : { ...previous },
        {}
      )
      return { ...state, criteria: delGroupCritRemoveEmpty, groups: delGroup }
    default:
      return state
  }
}

// Given a the state of selectedQualId, this iterates through groups generating a key value pair of unit:group
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

export const filterAllGroupedUnits = (state) => {
  const allGroupedUnits = getAllGroupedUnits(state)
  return state.searchResults.reduce((previous, unit) => ({...previous, [unit]: allGroupedUnits[unit]}), {})
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
