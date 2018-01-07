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

export const setCriteriaType = (payload) => ({
    type: types.SET_CRITERIA_TYPE,
    criteria: payload.criteria,
    criteriaType: payload.type
})

export const updateCriteriaText = (payload) => ({
    type: types.UPDATE_CRITERIA_TEXT,
    text: payload.text,
    criteriaId: payload.criteriaId
})

export const criteriaLive = () => ({
    type: types.CRITERIA_LIVE,
})