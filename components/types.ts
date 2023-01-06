export type FormInputProps = {
    type: string;
    label: string;
    name: string;
    value: any;
    error?: Object;
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur?: (e: any) => void;
    touched?: { [field: string]: boolean };
};

export type FormSelectProps = {
    name: string;
    label: string;
    options: SelectOption[];
    error?: Object;
    value: string;
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur?: (e: any) => void;
    touched?: { [field: string]: boolean };
    setFieldValue: Function
};

export type SelectOption = {
    label: string;
    value: string;
};

export type CustomFormFields = {
    type: string;
    label: string;
    name: string;
    options?: any[];
    validationType: string;
    validations: [
        {
            type: string,
            params: string[],

        }
    ]
};

export type CustomFormsWrapper = {
    type: string;
    title: string;
    description: string;
    formFields: CustomFormFields[];
};


// FormLayout -> describes layout format
export type FormLayoutProps = {
    formData: CustomFormsWrapper;
    submitHandler: Function
    callback: Function
};

export type FormTextAreaProps = {
    name: string;
    label: string;
    value: string;
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur?: (e: any) => void;
    touched?: { [field: string]: boolean };
    error?: Object;
    cols: number;
    rows: number;
};