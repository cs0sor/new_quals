import * as types from './action-types'
import FuzzySearch from '../search'

const qualificationSaved = () => (
  {type: types.QUALIFICATION_SAVED}
)

export function saveQualification(payload) {
  return function(dispatch) {
    fetch('/qualification.json/put.json', {
        method: 'post',
        body: JSON.stringify(payload),
      }).then(response => response.json()
    ).then(payload => {
      dispatch(qualificationSaved())
    }).catch(err => {
      console.log(err);
    });
    return false
  }
}


const setQualification = (payload) =>
  ({
    type: types.SET_QUALIFICATION_STATE,
    payload: {
      ...payload,
      searchResults: Object.keys(payload.units),
      dataLoaded: true}
  })

function configureData(payload) {
  return {
    availableQuals: {
      [payload.qualification.id]:
        {
          id: payload.qualification.id,
          title: payload.qualification.title,
          live: payload.qualification.live,
        }
      },
    selectedQual: payload.qualification.id,
    selectedGroup: null,
    saveable: false,
    searchResults: [],
    units: payload.units,
    groups: payload.groups,
    criteria: payload.criteria,
  }
}

export function getQualification(qualId) {
  return function(dispatch) {
    fetch('/qualification.json/get.json', {
        method: 'post',
        body: JSON.stringify({qual_id: qualId}),
      }).then(response => response.json()
    ).then(payload => {
      const fs = FuzzySearch
      fs.init(payload.units)
      dispatch(setQualification({...configureData(payload), dataLoaded: true}))
    }).catch(err => {
      console.log(err);
    });
    return false
  }
}
