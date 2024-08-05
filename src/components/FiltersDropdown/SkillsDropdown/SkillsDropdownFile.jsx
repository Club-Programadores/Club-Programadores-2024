import { useState } from "react";
import Select from "react-select";

export const skillsOptions = [
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "php", value: "php" },
  { label: "Java", value: "java" },
  { label: "C++", value: "c++" },
  { label: "C#", value: "c#" },
  { label: "React", value: "react" },
  { label: "MySQL", value: "mysql" },
  { label: "PostgreSQL", value: "postgresql" },
  { label: "Sparql", value: "sparql" },
];

export default function SkillsDropdown({placeholder,setSkillsFilter}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOnChange = (e) => {
    setSelectedOption(e);
    if(setSkillsFilter != null) setSkillsFilter(e);
  };

  return (
    <Select
      className="filterDropdown"
      defaultValue={selectedOption}
      onChange={handleOnChange}
      options={skillsOptions}
      isMulti={true}
      placeholder= {placeholder != null? placeholder : "Tecnologías"}
    />
  );
}
