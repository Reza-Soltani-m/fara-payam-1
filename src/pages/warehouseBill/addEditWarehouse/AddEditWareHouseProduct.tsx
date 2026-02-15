import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import ForwardIcon from '@mui/icons-material/Forward';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import {
    Grid,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    InputAdornment,
    FormControlLabel,
    Checkbox,
    Tooltip,
    DialogActions,
} from '@mui/material';
import {
    CustomTextField,
    CustomDatePicker,
    CustomSelect,
    CustomGrid,
    CustomDataTable,
} from 'components';
import {
    useForm,
    Controller,
    type UseFormReturn,
    type FieldValues,
} from 'react-hook-form';
import type { ProductDTO } from 'types';
import { useEffect } from 'react';

type AddEditWareHouseProductProps = {
    product?: ProductDTO;
    handleCloseEditProductDialog: () => void;
    onProductAddEditHandler: (product: ProductDTO) => void;
};

export default function AddEditWareHouseProduct({
    product,
    handleCloseEditProductDialog,
    onProductAddEditHandler,
}: AddEditWareHouseProductProps) {
    // const {
    //     control,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm({
    //     defaultValues: {
    //         name: '',
    //         eventDate: new Date(),
    //     },
    // });

    useEffect(() => {
        methods.reset(product);
    }, []);

    const onSubmit = (data: any) => {
        onProductAddEditHandler(data);
        handleCloseEditProductDialog();
    };

    const methods: UseFormReturn<FieldValues, any, FieldValues> = useForm({
        mode: 'all',
    });

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CustomGrid numberOfColumns={'4'}>
                <CustomTextField
                    label={'کد کالا'}
                    methods={methods}
                    name="productCode"
                />

                <CustomTextField
                    label={'نام کالا'}
                    methods={methods}
                    name="productName"
                />

                <CustomTextField
                    label={'تحویل دهنده کالا'}
                    methods={methods}
                    name="deliverer"
                />

                <CustomTextField
                    label={'نام تحویل دهنده'}
                    methods={methods}
                    name="delivererName"
                />

                <CustomTextField
                    label={'مقدار'}
                    methods={methods}
                    name="amount"
                />

                <CustomTextField
                    label={'سهم از کسور'}
                    methods={methods}
                    name="shareOfDeduction"
                />

                <CustomTextField
                    label={'ملاحظات'}
                    methods={methods}
                    name="description"
                />

                <CustomTextField
                    label={'شماره درخواست'}
                    methods={methods}
                    name="requestNumber"
                />

                <CustomTextField
                    label={'تفصیلی 2'}
                    methods={methods}
                    name="details2"
                />
            </CustomGrid>

            <DialogActions>
                <Button variant="contained" type="submit">
                    تایید
                </Button>
            </DialogActions>
        </form>
    );
}
