import { useField } from "formik";
import React from "react";

type IInputFieldProps = {
    id?: string;
    label?: string;
    name: string;
    disabled?: boolean;
};

const InputField: React.FC<IInputFieldProps> = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <div className="mb-2 w-full flex flex-col row-gap-px">
            {label !== undefined ? (
                <label htmlFor={props.id || props.name}>{label} : </label>
            ) : (
                <label htmlFor={props.id || props.name}>&nbsp;</label>
            )}
            <input
                className="py-1 px-2 text-gray-800 w-full"
                {...field}
                {...props}
            />
            <span className="text-sm text-red-500 h-5">
                {meta.touched && meta.error ? meta.error : ""}
            </span>
        </div>
    );
};

export default InputField;
