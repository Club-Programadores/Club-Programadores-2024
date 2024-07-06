import "./filterButtonStyle.css";

export default function FilterButton(props) {
  const handleOnClick = (e) => {
    props.onClick();
  };

  return (
    <div className="filterButton" onClick={handleOnClick}>
      <hr style={{ width: "60%" }} />
      <hr style={{ width: "30%" }} />
      <hr style={{ width: "10%" }} />
    </div>
  );
}
