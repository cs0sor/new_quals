import React from 'react'
import InputSubmit from './InputSubmit'
import DropDownSubmit from './DropDownSubmit'
import QualGroups from './QualGroups'
import UnitsContainer from './UnitsContainer'
import * as Bootstrap from 'react-bootstrap/lib/'

const Qualifications = (props) => (
	<Bootstrap.Grid>
		{/* <InputSubmit submitAction={props.addQualification} /> */}
		{/* <DropDownSubmit options={props.units} submitAction={props.addUnitToQualification} /> */}
		<Bootstrap.Col md={6}>
			<UnitsContainer {...props} />
			<Bootstrap.Button
				onClick={ e => props.addNewGroup() }>
				Add Group
			</Bootstrap.Button>
		</Bootstrap.Col>
		<Bootstrap.Col md={6}>
			<QualGroups {...props} groups={props.selectedQualGroups} />
		</Bootstrap.Col>
	</Bootstrap.Grid>
)

export default Qualifications
