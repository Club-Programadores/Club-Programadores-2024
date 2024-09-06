import { useState } from "react";
import Select from "react-select";

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
