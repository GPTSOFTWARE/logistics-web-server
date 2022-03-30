import { IDFORMAT } from './../../utils/constant';
import { DeliveryOrder } from './../../entity/DeliveryOrder';

export const mappingEntityToDTO = (data: DeliveryOrder) => {
    data.saleOrderId = mappingIdUp(data.saleOrderId)
    return data;
}
export const mappingDTOToEntity = (data: DeliveryOrder) => {
    data.saleOrderId = mappingIdDown(data.saleOrderId)
    return data;
}

export const mappingIdDown = (id: any) => {
    const idFormat: number = id - IDFORMAT;
    return idFormat;
}
export const mappingIdUp = (id: any) => {
    const idFormat: number = id + IDFORMAT;
    return idFormat;
}