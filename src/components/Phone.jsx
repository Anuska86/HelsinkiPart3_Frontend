const Phone = ({ phone, toggleImportance }) => {
    const label = phone.important ? "make not important" : "make important";
  
    return (
      <li className="phone">
        {phone.name} {phone.number}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    );
  };
  export default Phone;
  