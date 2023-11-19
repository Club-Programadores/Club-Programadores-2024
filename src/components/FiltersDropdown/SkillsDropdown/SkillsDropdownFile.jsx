import { useState } from 'react'
import Select from 'react-select';


const options = [
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'JavaScript', value: 'javascript' },
  ];

export default function skillsDropdown(){
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOnChange = e =>{
    setSelectedOption(e)
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