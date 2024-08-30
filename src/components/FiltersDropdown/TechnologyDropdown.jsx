import { useState } from "react";
import Select from "react-select";

export const technologyOptions = [
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
  { label: "Git", value: "git" },
  { label: "Tailwind", value: "tailwind" },
];

export default function TechnologyDropdown({
  selectionChangedCallback,
  placeholder,
  setTechnologyFilter,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOnChange = (e) => {
    setSelectedOption(e);
    if (setTechnologyFilter != null) setTechnologyFilter(e);
    // selectionChangedCallback(e);
  };

  return (
    <Select
      className="filterDropdown"
      defaultValue={selectedOption}
      onChange={handleOnChange}
      options={technologyOptions}
      isMulti={true}
      placeholder={placeholder != null ? placeholder : "Tecnologías"}
    />
  );
}
