import { useState } from "react";
// import FilterButton from "../FilterButton/filterButtonFile";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";

import "./searchBarStyles.css";

export default function SearchBar(props) {
  const [value, setValue] = useState("");
  const [showDropdowns, setShowDropdowns] = useState(false);

  const handleOnClickInput = (e) => {
    console.log(1);
    props.setSearch(value);
  };
  const handleOnChangeInput = (e) => {
    setValue(value);
    setValue(e.target.value);
  };

  const handleOnClickButton = (e) => {
    props.setShowDropdowns(!props.showDropdownsState);
    setShowDropdowns(!showDropdowns);
  };

  return (
    // <div
    //   className={
    //     showDropdowns
    //       ? "searchBarWithDropdown"
    //       : "searchBar container-lg d-flex"
    //   }
    // >
    <div className="searchBar d-flex container-sm">
      <input
        className="searchInput form-control mr-sm-2"
        placeholder="Buscar"
        value={value}
        onChange={handleOnChangeInput}
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
