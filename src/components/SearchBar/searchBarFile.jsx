import { useState } from 'react'
import { useRef } from 'react';

import FilterButton from '../FilterButton/filterButtonFile'

import './searchBarStyles.css'

export default function SearchBar(props){
    const searchIconRef = useRef(null);
    
    const handleOnChangeInput = e => {
        props.setSearch(e.target.value)
    }

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
                    onChange={handleOnChangeInput}
                    onFocus={show}
                    onBlur={hide}/>
            </div>
            <FilterButton/>
        </div>
    )
}