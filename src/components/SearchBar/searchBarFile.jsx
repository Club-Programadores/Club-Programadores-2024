import { useState } from 'react'

import FilterButton from '../FilterButton/filterButtonFile'

import './searchBarStyles.css'

export default function SearchBar(props){    
    const [value, setValue] = useState('')
    const [showDropdowns, setShowDropdowns] = useState(false)

    const handleOnClickInput = e => {
        console.log(1);
        props.setSearch(value);
    }
    const handleOnChangeInput = e => {
        setValue(value);
        setValue(e.target.value);
    }

    const handleOnClickButton = e =>{
        props.setShowDropdowns(!props.showDropdownsState);
        setShowDropdowns(!showDropdowns)
    }

    return (
        <div className={ showDropdowns? 'searchBarWithDropdown' : 'searchBar'}>
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