import React from "react"
import InputSubmit from "./InputSubmit"
import DropDownSubmit from "./DropDownSubmit"
import QualGroups from "./QualGroups"

const CentreQualifications = props => 
    <div>
        <InputSubmit submitAction={props.addQualification}/>
        <QualGroups />
        <DropDownSubmit options={props.units} submitAction={props.addUnitToQualification} />
    </div>

export default CentreQualifications