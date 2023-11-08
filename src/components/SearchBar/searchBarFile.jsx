import { useState } from 'react'
import { useRef } from 'react';

import FilterButton from '../FilterButton/filterButtonFile'

import './searchBarStyles.css'

export default function SearchBar(){
    const [name, setName] = useState('')
    const searchIconRef = useRef(null);

    const show = e =>{
        if(searchIconRef.current.className != 'devicon-safari-line searchIcon  hidden')
        {
            searchIconRef.current.className += ' hidden'
        }
    }
    const hide = e =>{
        if(e.target.value == ''){
            searchIconRef.current.className = 'devicon-safari-line searchIcon';
        }
    }

    return (
        <div className='searchBar'>
            <div className='container'>
                <i className='devicon-safari-line searchIcon' ref={searchIconRef}></i>
                <input className='searchInput'
                    value={name}
                    onChange={ e => setName(e.target.value)}
                    onFocus={show}
                    onBlur={hide}/>
            </div>
            <FilterButton/>
        </div>
    )
}