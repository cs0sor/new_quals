import FuzzySearch from 'fuzzy-search';

const fuzzySearch = {
  searcher: null,
  init(state) {
    this.searcher = new FuzzySearch(
      Object.keys(state.units).map(key => ({...state.units[key], key})),
      ['name'], {
      caseSensitive: false,
      sort: true,
    })
  }
}

export default fuzzySearch
