import React from 'react'
import * as bs from 'react-bootstrap/lib/'
import DropDownSubmit from './DropDownSubmit'
import DebounceInput from 'react-debounce-input';
const headerData = [ '', 'Id', 'Title', '' ]

const Header = (props) => (
  <thead>
    <tr>{props.headers.map((header, index) => <th key={index}>{header}</th>)}</tr>
  </thead>
)

const typeOfBadge = (option) =>
  option === 'MANDITORY' ? <bs.Label bsStyle="danger">M</bs.Label> : <bs.Label bsStyle="success">O</bs.Label>

const Unit = (props) => {
  return (
    <tr>
      <td style={{ width: '10px' }}>{typeOfBadge(props.criteriaGroup.type)}</td>
      <td style={{ width: '100px' }}>{props.unit}</td>
      <td style={{ width: '350px' }}>{props.units[props.unit].name}</td>
      <td style={{ width: '50px' }}>
        <bs.Button className="remove-from-group" bsSize="xsmall" onClick={() => props.removeUnitFromGroup({unitId: props.unit, groupId: props.groupId})}>Remove</bs.Button>
      </td>
    </tr>
  )
}

const Body = (props) => {
  return (
    <tbody>
      {Object.entries(props.group['units']).map((unit) => <Unit {...props} unit={unit[1]} key={unit[0]} />)}
    </tbody>
  )
}

const mergeOptions = (props) => [[-1, 'Merge into...']].concat(Object.keys(props.criteria).filter(item => item !== props.criteriaId).map(item => [item, `criteria ${item}`]))

const Group = (props) => {
  const splitOrMergeGroups =
    props.criteriaGroup.groups.length > 1 ? (
      <bs.Button className="split-from-criteria" onClick={() => props.splitFromCriteria(props.criteriaId, props.group.groupId)}>
        <span className="glyphicon glyphicon-resize-full" aria-hidden="true" /> Split from Criteria
      </bs.Button>) : 
    <DropDownSubmit options={mergeOptions(props)} context={{group: props.group.groupId, criteria: props.criteriaId}} submitAction={props.mergeGroup} placeholder="Merge into ..."/>
  return (
    <div>
      <bs.Panel header={props.titleId} bsStyle="info">
        <DebounceInput
          style={{ width: '400px' }}
          placeholder="group name..."
          className="form-control"
          minLength={2}
          debounceTimeout={100}
          value={props.group.title}
          onChange={ e => props.updateGroupTitle({value: e.target.value, groupId: props.group.groupId})} />
        <br/>
        <bs.Table striped bordered condensed hover>
          <Header headers={headerData} />
          <Body {...props} />
        </bs.Table>
        <bs.ButtonGroup bsSize="small" className='merge-groups'>
          {splitOrMergeGroups}
          <bs.Button className="delete-group" onClick={() => props.deleteGroup(props.group.groupId)}>
            <span className="glyphicon glyphicon-remove-circle" aria-hidden="true" /> Delete
          </bs.Button>
        </bs.ButtonGroup>
      </bs.Panel>
    </div>
  )
}

const QualGroups = (props) =>
  props.criteriaGroup.groups.map((group) => (
    <Group
      {...props}
      group={{...props.qualGroups[group], groupId:group}}
      groupId={group}
      titleId={`Group ${group}`}
      key={group}
    />
  ))

export default QualGroups
