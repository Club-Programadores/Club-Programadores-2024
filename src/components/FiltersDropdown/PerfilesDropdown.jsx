import { useState } from "react";
import Select from "react-select";

export default function PerfilesDropdown({
  selectionChangedCallback,
  placeholder,
  setProfilesFilter,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOnChange = (e) => {
    setSelectedOption(e);
    if (setProfilesFilter != null) setProfilesFilter(e);
    // selectionChangedCallback(e);
  };

  return (
    <Select
      className="filterDropdown"
      defaultValue={selectedOption}
      onChange={handleOnChange}
      options={profilesOptions}
      isMulti={true}
      placeholder={placeholder != null ? placeholder : "Perfil"}
    />
  );
}
