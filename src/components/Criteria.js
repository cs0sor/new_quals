import React from 'react'
import * as bs from 'react-bootstrap/lib/'
import QualGroups from '../components/QualGroups'
import {COMPLETE_ON_CREDITS, COMPLETE_ON_UNITS, OPTIONAL} from '../reducers/quals-reducer'

export function creditsTotal(criteria, qualGroups, units) {
  return criteria.groups.reduce(
    (previous, item) => previous + qualGroups[item].units.reduce(
      (previous, item) => previous + parseInt(units[item].credits, 10), 0), 0)
}

export function unitsTotal(criteria, qualGroups, units) {
  return criteria.groups.reduce(
    (previous, item) => previous + qualGroups[item].units.length
  , 0)
}

const CriteriaItem = (props) => {

  const criteria = props.criteria[props.criteriaId]
  const total = criteria.criteria === COMPLETE_ON_CREDITS ? 
    creditsTotal(criteria, props.qualGroups, props.units)
    :
    unitsTotal(criteria, props.qualGroups, props.units)
  
  const completeOptions = criteria.type === OPTIONAL
    ? <div>
      <bs.FormControl
        componentClass="select"
        className="score-criteria"
        value={criteria.criteria}
        onChange={(e) => props.changeScoreCriteria({value: e.target.value, criteria: props.criteriaId})}>
        <option key={1} value={COMPLETE_ON_CREDITS}>Credits</option>
        <option key={2} value={COMPLETE_ON_UNITS}>Units Completed</option>
      </bs.FormControl>
      <bs.FormControl
        title="Minimum Score"
        className="cert-type"
        componentClass="select"
        value={criteria.minimumScore}
        onChange={(e) => props.updateMinScore({value: e.target.value, criteria: props.criteriaId})}>
        <option key={0} value={0}>0</option>
        {[...Array(total).keys()].map(item => <option key={item + 1} value={item + 1}>{item + 1}</option>)}
      </bs.FormControl>
    </div>
    : null
  

  return <bs.Panel header={props.title}>
    <QualGroups {...props}/>
    {completeOptions} 
  </bs.Panel>}


const Criteria = (props) => 
  Object.entries(props.criteria)
  .map(item => <CriteriaItem {...props} criteriaGroup={item[1]} criteriaId={item[0]} title={`Criteria ${item[0]}`} key={item[0]}/>)

export default Criteria

