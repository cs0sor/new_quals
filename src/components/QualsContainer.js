import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Qualifications from './Qualifications'
import * as QualificationActions from  '../actions/qualification-actions'

const Container = props => <Qualifications {...props} />

const mapStateToProps = (state, ownProps) => ({
   availableQuals: state.qualReducer.availableQuals,
   units: state.qualReducer.units,
   selectedQual: state.qualReducer.selectedQual,
})

const mapDispatchToProps = dispatch => 
    bindActionCreators({
        ...QualificationActions,
    }, dispatch)

const ChoiceListsContainer = connect(mapStateToProps, mapDispatchToProps)(
    Container
)

export default ChoiceListsContainer