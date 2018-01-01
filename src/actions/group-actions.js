import * as types from './action-types'

export const addNewGroup = () => ({
  type: types.ADD_NEW_GROUP
})

export const deleteGroup = (groupId) => ({
  type: types.DELETE_GROUP,
  groupId: groupId,
})

export const updateGroupTitle = (payload) => ({
  type: types.UPDATE_GROUP_TITLE,
  value: payload.value,
  groupId: payload.groupId
})