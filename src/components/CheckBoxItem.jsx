import React from "react";

const CheckboxItem = ({ label, onChange, checked }) => {
  return (
    <div>
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
      </label>
    </div>
  );
};

export default CheckboxItem;
