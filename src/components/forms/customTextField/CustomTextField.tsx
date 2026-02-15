import React from 'react';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import {
    Controller,
    type FieldValues,
    type UseFormReturn,
} from 'react-hook-form';
import { IconButton, InputAdornment } from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';

export type CustomTextFieldProps = TextFieldProps & {
    requiredLabel?: boolean;
    methods?: UseFormReturn<FieldValues, any, FieldValues>;
    name: string;
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({
    requiredLabel,
    variant = 'outlined',
    size = 'small',
    methods,
    name,
    ...props
}) => {
    return (
        <Controller
            control={methods?.control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    fullWidth
                    {...props}
                    {...field}
                    variant={variant}
                    size={size}
                    value={methods?.watch(name) ?? ''}
                    error={!!error}
                    helperText={error?.message}
                    slotProps={{
                        input: {
                            endAdornment: methods?.watch(name) && (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => {
                                            methods?.setValue(name, undefined);
                                        }}
                                    >
                                        <ClearIcon></ClearIcon>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            )}
            name={name}
        />
    );
};

export default CustomTextField;
