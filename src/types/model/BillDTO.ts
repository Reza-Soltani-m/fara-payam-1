export type BillDTO = {
    id?: string;
    warehouse?: string;
    receiptType?: string;
    receiptDate?: Date;
    warehouseCode?: string;
    serial?: string;
    directReceipt?: boolean;
    referenceNumber?: string;
    requestDate?: Date;
    cotaj?: string;
    requestNumber?: string;
    ship?: string;
    reciever?: string;
    geregorianDate?: Date;
};

export const initialBillDTO = (): BillDTO => {
    return {
        id: undefined,
        warehouse: undefined,
        receiptType: undefined,
        receiptDate: undefined,
        warehouseCode: undefined,
        serial: undefined,
        directReceipt: undefined,
        referenceNumber: undefined,
        requestDate: undefined,
        cotaj: undefined,
        requestNumber: undefined,
        ship: undefined,
        reciever: undefined,
        geregorianDate: undefined,
    };
};
