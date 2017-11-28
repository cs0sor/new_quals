import React from 'react'
import * as bs from 'react-bootstrap/lib/'
import QualGroups from '../components/QualGroups'
const CriteriaItem = (props) => {
  return <bs.Panel header={props.title}>
    <QualGroups {...props} />
    <br/>
    <bs.DropdownButton title="Minimum Score" id="bg-nested-dropdown">
      <bs.MenuItem eventKey="1">1</bs.MenuItem>
      <bs.MenuItem eventKey="2">2</bs.MenuItem>
    </bs.DropdownButton>
    <bs.DropdownButton title="Of Type" id="bg-nested-dropdown">
      <bs.MenuItem eventKey="1">Credits</bs.MenuItem>
      <bs.MenuItem eventKey="2">Units Completed</bs.MenuItem>
    </bs.DropdownButton>   
  </bs.Panel>}


const Criteria = (props) => 
  Object.entries(props.criteria)
  .map(item => <CriteriaItem {...props} criteriaGroup={item[1]} criteriaId={item[0]} title={`Criteria ${item[0]}`} key={item[0]}/>)

export default Criteria

