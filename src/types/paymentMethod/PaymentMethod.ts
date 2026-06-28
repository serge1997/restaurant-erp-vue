
export enum PaymentMethodEnum {
    CASH = 1,
    DEBIT,
    CREDIT,
    VOUCHER,
    PIX,
}

export const paymentMethodOptions = [
    {value: PaymentMethodEnum.CASH, label: 'dinheiro', icon: 'pi pi-money-bill'},
    {value: PaymentMethodEnum.DEBIT, label: 'debito', icon: 'pi pi-credit-card'},
    {value: PaymentMethodEnum.CREDIT, label: 'credito', icon: 'pi pi-credit-card'},
    {value: PaymentMethodEnum.VOUCHER, label: 'Vaoucher - VA/VR', icon: 'pi pi-credit-card'},
    {value: PaymentMethodEnum.PIX, label: 'pix', icon: 'pi pi-arrow-up-right'}
]