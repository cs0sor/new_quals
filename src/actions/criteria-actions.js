import * as types from './action-types'

export const splitFromCriteria = (criteriaId, groupId) => ({
  type: types.SPLIT_FROM_CRITERIA,
  criteriaId: criteriaId,
  groupId: groupId
})

export const mergeGroup = (payload) => ({
    type: types.MERGE_GROUP,
    payload: payload
})

export const updateMinScore = (payload) => ({
    type: types.UPDATE_MIN_SCORE,
    payload: payload
})

export const changeScoreCriteria = (payload) => ({
    type: types.CHANGE_SCORE_CRITERIA,
    payload: payload
})