import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Qualifications from './Qualifications'
import * as QualificationActions from '../actions/qualification-actions'
import * as GroupActions from '../actions/group-actions'
import { getQualificationGroups } from '../reducers/quals-reducer'
const Container = (props) => <Qualifications {...props} />

const mapStateToProps = (state, ownProps) => ({
  availableQuals: state.qualReducer.availableQuals,
  units: state.qualReducer.units,
  selectedQual: state.qualReducer.selectedQual,
  qualGroups: state.qualReducer.groups,
  selectedQualGroups: getQualificationGroups(state)
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...QualificationActions,
      ...GroupActions
    },
    dispatch
  )

const ChoiceListsContainer = connect(mapStateToProps, mapDispatchToProps)(Container)

export default ChoiceListsContainer
