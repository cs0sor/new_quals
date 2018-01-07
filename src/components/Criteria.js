import React from 'react'
import * as bs from 'react-bootstrap/lib/'
import QualGroups from '../components/QualGroups'
import {COMPLETE_ON_CREDITS, COMPLETE_ON_UNITS, OPTIONAL, MANDITORY} from '../reducers/quals-reducer'

export function creditsTotal(criteria, qualGroups, units) {
  return criteria.groups.reduce(
    (previous, item) => previous + qualGroups[item].units.reduce(
      (previous, item) => previous + parseInt(units[item].credit, 10), 0), 0)
}

export function unitsTotal(criteria, qualGroups, units) {
  return criteria.groups.reduce(
    (previous, item) => previous + qualGroups[item].units.length
  , 0)
}

class CriteriaDescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.criteriaGroup.text,
      criteriaId: this.props.criteriaId,
      savable: false,
    }
    this.handleUpdatedText = this.handleUpdatedText.bind(this)
    this.updateText = this.updateText.bind(this)
  }

  updateText(value) {
    this.setState({
      text: value,
      savable: true,
    })
  }

  handleUpdatedText() {
    this.props.updateCriteriaText(
      this.state,
    )
  }

  render() {
    return (
      <div>
        <h5>Criteria Description:</h5>
        <bs.FormControl
          componentClass="textarea"
          value={this.state.text}
          onChange={e => this.updateText(e.target.value)}
          placeholder="Criteria description..." />
        <br/>
        <bs.Button bsStyle="success" disabled={!this.state.savable} onClick={e => this.handleUpdatedText()}>Update Text</bs.Button>
      </div>
    )
  }
}

const CriteriaItem = (props) => {

  const criteria = props.criteria[props.criteriaId]
  const total = criteria.criteria === COMPLETE_ON_CREDITS ? 
    creditsTotal(criteria, props.qualGroups, props.units)
    :
    unitsTotal(criteria, props.qualGroups, props.units)

  const completeOptions = criteria.type === OPTIONAL
    ? <div>
      <h5>Completion Criteria:</h5>
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
    : <h5>Candidates need to complete all Units</h5>
  

  return <bs.Panel header={props.title} bsStyle="primary">

    <bs.FormGroup>
    <br/>
      <bs.Radio
        name={`options-manditory-${props.criteriaId}`}
        checked={criteria.type === 'MANDITORY'}
        onChange={ e => props.setCriteriaType({criteria: props.criteriaId, type:MANDITORY})}
        inline>
        Manditory
      </bs.Radio >
      {' '}
      <bs.Radio
        name={`options-optional-${props.criteriaId}`}
        checked={criteria.type === 'OPTIONAL'}
        onChange={ e => props.setCriteriaType({criteria: props.criteriaId, type:OPTIONAL})}
        inline>
        Optional
      </bs.Radio>
      </bs.FormGroup>
      <CriteriaDescription {...props}/>
      <br/>
    {completeOptions}
    <br/>
    <QualGroups {...props}/>
  </bs.Panel>}

const CriteriaItems = (props) => 
  Object.entries(props.criteria)
  .map(item => <CriteriaItem {...props} criteriaGroup={item[1]} criteriaId={item[0]} title={`Criteria ${item[0]}`} key={item[0]}/>)


const Criteria = (props) => {
  return (
  <div> 
  <bs.FormGroup>
		<bs.Checkbox onChange={ e => props.criteriaLive()} checked={props.availableQuals[props.selectedQual].live}>Is Live?</bs.Checkbox>
	</bs.FormGroup>
  <CriteriaItems {...props} />
  </div>)}


export default Criteria

