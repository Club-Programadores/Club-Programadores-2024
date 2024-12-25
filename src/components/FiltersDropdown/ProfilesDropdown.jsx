import { useState } from "react"
import Select from "react-select"
import aptitudesJson from "../../../assets/aptitudes.json"

export default function ProfilesDropdown({
  selectionChangedCallback,
  setProfilesFilter,
}) {
  const [selectedOption, setSelectedOption] = useState(null)
  const profilesOptions = aptitudesJson.profilesOptions

  const handleOnChange = (e) => {
    setSelectedOption(e)
    if (setProfilesFilter) setProfilesFilter(e)
    if (selectionChangedCallback) selectionChangedCallback(e)
  }

  return (
    <Select
      className="filterDropdown"
      placeholder="Perfiles"
      value={selectedOption}
      options={profilesOptions}
      onChange={handleOnChange}
      isMulti={true}
    />
  )
}

// Este dropdown sólo es usado en los filtros de <<ParticipantesPage>>.
// <<RegistrationModal>> y <<EditUserProfile>> usan dropdowns propios.