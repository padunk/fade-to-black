import React from "react";
import Container from "../Container/Container";
import { RiImageAddFill } from "react-icons/ri";

const FileInputField = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}: any) => {
    const [imagePreviewURL, setImagePreviewURL] = React.useState<any | null>(
        null
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files === null) return;

        const reader = new FileReader();
        const file = e.target.files[0];
        props.setFile(file);

        if (file) {
            reader.onloadend = () => setImagePreviewURL(reader.result);
            reader.readAsDataURL(file);
            props.setFieldValue(field.name, file);
        }
    };

    const showPreviewImage = () => {
        if (touched[field.name] && errors[field.name]) {
            return (
                <span className="text-sm text-red-500">
                    {errors[field.name]}
                </span>
            );
        } else if (imagePreviewURL !== null) {
            return (
                <div className="my-4 w-56 overflow-hidden">
                    <img
                        src={imagePreviewURL}
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
                transition-colors duration-300 cursor-pointer"
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
            />
            {showPreviewImage()}
        </Container>
    );
};

export default FileInputField;
