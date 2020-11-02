import { useField } from "formik";
import React from "react";

type ITextAreaFieldProps = {
    id?: string;
    label: string;
    name: string;
    placeholder?: string;
    props?: any;
};

const TextAreaField: React.FC<ITextAreaFieldProps> = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
        <>
            {label !== undefined ? (
                <label htmlFor={props.id || props.name}>{label} : </label>
            ) : (
                <label htmlFor={props.id || props.name}>&nbsp;</label>
            )}
            <textarea
                className="py-1 px-2 text-gray-800 w-full resize-none"
                rows={3}
                {...field}
                {...props}
            ></textarea>
            <span className="text-sm text-red-500 h-5">
                {meta.touched && meta.error ? meta.error : ""}
            </span>
        </>
    );
};

export default TextAreaField;
