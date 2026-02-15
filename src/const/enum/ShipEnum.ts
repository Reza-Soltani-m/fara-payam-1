import type { EnumOption } from 'types';

export const SHIP_ENUM: EnumOption[] = [
    { value: 'ship1', label: 'کشتی 1' },
    { value: 'ship2', label: 'کشتی 2' },
];

export type ShipEnum = (typeof SHIP_ENUM)[number]['value'];

export const getShipEnumOptions = () => SHIP_ENUM;

export const getShipLabelByValue = (value: ShipEnum): string => {
    const option = SHIP_ENUM.find((opt) => opt.value === value);

    return option ? option.label : value;
};
