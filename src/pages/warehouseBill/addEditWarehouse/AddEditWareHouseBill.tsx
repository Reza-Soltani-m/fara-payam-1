import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import ClearIcon from '@mui/icons-material/Clear'
import DeleteIcon from '@mui/icons-material/Delete'
import ForwardIcon from '@mui/icons-material/Forward'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit'
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
} from '@mui/material'
import {
    CustomTextField,
    CustomDatePicker,
    CustomSelect,
    CustomGrid,
    CustomDataTable,
    CustomModal,
} from 'components'
import type { MRT_ColumnDef } from 'material-react-table'
import { useEffect, useState } from 'react'
import AddEditWareHouseProduct from './AddEditWareHouseProduct'
import { useForm, type FieldValues, type SubmitHandler, type UseFormReturn } from 'react-hook-form'
import moment from 'moment'
import { initialBillDTO, ProductDTO } from 'types'
import { CustomCheckBox } from 'components'
import { getShipEnumOptions } from '../../../const'
import { getBillEnumOptions } from '../../../const/enum/BillEnum'

type AddEditWareHouseBillProps = {
    handleClose: (refresh: boolean) => void
    modelId?: string
}

export default function AddEditWareHouseBill({ handleClose, modelId }: AddEditWareHouseBillProps) {
    const [tab, setTab] = useState(1)
    const [products, setProducts] = useState<ProductDTO[]>([])
    const [editProduct, setEditProduct] = useState<ProductDTO | undefined>(undefined)

    const handleCloseEditProductDialog = () => {
        setEditProduct(undefined)
    }

    const isEdit = modelId != '-1'

    const methods: UseFormReturn<FieldValues, any, FieldValues> = useForm({
        mode: 'all',
        defaultValues: initialBillDTO(),
    })

    const columns = React.useMemo<MRT_ColumnDef<ProductDTO>[]>(
        () => [
            { accessorKey: 'productCode', header: 'کد کالا' },
            { accessorKey: 'productName', header: 'نام کالا' },
            { accessorKey: 'deliverer', header: 'تحویل دهنده' },
            { accessorKey: 'delivererName', header: 'نام تحویل دهنده' },
            { accessorKey: 'amount', header: 'مقدار' },
            { accessorKey: 'shareOfDeduction', header: 'سهم از کسور' },
            { accessorKey: 'description', header: 'ملاحضات' },
            { accessorKey: 'requestNumber', header: 'شماره درخواست' },
            { accessorKey: 'details2', header: 'تفصیلی 2' },
            {
                id: 'actions',
                header: 'عملیات',
                enableSorting: false,
                enableColumnFilter: false,
                enableColumnOrdering: false,
                enableHiding: false,
                enableResizing: false,

                pin: 'left', // ستون در سمت راست ثابت
                size: 100,
                Cell: ({ row }) => (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '0.3rem',
                        }}
                    >
                        <Tooltip title='ویرایش' arrow>
                            <IconButton
                                color='primary'
                                size='small'
                                onClick={() => {
                                    console.log('row.original', row.original)

                                    setEditProduct(row.original)
                                }}
                            >
                                <EditIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='حذف' arrow>
                            <IconButton
                                color='error'
                                size='small'
                                onClick={() => onProductDeleteHandler(row.original)}
                            >
                                <DeleteIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>
                    </div>
                ),
            },
        ],
        []
    )

    useEffect(() => {
        if (isEdit) {
            const loadedLocalStorage = localStorage.getItem('data')
            const loadedData: any[] = loadedLocalStorage ? JSON.parse(loadedLocalStorage) : []

            const model = loadedData.find((item) => item.id == modelId)
            methods.reset(model)

            if (model) setProducts(model.products ?? [])
        }
    }, [])

    useEffect(() => {
        console.log('useEffect products', products)
    }, [products])

    const onSubmit = (values: any) => {
        const loadedLocalStorage = localStorage.getItem('data')
        let loadedData: any[] = loadedLocalStorage ? JSON.parse(loadedLocalStorage) : []

        const finalValues = { ...values, products }
        if (isEdit) {
            loadedData = loadedData.map((item) => {
                if (item.id === modelId) {
                    return { ...finalValues, id: modelId }
                }

                return item
            })
        } else {
            loadedData.push({ ...finalValues, id: crypto.randomUUID() })
        }

        localStorage.setItem('data', JSON.stringify(loadedData))
        handleClose(true)
    }

    const onProductAddEditHandler = (product: ProductDTO) => {
        let productList = products
        if (product.id) {
            productList = products.map((item) => {
                if (item.id === product.id) {
                    return { ...product }
                }

                return item
            })
        } else {
            productList = [...products, { ...product, id: crypto.randomUUID() }]
        }

        setProducts(productList)
    }

    const onProductDeleteHandler = (product: ProductDTO) => {
        setProducts((productsList) => productsList.filter((item) => item.id != product.id))
    }

    return (
        <>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tab} onChange={(event, value) => setTab(value)}>
                        <Tab value={1} label='ابزارهای عمومی' />
                        <Tab value={2} label='ابزارهای عملیاتی' />
                        <Tab value={3} label='فرم های مرتبط' />
                    </Tabs>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        padding: '5px 10px',
                        bgcolor: 'primary.main',
                    }}
                >
                    {tab == 1 && (
                        <Button variant='contained' color='secondary' startIcon={<DeleteIcon />}>
                            ابطال / احیا
                        </Button>
                    )}

                    {tab == 2 && (
                        <Button variant='contained' color='secondary' startIcon={<ForwardIcon />}>
                            ارجاع
                        </Button>
                    )}

                    {tab == 3 && (
                        <Button
                            variant='contained'
                            color='secondary'
                            startIcon={<DocumentScannerIcon />}
                        >
                            فراخوانی
                        </Button>
                    )}
                </Box>

                <CustomGrid numberOfColumns={'6'}>
                    <CustomTextField
                        label='انبار'
                        // onChange={() => console.log(value.toString())}
                        methods={methods}
                        required
                        name='warehouse'
                    />

                    <CustomSelect
                        label={'نوع رسید'}
                        options={getBillEnumOptions()}
                        labelKey={'label'}
                        valueKey={'value'}
                        methods={methods}
                        // required
                        name='receiptType'
                    />

                    <CustomDatePicker
                        label={'تاریخ رسید'}
                        timePicker
                        methods={methods}
                        name='receiptDate'
                    />

                    <CustomTextField
                        label={'کد انبار'}
                        methods={methods}
                        name='warehouseCode'
                        // onChange={() => console.log(value.toString())}
                    />

                    <CustomTextField
                        label={'سریال'}
                        methods={methods}
                        name='serial'
                        // onChange={() => console.log(value.toString())}
                    />

                    <CustomCheckBox label={'رسید مستقیم'} methods={methods} name='directReceipt' />

                    <CustomTextField
                        label={'شماره ارجاع'}
                        methods={methods}
                        name='referenceNumber'
                        // onChange={() => console.log(value.toString())}
                    />

                    <CustomDatePicker
                        label={'تاریخ درخواست'}
                        methods={methods}
                        name='requestDate'
                    />

                    <CustomTextField
                        label={'کوتاژ'}
                        methods={methods}
                        name='cotaj'
                        // onChange={() => console.log(value.toString())}
                    />

                    <CustomTextField
                        label={'شماره درخواست'}
                        methods={methods}
                        name='requestNumber'
                        // onChange={() => console.log(value.toString())}
                    />

                    <CustomSelect
                        label={' کشتی'}
                        options={getShipEnumOptions()}
                        labelKey={'label'}
                        valueKey={'value'}
                        methods={methods}
                        name='ship'
                    />

                    <CustomTextField
                        label={'تحویل گیرنده'}
                        methods={methods}
                        name='reciever'
                        // onChange={() => console.log(value.toString())}
                    />

                    <CustomDatePicker
                        label={'تاریخ میلادی'}
                        dateType={'geregorian'}
                        methods={methods}
                        name='geregorianDate'
                    />
                </CustomGrid>

                <div className={'p-[15px]'}>
                    <CustomDataTable
                        columns={columns}
                        data={products}
                        renderTopToolbarCustomActions={({ row }) => (
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => {
                                    setEditProduct({})
                                }}
                            >
                                افزودن آیتم جدید
                            </Button>
                        )}
                    />
                </div>

                <AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}>
                    <Toolbar variant='dense'>
                        <IconButton
                            edge='start'
                            color='inherit'
                            onClick={() => handleClose(false)}
                            aria-label='close'
                            size='small'
                            sx={{
                                color: '#fff',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                            {isEdit ? 'ویرایش رسید انبار' : 'افزودن رسید انبار'}
                        </Typography>
                        <Button
                            // autoFocus
                            // color="inherit"
                            size='small'
                            type='submit'
                            variant='contained'
                            color='secondary'
                            // onClick={handleClose}
                        >
                            {isEdit ? 'ویرایش' : 'افزودن'}
                        </Button>
                    </Toolbar>
                </AppBar>
            </form>

            <CustomModal
                open={editProduct != undefined}
                onClose={() => setEditProduct(undefined)}
                title={editProduct?.id ? 'ویرایش کالا' : 'افزودن کالا'}
            >
                <AddEditWareHouseProduct
                    product={editProduct}
                    handleCloseEditProductDialog={handleCloseEditProductDialog}
                    onProductAddEditHandler={onProductAddEditHandler}
                />
            </CustomModal>

            {/* <Dialog
                open={editProduct != undefined}
                onClose={() => setEditProduct(undefined)}
                // slots={{
                //     transition: Transition,
                // }}
                sx={{
                    display: 'inline-block',
                    maxWidth: '1000px',
                }}
            >
                <div
                    className="block p-6
          w-full max-w-[1000px]
          mx-4
          transition-all duration-300
          sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px]"
                >
                    <AddEditWareHouseProduct
                        data={editProduct}
                        handleCloseEditProductDialog={
                            handleCloseEditProductDialog
                        }
                    />
                </div>
            </Dialog> */}
        </>
    )
}
