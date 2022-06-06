import axios from "axios";
import generateError from "./generateError";
import { getToken } from "./tokenUtilities";
const BASE_URL = process.env.REACT_APP_SERVER_URL + '/retas';

export async function createReta(newReta: Reta) {
    try {
        const { data }: { data: { newReta: Reta } } = await axios.post(BASE_URL, { reta: newReta }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return Promise.resolve(data.newReta);
    } catch (error: any) {
        return Promise.reject(generateError(error));
    }
}

export async function getReta(retaId: string) {
    try {
        const { data: { reta } }: { data: { reta: Reta } } = await axios.get(BASE_URL + `/${retaId}`);
        return Promise.resolve(reta);
    } catch (error: any) {
        return Promise.reject(generateError(error));
    }
}

export async function getAllRetas() {
    try {
        let { data: { allRetas } }: { data: { allRetas: Reta[] } } = await axios.get(BASE_URL + '/get_all');
        allRetas = formattedDateRetas(allRetas);
        return Promise.resolve(allRetas);
    } catch (error: any) {
        return Promise.reject(generateError(error));
    }
}

export async function deleteReta(retaId: string) {
    try {
        await axios.delete(BASE_URL, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            data: {
                retaId
            }
        });
        return Promise.resolve(true);
    } catch (error: any) {
        return Promise.reject(generateError(error));
    }
}

export async function updateReta(updatedRetaReq: any, retaId: string) {
    try {
        const {data : {updatedReta}} : { data: { updatedReta : Reta}} = await axios.put(BASE_URL, {retaId, updatedRetaReq }, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        console.log(updatedReta);
        return Promise.resolve(updatedReta);
    } catch (error: any) {
        return Promise.reject(generateError(error));
    }
}

export async function getAllRetasByCategory(category: string) {
    try {
        const { data } = await axios.get(BASE_URL + `/get_all_by_category/${category}`);
        console.log(data);
        return Promise.resolve(formattedDateRetas(data));
    } catch (error: any) {
        return Promise.reject(generateError(error));
    }
}

export async function getRetasBySearchBarQuery(textQuery:string) {
    try {
        const { data } = await axios.get(BASE_URL + `/get_by_query?textQuery=${textQuery}`);
        return Promise.resolve(formattedDateRetas(data));
    } catch (error : any) {
        return Promise.reject(generateError(error));
    }
}

export const formattedDateRetas = (retas: Reta[]) => retas.map(reta => {
    reta.date = new Date(reta.date)
    reta.date.setDate(reta.date.getDate()+1);
    return reta;
});