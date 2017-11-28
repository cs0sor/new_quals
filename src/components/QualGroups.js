import React from 'react'
import * as bs from 'react-bootstrap/lib/'

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
        <bs.Button bsSize="xsmall">Remove</bs.Button>
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

const Group = (props) => {
  console.log(props)
  const splitOrMergeGroups =
    props.criteriaGroup.groups.length > 1 ? (
      <bs.Button onClick={() => props.splitFromCriteria(props.criteriaId, props.group.groupId)}>
        <span className="glyphicon glyphicon-resize-full" aria-hidden="true" /> Split from Criteria
      </bs.Button>
    ) : (
      <bs.Button>
        <span className="glyphicon glyphicon-resize-full" aria-hidden="true" /> Merge into Criteria
      </bs.Button>
    )
  return (
    <div>
      <h5>{props.title}</h5>
      <bs.Table striped bordered condensed hover>
        <Header headers={headerData} />
        <Body {...props} />
      </bs.Table>
      <bs.ButtonGroup bsSize="small">
        {splitOrMergeGroups}
        <bs.Button>
          <span className="glyphicon glyphicon-remove-circle" aria-hidden="true" /> Delete
        </bs.Button>
      </bs.ButtonGroup>
    </div>
  )
}

const QualGroups = (props) =>
  props.criteriaGroup.groups.map((group) => (
    <Group
      {...props}
      group={{...props.qualGroups[group], groupId:group}}
      groupId={group}
      title={`Group ${group}`}
      key={props.qualGroups[group].groupId}
    />
  ))

export default QualGroups
