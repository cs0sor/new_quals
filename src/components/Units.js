import React from 'react'
import * as bs from 'react-bootstrap/lib/'
import DebounceInput from 'react-debounce-input';
const headerData = [ 'Id', 'Title', '' ]

const Units = (props) => (
  <div>
  <DebounceInput
    style={{ width: 400 }}
    minLength={2}
    debounceTimeout={200}
    onChange={ event => props.searchUnits(event.target.value)} />

  <bs.Table striped bordered condensed hover>
    <Header headers={headerData} />
    <Body {...props} />
  </bs.Table>
  </div>
)

const Header = (props) => (
  <thead>
    <tr>{props.headers.map((header) => <th key={header}>{header}</th>)}</tr>
  </thead>
)

const Body = (props) => {
  return <tbody>{Object.entries(props.unitsGrouped).map((unit) => <Unit {...props} unit={unit} key={unit[0]} />)}</tbody>
}

const Button = (props) =>
  props.unit[1] ? (
    <bs.Button id={`remove-group-${props.unit[0]}`} onClick={(e) => props.removeUnitFromGroup({ groupId: props.unit[1], unitId: props.unit[0] })}>
      Remove From Group {props.unit[1]}
    </bs.Button>
  ) : (
    <GroupSelectButton {...props} />
  )

const GroupSelectButton = (props) => (
  <bs.DropdownButton
    title="Add Unit"
    key={props.unit[1]}
    id={`split-button-basic-Danger-${props.unit[0]}`}
    onSelect={(groupId) => props.addUnitToGroup({ unitId: props.unit[0], groupId: groupId })}
  >
    {props.selectedQualGroups.map((group) => (
      <bs.MenuItem id={`add-group-menu-item-${props.unit[0]}-${group.groupId}`} eventKey={group.groupId} key={group.groupId}>
        to Group {group.groupId}
      </bs.MenuItem>
    ))}
  </bs.DropdownButton>
)

const Unit = (props) => (
  <tr>
    <td style={{ width: '100px' }}>{props.unit[0]}</td>
    <td style={{ width: '350px' }}>{props.units[props.unit[0]].name}</td>
    <td style={{ width: '50px' }}>
      <Button {...props} unit={props.unit} />
    </td>
  </tr>
)

export default Units
