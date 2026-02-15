import React, { useState } from 'react';
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    type SelectProps,
} from '@mui/material';
import {
    Controller,
    type FieldValues,
    type UseFormReturn,
} from 'react-hook-form';
import { ClearIcon } from '@mui/x-date-pickers';

export type CustomSelectProps = SelectProps & {
    label?: string;
    options: any[];
    valueKey: string;
    labelKey: string;
    methods?: UseFormReturn<FieldValues, any, FieldValues>;
    name: string;
    clearable?: boolean;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
    label,
    size = 'small',
    options,
    valueKey,
    labelKey,
    methods,
    name,
    clearable = true,
    ...props
}) => {
    const [list, setList] = useState(
        options.map((item) => (
            <MenuItem value={item[valueKey]} selected>
                {item[labelKey]}
            </MenuItem>
        ))
    );

    return (
        <Controller
            control={methods?.control}
            render={({ field, fieldState: { error } }) => (
                <FormControl size="small" fullWidth>
                    {label && <InputLabel>{label}</InputLabel>}
                    <Select
                        {...field}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label={label ?? ''}
                        {...props}
                        // onChange={handleChange}
                        error={!!error}
                        // helperText={error?.message}
                        value={methods?.watch(name) ?? ''}
                        // value={'bill2'}
                        // onChange={(e) => setSelectValue(e.target.value)}

                        endAdornment={
                            methods?.watch(name) &&
                            clearable && (
                                <InputAdornment
                                    sx={{ marginRight: '10px' }}
                                    position="end"
                                >
                                    <IconButton
                                        onClick={() => {
                                            methods?.setValue(name, undefined);
                                        }}
                                    >
                                        <ClearIcon></ClearIcon>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    >
                        {/* <MenuItem value={undefined}>
                            <i>هیچکدام</i>
                        </MenuItem> */}
                        {list}
                    </Select>
                </FormControl>
            )}
            name={name}
        />
    );
};

export default CustomSelect;
