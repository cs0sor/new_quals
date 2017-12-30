const initialData = {
  qualReducer: {
    availableQuals: {
      '1': 'A Qual',
      '2': 'Another Qual'
    },
    selectedQual: '1',
    selectedGroup: '10',
    searchResults: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    units: {
      '1': { name: 'Unit 1', credits: 2, visible: true},
      '2': { name: 'Unit 2', credits: 3, visible: true},
      '3': { name: 'Unit 3', credits: 1, visible: true },
      '4': { name: 'Unit 4', credits: 2, visible: true },
      '5': { name: 'Unit 5', credits: 2, visible: true },
      '6': { name: 'Unit 6', credits: 1, visible: true },
      '7': { name: 'Unit 7', credits: 1, visible: true },
      '8': { name: 'Unit 8', credits: 3, visible: true },
      '9': { name: 'Unit 9', credits: 2, visible: true },
      '10': { name: 'Unit 10', credits: 1, visible: true },
    },

    groups: {
      '1': {
        qualId: '1',
        units: [ '3', '1' ]
      },
      '2': {
        qualId: '1',
        units: [ '7', '5' ]
      },
      '3': {
        qualId: '1',
        units: [ '9' ]
      },
      '4': {
        qualId: '1',
        units: [ '6', '8', '10' ]
      }
    },

    criteria: {
      '1': {
        qualId: '1',
        groups: [ '1' ],
        type: 'MANDITORY',
        criteria: null,
        minimumScore: null,
      },
      '2': {
        qualId: '1',
        groups: [ '2', '3' ],
        type: 'OPTIONAL',
        criteria: 'COMPLETE_ON_CREDITS',
        minimumScore: 0
      },
      '3': {
        qualId: '1',
        groups: [ '4' ],
        type: 'OPTIONAL',
        criteria: 'COMPLETE_ON_UNITS',
        minimumScore: 0
      },
      '4': {
        qualId: '2',
        groups: [ '2' ],
        type: 'OPTIONAL',
        criteria: 'COMPLETE_ON_CREDITS',
        minimumScore: 0
      }
    }
  }
}

export default initialData