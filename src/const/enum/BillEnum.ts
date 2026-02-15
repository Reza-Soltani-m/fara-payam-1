import type { EnumOption } from 'types';

export const BILL_ENUM: EnumOption[] = [
    { value: 'BUY_BILL', label: 'رسید خرید' },
    { value: 'CELL_BILL', label: 'رسید فروش' },
];

export type BillEnum = (typeof BILL_ENUM)[number]['value'];

export const getBillEnumOptions = () => BILL_ENUM;

export const getBillLabelByValue = (value: BillEnum): string => {
    const option = BILL_ENUM.find((opt) => opt.value === value);

    return option ? option.label : value;
};
