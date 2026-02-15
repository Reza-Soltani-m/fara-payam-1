export type ProductDTO = {
    id?: string;
    productCode?: string;
    productName?: string;
    deliverer?: string;
    delivererName?: string;
    amount?: string;
    shareOfDeduction?: string;
    description?: string;
    requestNumber?: string;
    details2?: string;
};

export const initialProductDTO = (): ProductDTO => {
    return {
        id: undefined,
        productCode: undefined,
        productName: undefined,
        deliverer: undefined,
        delivererName: undefined,
        amount: undefined,
        shareOfDeduction: undefined,
        description: undefined,
        requestNumber: undefined,
        details2: undefined,
    };
};
