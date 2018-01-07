import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Qualifications from './Qualifications'
import * as QualificationActions from '../actions/qualification-actions'
import * as GroupActions from '../actions/group-actions'
import * as UnitActions from '../actions/unit-actions'
import * as ServerActions from '../actions/server-side-actions'
import { getQualificationGroups } from '../reducers/quals-reducer'
const Container = (props) => <Qualifications {...props} />

const mapStateToProps = (state, ownProps) => ({
  availableQuals: state.qualReducer.availableQuals,
  units: state.qualReducer.units,
  selectedQual: state.qualReducer.selectedQual,
  qualGroups: state.qualReducer.groups,
  selectedQualGroups: getQualificationGroups(state),
  savable: state.qualReducer.savable,
  dataLoaded: state.qualReducer.dataLoaded,
  savableData: {
    groups: state.qualReducer.groups,
    criteria: state.qualReducer.criteria,
    selectedQual: state.qualReducer.selectedQual,
    live: state.qualReducer.selectedQual
      ? 
      state.qualReducer.availableQuals[state.qualReducer.selectedQual].live
      :
      false,
  }
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...QualificationActions,
      ...GroupActions,
      ...UnitActions,
      ...ServerActions,
    },
    dispatch
  )

const ChoiceListsContainer = connect(mapStateToProps, mapDispatchToProps)(Container)

export default ChoiceListsContainer
