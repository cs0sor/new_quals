import * as types from './action-types'

export const addQualification = (title) => {
  return {
    type: types.ADD_QUALIFICATION,
    title
  }
}

export const addUnitToQualification = (selected) => {
  return {
    type: types.ADD_UNIT_TO_QUALIFICATION,
    selected
  }
}
