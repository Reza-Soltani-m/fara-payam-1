import React, { useState } from 'react';
import { Checkbox, FormControlLabel, type CheckboxProps } from '@mui/material';
import {
    Controller,
    type FieldValues,
    type UseFormReturn,
} from 'react-hook-form';

export type CustomCheckboxProps = CheckboxProps & {
    label?: string;
    methods?: UseFormReturn<FieldValues, any, FieldValues>;
    name: string;
};

const CustomSelect: React.FC<CustomCheckboxProps> = ({
    label,
    name,
    methods,
    ...props
}) => {
    return (
        <Controller
            control={methods?.control}
            render={({ field, fieldState: { error } }) => (
                <FormControlLabel
                    {...field}
                    control={
                        <Checkbox
                            checked={methods?.watch(name) ?? false}
                            {...props}
                        />
                    }
                    label={label}
                />
            )}
            name={name}
        />
    );
};

export default CustomSelect;
