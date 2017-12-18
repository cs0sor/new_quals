import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Criteria from './Criteria'
import * as GroupActions from '../actions/group-actions'
import * as CriteriaActions from '../actions/criteria-actions'
import * as UnitActions from '../actions/unit-actions'
import { getCriteriaForQual } from '../reducers/quals-reducer'

const Container = (props) => <Criteria {...props} />

const mapStateToProps = (state, ownProps) => ({
  availableQuals: state.qualReducer.availableQuals,
  units: state.qualReducer.units,
  selectedQual: state.qualReducer.selectedQual,
  qualGroups: state.qualReducer.groups,
  criteria: getCriteriaForQual(state.qualReducer),
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...CriteriaActions,
      ...GroupActions,
      ...UnitActions,
    },
    dispatch
  )

const CriteriaContainer = connect(mapStateToProps, mapDispatchToProps)(Container)

export default CriteriaContainer
