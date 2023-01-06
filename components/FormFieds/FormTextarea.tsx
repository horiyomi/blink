import { FormTextAreaProps } from "../types";

export const FormTextArea = ({
  label,
  name,
  error,
  value,
  handleChange,
  rows,
  cols
}: FormTextAreaProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", margin: "5px 10px" }}>
      <div style={{ width: "100%"}}>
        <label htmlFor={name}>{label}</label>
      </div>
      <div>
        <textarea name={name} onChange={handleChange} value={value} rows={rows} cols={cols}/>
      </div>
    </div>
  );
};
