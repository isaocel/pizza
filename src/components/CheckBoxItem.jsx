import React from "react";

const CheckboxItem = ({ label, onChange, checked, name }) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          name={name}
        />
        {label}
      </label>
    </div>
  );
};

export default CheckboxItem;
