import { useState } from "react";
import Select from "react-select";

export const profilesOptions = [
  { label: "WebDev", value: "webdev" },
  { label: "FrontEnd", value: "frontend" },
  { label: "BackEnd", value: "backend" },
  { label: "GameDev", value: "gamedev" },
  { label: "Teaching", value: "teaching" },
  { label: "UI/UX", value: "ui/ux" },
  { label: "Quality Assurance", value: "quality assurance" },
  { label: "Testing", value: "testing" },
  { label: "Networking", value: "networking" },
  {
    label: "Functional Oriented Programming",
    value: "functional oriented programming",
  },
  {
    label: "Object Oriented Programming",
    value: "object oriented programming",
  },
  {
    label: "Arquitectura de Información",
    value: "arquitectura de información",
  },
  { label: "Knowledge Graphs", value: "knowledge graphs" },
  { label: "3D Art", value: "3d art" },
  { label: "2D Art", value: "2d art" },
  { label: "Pixel Art", value: "pixel art" },
];

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
