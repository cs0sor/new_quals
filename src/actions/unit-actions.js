import * as types from './action-types'

export const addUnitToGroup = (selected) => ({
  type: types.ADD_UNIT_TO_GROUP,
  selected
})

export const removeUnitFromGroup = (selected) => ({
  type: types.REMOVE_UNIT_FROM_GROUP,
  selected
})

export const searchUnits = (term) => ({
  type: types.SEARCH_UNITS,
  term
})

