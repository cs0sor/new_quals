import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Units from './Units'
import { filterAllGroupedUnits } from '../reducers/quals-reducer'
import * as UnitActions from '../actions/unit-actions'
import { getQualificationGroups } from '../reducers/quals-reducer'

const Container = (props) => <Units {...props} />

const mapStateToProps = (state, ownProps) => ({
  units: state.qualReducer.units,
  groups: state.qualReducer.groups,
  unitsGrouped: filterAllGroupedUnits(state.qualReducer),
  selectedQualGroups: getQualificationGroups(state)
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...UnitActions
    },
    dispatch
  )

const UnitsContainer = connect(mapStateToProps, mapDispatchToProps)(Container)

export default UnitsContainer
