import { useState } from 'react'

import FilterButton from '../FilterButton/filterButtonFile'

import './searchBarStyles.css'

export default function SearchBar(props){    
    const [value, setValue] = useState('')

    const handleOnClickInput = e => {
        props.setSearch(value)
    }
    const handleOnChangeInput = e => {
        setValue(e.target.value)
    }

    const handleOnClickButton = e =>{
        props.setShowDropdowns(!props.showDropdownsState)
    }

    return (
        <div className='searchBar'>
            <div className='container'>
                <input className='searchInput'
                    placeholder='Search'
                    value={value}
                    onChange={handleOnChangeInput}/>
                <button className='searchButton'
                onClick={handleOnClickInput}>
                    🔍
                </button>
            </div>
            <FilterButton onClick={handleOnClickButton}/>
        </div>
    )
}