import * as types from './action-types'

export const addQualification = (title) => ({
	type: types.ADD_QUALIFICATION,
	title
})

export const addUnitToQualification = (selected) => ({
	type: types.ADD_UNIT_TO_QUALIFICATION,
	selected
})

export const updateQualificationTitle = (value) => ({
	type: types.UPDATE_QUALIFICATION_TITLE,
	value
})