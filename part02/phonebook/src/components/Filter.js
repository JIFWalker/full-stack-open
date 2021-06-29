import React from 'react'

const Filter = ({searchParam, handleSearch}) => {
  return (
    <form>
      filter shown with <input 
        value = {searchParam}
        onChange = {handleSearch}
      />
    </form>
    )
}

export default Filter