import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Units from './Units'
import { getAllGroupedUnits } from '../reducers/quals-reducer'
import * as UnitActions from '../actions/unit-actions'

const Container = (props) => <Units {...props} />

const mapStateToProps = (state, ownProps) => ({
	units: state.qualReducer.units,
	groups: state.qualReducer.groups,
	unitsGrouped: getAllGroupedUnits(state.qualReducer)
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
