import { useState } from 'react';
import Fuse from 'fuse.js';

function search({ fuse, data, term }) {
  const results = fuse.search(term);
  return term ? results : data;
}

function useSearch({ data = [], options }) {
  const [searchTerm, setSearchTerm] = useState('');
  const fuse = new Fuse(data, options);
  const results =
    searchTerm !== ''
      ? search({ fuse, data, term: searchTerm }).map(res => res.item)
      : data;
  const reset = () => setSearchTerm('');
  return { results, search: setSearchTerm, searchTerm, reset };
}

export default useSearch;
