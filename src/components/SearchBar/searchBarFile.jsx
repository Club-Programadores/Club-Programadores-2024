import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import "./searchBarStyles.css";

export default function SearchBar(props) {
  const [value, setValue] = useState("");
  const [showDropdowns, setShowDropdowns] = useState(false);

  const handleOnClickInput = () => {
    props.setSearch(value);
  };

  const handleOnChangeInput = (e) => {
    setValue(e.target.value);
  };

  const handleOnClickButton = () => {
    props.setShowDropdowns(!props.showDropdownsState);
    setShowDropdowns(!showDropdowns);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleOnClickInput();
    }
  };

  return (
    <div className="searchBar d-flex container-sm">
      <input
        className="searchInput form-control mr-sm-2"
        placeholder="Buscar"
        value={value}
        onChange={handleOnChangeInput}
        onKeyDown={handleKeyDown}
      />
      <div className="searchBarIcons">
        <button
          type="button"
          className="btn btn-light"
          onClick={handleOnClickInput}
        >
          <FaMagnifyingGlass />
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={handleOnClickButton}
        >
          <FaFilter />
        </button>
      </div>
    </div>
  );
}
