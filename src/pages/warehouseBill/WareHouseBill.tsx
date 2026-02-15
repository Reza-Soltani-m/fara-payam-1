import { Dialog, Grid, Slide } from '@mui/material'
import { type MRT_ColumnDef } from 'material-react-table'
import { Button, Tooltip, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useMemo, useState } from 'react'
import { CustomDataTable } from 'components'
import type { BillDTO } from 'types'
import AddEditWareHouseBill from './addEditWarehouse/AddEditWareHouseBill'
import { type TransitionProps } from '@mui/material/transitions'
import React from 'react'
import { formatDate } from 'jalaliday/intl'
import dayjs from 'dayjs'
import { getShipLabelByValue } from '../../const/enum'
import { getBillLabelByValue } from '../../const/enum/BillEnum'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction='up' ref={ref} {...props} />
})

export default function WareHouseBill() {
    const columns = useMemo<MRT_ColumnDef<BillDTO>[]>(
        () => [
            { accessorKey: 'warehouse', header: 'انبار' },
            {
                accessorKey: 'receiptType',
                header: 'نوع رسید',
                Cell: ({ row }) =>
                    row?.original?.ship && getBillLabelByValue(row?.original?.receiptType),
            },
            {
                accessorKey: 'receiptDate',
                header: 'تاریخ رسید',
                Cell: ({ row }) =>
                    row?.original?.receiptDate && (
                        <span style={{ direction: 'ltr' }}>
                            {formatDate(row?.original?.receiptDate, 'YYYY/MM/DD HH:mm')}
                        </span>
                    ),
            },
            { accessorKey: 'warehouseCode', header: 'کد انبار' },
            { accessorKey: 'serial', header: 'سریال' },
            { accessorKey: 'directReceipt', header: 'رسید مستقیم' },
            { accessorKey: 'referenceNumber', header: 'شماره ارجاع' },
            {
                accessorKey: 'requestDate',
                header: 'تاریخ درخواست',
                Cell: ({ row }) =>
                    row?.original?.requestDate && formatDate(row?.original?.requestDate),
            },
            { accessorKey: 'cotaj', header: 'کواتاژ' },
            { accessorKey: 'requestNumber', header: 'شماره درخواست' },
            {
                accessorKey: 'ship',
                header: 'کشتی',
                Cell: ({ row }) => row?.original?.ship && getShipLabelByValue(row?.original?.ship),
            },
            { accessorKey: 'reciever', header: 'تحویل گیرنده' },
            {
                accessorKey: 'geregorianDate',
                header: 'تاریخ میلادی',
                Cell: ({ row }) =>
                    row?.original?.requestDate &&
                    dayjs(row?.original?.requestDate).format('YYYY/MM/DD'),
            },
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
                                onClick={() => setModelId(row.original.id)}
                            >
                                <EditIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='حذف' arrow>
                            <IconButton
                                color='error'
                                size='small'
                                onClick={() => onDeleteBillHandler(row.original)}
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

    const [modelId, setModelId] = useState<undefined | string>(undefined)

    const convertJson = () => {
        const values = localStorage.getItem('data')

        if (!values) return []

        return JSON.parse(values).map((item: any) => ({
            ...item,
            receiptDate: item.receiptDate != null ? new Date(item.receiptDate) : undefined,
            requestDate: item.requestDate != null ? new Date(item.requestDate) : undefined,
            geregorianDate: item.geregorianDate != null ? new Date(item.geregorianDate) : undefined,
        }))
    }
    const [data, setData] = useState<BillDTO[]>(convertJson)

    const onDeleteBillHandler = (bill: any) => {
        const newData = data.filter((item) => item.id != bill.id)

        localStorage.setItem('data', JSON.stringify(newData))

        setData(newData)
    }

    const handleClose = (refresh: boolean) => {
        if (refresh) {
            setData(convertJson)
        }
        setModelId(undefined)
    }

    return (
        <>
            <Grid className='w-full'>
                <div className='flex'>
                    <div className='w-1/6'>
                        <Button
                            variant='contained'
                            className='w-full'
                            onClick={() => setModelId('-1')}
                        >
                            افزودن
                        </Button>
                    </div>
                </div>

                <div className='grid grid-cols-4 gap-4'></div>

                <CustomDataTable
                    columns={columns}
                    data={data ?? []}
                    muiTableBodyRowProps={({ row }) => ({
                        onDoubleClick: (event: any) => setModelId(row?.original.id),

                        sx: {
                            cursor: 'pointer',
                        },
                    })}
                />

                <Dialog
                    fullScreen
                    open={!!modelId}
                    onClose={() => handleClose(false)}
                    slots={{
                        transition: Transition,
                    }}
                    sx={{
                        display: 'inline-block',
                    }}
                >
                    <div className='block mb-[80px]'>
                        <AddEditWareHouseBill handleClose={handleClose} modelId={modelId} />
                    </div>
                </Dialog>
            </Grid>
        </>
    )
}
