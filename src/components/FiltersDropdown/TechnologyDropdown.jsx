import { useState } from "react"
import Select from "react-select"
import aptitudesJson from "../../../assets/aptitudes.json"

export default function TechnologyDropdown({
  selectionChangedCallback,
  setTechnologyFilter,
}) {
  const [selectedOption, setSelectedOption] = useState(null)
  const technologyOptions = aptitudesJson.technologyOptions

  const handleOnChange = (e) => {
    setSelectedOption(e)
    if (setTechnologyFilter) setTechnologyFilter(e)
    if (selectionChangedCallback) selectionChangedCallback(e)
  }

  return (
    <Select
      className="filterDropdown"
      placeholder="Tecnologías"
      value={selectedOption}
      options={technologyOptions}
      onChange={handleOnChange}
      isMulti={true}
    />
  )
}

// Este dropdown sólo es usado en los filtros de <<ParticipantesPage>>.
// <<RegistrationModal>>, <<EditUserProfile>> y <<EditProjects>> usan dropdowns propios.