import React from "react";
import { FormInputProps } from "../types";

export default function FormInput({
  label,
  type,
  name,
  error,
  handleChange,
}: FormInputProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", margin: "5px 10px" }}>
      <div>
        <label htmlFor={name}>{label}</label>
      </div>
      <div>
        <input type={type} name={name} onChange={handleChange} />
      </div>
    </div>
  );
}
