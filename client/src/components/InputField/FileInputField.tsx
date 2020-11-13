import React from "react";
import Container from "../Container/Container";
import { RiImageAddFill } from "react-icons/ri";
import { FieldInputProps, FormikProps } from "formik";

interface Values {
    imageProfile: File;
}

type IFileInputField = {
    disabled: boolean;
    field: FieldInputProps<Values>;
    form: FormikProps<Values>;
    setFile: React.Dispatch<React.SetStateAction<string | Blob>>;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => void;
};

const FileInputField: React.FC<IFileInputField> = ({
    disabled,
    field, // { name, value, onChange, onBlur }
    form: { touched, errors },
    setFieldValue,
    setFile,
}) => {
    const [imagePreviewURL, setImagePreviewURL] = React.useState<
        string | ArrayBuffer | null
    >(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files === null) return;

        const reader = new FileReader();
        const file = e.target.files[0];
        setFile(file);

        if (file) {
            reader.onloadend = () => setImagePreviewURL(reader.result);
            reader.readAsDataURL(file);
            setFieldValue(field.name, file);
        }
    };

    const showPreviewImage = () => {
        if (touched.imageProfile && errors.imageProfile) {
            return (
                <span className="text-sm text-red-500">
                    {errors.imageProfile}
                </span>
            );
        } else if (imagePreviewURL !== null) {
            return (
                <div className="my-4 w-56 overflow-hidden">
                    <img
                        src={imagePreviewURL as string}
                        alt="your avatar"
                        className="object-cover"
                    />
                </div>
            );
        }
    };

    return (
        <Container className="flex-col">
            <label
                htmlFor={field.name}
                className="text-black bg-orange-500 py-2 px-4 rounded flex items-center hover:bg-orange-400 
                transition-colors duration-300 cursor-pointer disabled:bg-gray-500 disabled:text-gray-400"
            >
                <span>Select Image &nbsp;</span>
                <RiImageAddFill />
            </label>
            <input
                type="file"
                name={field.name}
                id={field.name}
                accept=".jpg, .png"
                onChange={handleChange}
                hidden
                disabled={disabled}
            />
            {showPreviewImage()}
        </Container>
    );
};

export default FileInputField;
