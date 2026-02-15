import React from 'react';
import {
    MaterialReactTable,
    type MaterialReactTableProps,
    type MRT_ColumnDef,
    type MRT_RowData,
} from 'material-react-table';
import { MRT_Localization_FA } from 'material-react-table/locales/fa';

import { Button } from '@mui/material';

export type CustomDataTableProps<TData extends MRT_RowData> =
    MaterialReactTableProps<TData> & {
        requiredLabel?: boolean;
        columns: MRT_ColumnDef<TData, any>[];
    };

const CustomDataTable: React.FC<CustomDataTableProps<any>> = ({
    requiredLabel,
    ...props
}) => {
    return (
        <>
            <MaterialReactTable
                columns={props.columns}
                data={props.data}
                columnResizeDirection="rtl"
                enableColumnResizing
                localization={MRT_Localization_FA}
                initialState={{
                    density: 'compact',
                    columnPinning: { right: ['actions'] },
                }}
                enableDensityToggle={false}
                {...props}
            />
        </>
    );
};

export default CustomDataTable;
