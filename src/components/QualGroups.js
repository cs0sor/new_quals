import React from 'react'

const Group = (props) => (
  <div>
    <h1>Group {props.item.groupId}</h1>
    {props.item.units.map((unit) => props.units[unit])}
  </div>
)

const QualGroups = (props) => props.groups.map((item) => <Group {...props} item={item} key={item.groupId} />)

export default QualGroups
