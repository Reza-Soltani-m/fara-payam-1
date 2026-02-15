import React, { useEffect, useState } from 'react';
import {
    DateTimePicker,
    type DateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker';
// import type { DateTimePickerProps } from "./DateTimePicker.types";

import moment, { type Moment } from 'moment-jalaali';
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ClearIcon, type DateOrTimeView } from '@mui/x-date-pickers';
import {
    Controller,
    type FieldValues,
    type UseFormReturn,
} from 'react-hook-form';
import { faIR } from '@mui/x-date-pickers/locales';
import { IconButton, InputAdornment } from '@mui/material';

export type CustomDatePickerProps = DateTimePickerProps & {
    label?: string;
    dateType?: 'shamsi' | 'geregorian';
    timePicker?: boolean;
    methods?: UseFormReturn<FieldValues, any, FieldValues>;
    name: string;
    clearable?: boolean;
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    label,
    dateType = 'shamsi',
    timePicker = false,
    methods,
    name,
    clearable = true,
    ...props
}) => {
    // moment.updateLocale('fa', {

    //     weekdaysShort: ['یکشنبه', '۲ش', '۳ش', '۴ش', '۵ش', 'ج', 'شنبه'],
    //     weekdaysMin: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
    //     preparse: (string) => string,
    //     postformat: (string) => string,
    // });

    // // 4. تنظیم نهایی لوکال برنامه روی 'fa'
    // moment.locale('fa');

    if (dateType == 'shamsi') {
        moment.loadPersian();
    }

    const viewsToUse: DateOrTimeView[] = timePicker
        ? ['year', 'month', 'day', 'hours', 'minutes']
        : ['year', 'month', 'day'];

    return (
        <div className={'datePicker-box'}>
            <Controller
                control={methods?.control}
                render={({ field, fieldState: { error } }) => (
                    <LocalizationProvider
                        dateAdapter={
                            dateType === 'shamsi'
                                ? AdapterMomentJalaali
                                : AdapterMoment
                        }
                        localeText={{
                            ...faIR.components.MuiLocalizationProvider
                                .defaultProps.localeText,
                            okButtonLabel: 'تایید',
                            fieldDayPlaceholder: () => 'روز',
                            fieldYearPlaceholder: () => 'سال',
                            fieldMonthPlaceholder: () => 'ماه',
                            fieldHoursPlaceholder: () => 'ساعت',
                            fieldMinutesPlaceholder: () => 'دقیقه',
                        }}
                        // adapterLocale="fa"
                        // localeText={{
                        //     clearButtonLabel: 'Empty',
                        //     todayButtonLabel: 'Now',
                        //     cancelButtonLabel: 'لغو',
                        // }}
                    >
                        <DateTimePicker
                            {...field}
                            label={label ?? ''}
                            // defaultValue={moment('2022-02-01T12:00:00')}
                            value={
                                (methods?.watch(name) &&
                                    moment(methods?.watch(name))) ??
                                null
                            }
                            slotProps={{
                                field: { clearable: clearable },

                                textField: {
                                    size: 'small', // این پراپرتی بر روی TextField اعمال می‌شود
                                    fullWidth: true,
                                },
                            }}
                            views={viewsToUse}
                            onChange={(val) => {
                                methods?.setValue(
                                    name,
                                    val === null
                                        ? null
                                        : (val as Moment).toDate()
                                );
                            }}
                            ampm={false}
                            {...props}
                        />
                    </LocalizationProvider>
                )}
                name={name}
            />
        </div>
    );
};

export default CustomDatePicker;
