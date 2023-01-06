import { FormSelectProps } from "../types";

export const FormSelect = ({
  label,
  name,
  value,
  error,
  options,
  handleChange,
  setFieldValue,
}: FormSelectProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", margin: "5px 10px" }}>
      <div>
        <label htmlFor={name}>{label}</label>
      </div>
      <div>
        <select name={name} onChange={handleChange}>
          <option value=""></option>
          {options &&
            options.map((option, index) => (
              <option
                key={index + 1}
                value={option.value}
                // value={value}
                // onChange={() => setFieldValue(name, option.value)}
              >
                {option.label}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};
