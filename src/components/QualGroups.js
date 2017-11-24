import React from 'react'

const Group = (props) => {
  console.log(props.item.units)
  return <div>
    <h1>Group {props.item.groupId}</h1>
    {props.item.units.map((unit) => props.units[unit].name)}
  </div>
}

const QualGroups = (props) => props.groups.map((item) => <Group {...props} item={item} key={item.groupId} />)

export default QualGroups
