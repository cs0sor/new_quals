import FuzzySearch from 'fuzzy-search';

const fuzzySearch = {
  searcher: null,
  init(units) {
    this.searcher = new FuzzySearch(
      Object.keys(units).map(key => ({...units[key], key})),
      ['name'], {
      caseSensitive: false,
      sort: true,
    })
  }
}

export default fuzzySearch
