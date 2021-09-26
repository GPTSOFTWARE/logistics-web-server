import { ISaleOrder, SaleOrder } from './../../entity/SaleOrder';
import { IDFORMAT } from './../../utils/constant';

export const mappingEntityToDTO = (data: SaleOrder) => {
    data.id = mappingIdUp(data.id)
    return data;
}
export const mappingDTOToEntity = (data: ISaleOrder) => {
    data.id = mappingIdDown(data.id)
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