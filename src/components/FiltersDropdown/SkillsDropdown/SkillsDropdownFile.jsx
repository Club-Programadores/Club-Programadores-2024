import { useState } from 'react'
import Select from 'react-select';


const options = [
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'php', value: 'php' },
    { label: 'Java', value: 'java' },
    { label: 'C++', value: 'c++' },
    { label: 'C#', value: 'c#' },
    { label: 'React', value: 'react' },
    { label: 'MySQL', value: 'mysql' },
    { label: 'PostgreSQL', value: 'postgresql' },
    { label: 'Sparql', value: 'sparql' },
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