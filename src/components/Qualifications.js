import React from 'react'
// import InputSubmit from './InputSubmit'
// import DropDownSubmit from './DropDownSubmit'
import CriteriaContainer from '../components/CriteriaContainer'
import UnitsContainer from './UnitsContainer'
import * as Bootstrap from 'react-bootstrap/lib/'

export const AddNewGroup = (props) =>
  <Bootstrap.Button bsStyle="success" onClick={(e) => props.addNewGroup()}>Add Group</Bootstrap.Button>


export const SaveQualification = (props) =>
  <Bootstrap.Button bsStyle="danger" disabled={!props.savable} onClick={(e) => props.saveQualification(props.savableData)}>Save Qualification</Bootstrap.Button>

export default class Qualifications extends React.Component {
  componentWillMount () {
    this.props.getQualification(window.qualId)
  }

  render () {
    return this.props.dataLoaded
      ?
      <Bootstrap.Grid style={{'width': 'auto'}}>
      <Bootstrap.Col md={6}>
        <UnitsContainer {...this.props} />
        <AddNewGroup {...this.props} />{' '}<SaveQualification {...this.props} />
      </Bootstrap.Col>
      <Bootstrap.Col md={6}>
        <CriteriaContainer {...this.props}/>
      </Bootstrap.Col>
    </Bootstrap.Grid>
    :
    null
}
}

