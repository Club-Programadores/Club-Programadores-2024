import { useState } from 'react'
import Select from 'react-select';


const options = [
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'C++', value: 'c++' },
    { label: 'SPARQL', value: 'sparql' },
  ];

export default function skillsDropdown(props){
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOnChange = e =>{
    setSelectedOption(e);
    props.setSkillsFilter(e);
 }

  return(
    <Select
        defaultValue={selectedOption}
        onChange={handleOnChange}
        options={options}
        isMulti={true}
        placeholder="Skills"
        />
  )
}