import { CustomFormFields, FormLayoutProps } from "../types";
import FormInput from "./FormInput";
import { FormSelect } from "./FormSelect";
import { FormTextArea } from "./FormTextarea";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";

const composeInitialValuesOfFields = (fields: CustomFormFields[]) => {
  let initialValues: { [key: string]: any } = {};

  for (let field of fields) {
    initialValues[field.name] = "";
  }

  return initialValues;
};

const createYupSchema = (schema: any, config: any) => {
  const { name, validationType, validations = [] } = config;

  if (!Yup[validationType]) {
    return schema;
  }

  let validator = Yup[validationType]();
  validations.forEach((valiadation) => {
    const { type, params } = valiadation;
    if (!valiadation[type]) {
      return;
    }
    validator = validations[type](...params);
  });
  schema[name] = validator;
  
  return schema;
};

export const FormLayout = (props: FormLayoutProps) => {
  const { title, description, formFields, type } = props.formData;

  const composeFieldLayout = (field: CustomFormFields, formik: any) => {
    switch (field.type) {
      case "select":
        return (
          <FormSelect
            label={field.label}
            name={field.name}
            options={field.options || []}
            value={formik.value}
            handleChange={formik.handleChange}
            setFieldValue={formik.setFieldValue}
            error={formik.error}
            touched={formik.touched}
          />
        );
      case "date":
        return (
          <FormInput
            type={field.type}
            label={field.label}
            name={field.name}
            value={formik.value}
            handleChange={formik.handleChange}
            error={formik.error}
            touched={formik.touched}
          />
        );
      case "textarea":
        return (
          <FormTextArea
            label={field.label}
            name={field.name}
            value={formik.value}
            handleChange={formik.handleChange}
            error={formik.error}
            cols={80}
            rows={10}
            touched={formik.touched}
          />
        );
      default:
        return;
    }
  };

  const schema = formFields.reduce(createYupSchema, {});

  const validationSchema = Yup.object().shape(schema);
  const formik = useFormik({
    initialValues: composeInitialValuesOfFields(formFields),
    validationSchema,
    onSubmit: (values) => {
      props.submitHandler(values, props.callback)
    },
  });

  return (
    <div style={{ display: "flex", width: "50%", flexDirection: "column" }}>
      <div>
        <div>
          <h4 style={{ padding: "0px 0px", margin: "0px 0px"}}>{title}</h4>
        </div>
        <div style={{ padding: "10px 0px" }}>
          <span>{description}</span>
        </div>
      </div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "space-between" }}
          >
            {formFields &&
              formFields.map((field, index) => (
                <div key={index + 1}>{composeFieldLayout(field, formik)}</div>
              ))}
            <div style={{ margin: "5px 10px", width: "100%"}}>
              <button type="submit" disabled={!formik.isValid} style={{ width: "90%", height: "30px"}}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
