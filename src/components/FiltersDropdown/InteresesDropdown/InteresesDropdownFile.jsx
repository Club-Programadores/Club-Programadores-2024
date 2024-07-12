import { useState } from "react";
import Select from "react-select";

const options = [
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

export default function InteresesDropdown(props) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOnChange = (e) => {
    setSelectedOption(e);
    props.setInteresesFilter(e);
  };

  return (
    <Select
      defaultValue={selectedOption}
      onChange={handleOnChange}
      options={options}
      isMulti={true}
      placeholder="Intereses"
    />
  );
}
