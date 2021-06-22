import React from 'react'

const Search = ({searchParam, handleSearch}) => {
  return (
    <form>
    find countries <input
      value = {searchParam}
      onChange = {handleSearch}
    />
  </form>
  )
}

export default Search