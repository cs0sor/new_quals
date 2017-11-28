import * as types from './action-types'

export const splitFromCriteria = (criteriaId, groupId) => ({
  type: types.SPLIT_FROM_CRITERIA,
  criteriaId: criteriaId,
  groupId: groupId
})