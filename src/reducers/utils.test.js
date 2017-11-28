import { addUnitToGroup } from './quals-reducer'

it('tests you can add a unit to a group', () => {
  const groups = {
    '1': {
      qualId: '1',
      units: [ '3', '1' ]
    },
    '2': {
      qualId: '2',
      units: [ '7', '5' ]
    }
  }

  const unit = '9'
  const selectedGroup = '1'
  const selectedQual = '1'
  const erroneousQual = '2'

  expect(
    addUnitToGroup(unit, selectedGroup, selectedQual, groups)[selectedGroup].units.find((item) => item === '9')
  ).toBeTruthy()

  expect(
    addUnitToGroup(unit, selectedGroup, erroneousQual, groups)[selectedGroup].units.find((item) => item === '9')
  ).toBeFalsy()
})
