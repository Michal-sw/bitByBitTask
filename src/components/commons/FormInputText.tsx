import { Controller } from "react-hook-form";
import React from "react";
import { TextField } from "@mui/material";

interface FormInputTextProps {
    name: string;
    control: any;
    defaultValue: any;
    label: string;
    isReadOnly?: boolean;
    inputRef?: any;
    errors?: any;
    rules?: any;
}

const FormInputText = ({ name, control, defaultValue, label, isReadOnly, inputRef, errors, rules }: FormInputTextProps) => {
    const error = errors?.[name];

    return (
        <Controller
            defaultValue={defaultValue}
            name={name}
            rules={rules}
            control={control}
            render={({ field: { onChange, value } }) => (
                <TextField
                    error={!!error}
                    helperText={error?.message}
                    inputRef={inputRef}
                    onChange={onChange} 
                    value={value} 
                    label={label}
                    InputProps={{readOnly: isReadOnly ?? false}}
                    variant="standard"
                />
            )}
        />
    )
}

export default FormInputText;