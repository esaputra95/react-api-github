import { AxiosError } from "axios";
import { service } from "../service";

export const fetchDataUser = async (url:string, queryParam:any) => {
    try {
        const model = await service.get(`${url}`, { params: { ...queryParam }});
        return {
            data : model.data.items,
            error : null,
        }
    } catch (error) {
        return {
            error: error as AxiosError,
            data: []
        }
    }
};

export const fetchDataRepositori = async (url:string) => {
    try {
        const model = await service.get(`${url}`);
        return {
            data : model.data,
            error : null,
        }
    } catch (error) {
        return {
            error: error as AxiosError,
            data: []
        }
    }
};