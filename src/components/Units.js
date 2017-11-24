import React from 'react'
import * as Bootstrap from 'react-bootstrap/lib/'

const headerData = [ 'Id', 'Title', '' ]

const Units = (props) => (
	<Bootstrap.Table striped bordered condensed hover>
		<Header headers={headerData} />
		<Body {...props} />
	</Bootstrap.Table>
)

const Header = (props) => (
	<thead>
		<tr>{props.headers.map((header) => <th key={header}>{header}</th>)}</tr>
	</thead>
)

const Body = (props) => (
	<tbody>{Object.entries(props.unitsGrouped).map((unit) => <Unit {...props} unit={unit} key={unit[0]} />)}</tbody>
)

const Button = (props) =>
	props.unit[1] ? (
		<Bootstrap.Button onClick={(e) => props.removeUnitFromGroup({ groupId: props.unit[1], unitId: props.unit[0] })}>
			Remove From Group {props.unit[1]}
		</Bootstrap.Button>
	) : (
		<GroupSelectButton {...props} />
	)

const GroupSelectButton = (props) => (
	<Bootstrap.DropdownButton
		title="Add Unit"
		key={props.unit[1]}
		id="split-button-basic-Danger"
		onSelect={(groupId) => props.addUnitToGroup({ unitId: props.unit[0], groupId: groupId })}
	>
		{props.selectedQualGroups.map((group) => (
			<Bootstrap.MenuItem eventKey={group.groupId} key={group.groupId}>
				to Group {group.groupId}
			</Bootstrap.MenuItem>
		))}
	</Bootstrap.DropdownButton>
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
