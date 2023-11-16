import { useRef } from 'react';

import FilterButton from '../FilterButton/filterButtonFile'

import './searchBarStyles.css'

export default function SearchBar(props){
    const searchIconRef = useRef(null);
    
    const handleOnChangeInput = e => {
        console.log("hola")
        props.setSearch(e.target.value)
    }

    return (
        <div className='searchBar'>
            <div className='container'>
                <input className='searchInput'
                    placeholder='Search'
                    // onChange={handleOnChangeInput}
                    />
                <button className='searchButton'
                onClick={handleOnChangeInput}>
                    🔍
                </button>
            </div>
            <FilterButton/>
        </div>
    )
}