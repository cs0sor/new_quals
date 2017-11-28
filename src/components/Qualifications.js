import React from 'react'
// import InputSubmit from './InputSubmit'
// import DropDownSubmit from './DropDownSubmit'
import CriiteriaContainer from '../components/CriteriaContainer'
import UnitsContainer from './UnitsContainer'
import * as Bootstrap from 'react-bootstrap/lib/'

export const AddNewGroup = (props) => (
  <Bootstrap.Button onClick={(e) => props.addNewGroup()}>Add Group</Bootstrap.Button>
)

const Qualifications = (props) => (
  <Bootstrap.Grid>
    {/* <InputSubmit submitAction={props.addQualification} /> */}
    {/* <DropDownSubmit options={props.units} submitAction={props.addUnitToQualification} /> */}
    <Bootstrap.Col md={6}>
      <UnitsContainer {...props} />
      <AddNewGroup {...props} />
    </Bootstrap.Col>
    <Bootstrap.Col md={6}>
      <CriiteriaContainer {...props}/>
    </Bootstrap.Col>
  </Bootstrap.Grid>
)

export default Qualifications
