import React from 'react'
import InputSubmit from './InputSubmit'
import DropDownSubmit from './DropDownSubmit'
import QualGroups from './QualGroups'
import Units from './Units'

const CentreQualifications = (props) => (
	<div>
		{/* <InputSubmit submitAction={props.addQualification} /> */}
		{/* <QualGroups {...props} groups={props.selectedQualGroups} /> */}
		{/* <DropDownSubmit options={props.units} submitAction={props.addUnitToQualification} /> */}
		<Units {...props} />
	</div>
)

export default CentreQualifications
