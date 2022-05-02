import axios from "axios";
import generateError from "./generateError";
import { getToken } from "./tokenUtilities";
const BASE_URL = process.env.REACT_APP_SERVER_URL + '/retas';

export async function createReta (newReta : Reta) {
    try {
        const { createdReta } : { createdReta : Reta } = await axios.post(BASE_URL, {reta: newReta}, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return Promise.resolve(createdReta);
    } catch (error : any) {
        return Promise.reject(generateError(error));
    }
}

export async function getReta (retaId : string) {
    try {
        const { data: {reta}}  : {data: { reta: Reta } }  = await axios.get(BASE_URL + `/${retaId}`);
        return Promise.resolve(reta);
    } catch (error : any) {
        return Promise.reject(generateError(error));
    }
}

export async function getAllRetas () {
    try {
        const { allRetas } : { allRetas : Reta[] } = await axios.get(BASE_URL + '/get_all');
        return Promise.resolve(allRetas);
    } catch (error : any) {
        return Promise.reject(generateError(error));
    }
}

export async function deleteReta (retaId : string) {
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
    } catch (error : any) {
        return Promise.reject(generateError(error));
    }
}

export async function updateReta(updatedRetaReq: any) {
    try {
        const { updatedReta } : { updatedReta : Reta } = await axios.put(BASE_URL, {updatedReta: updatedRetaReq}, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return Promise.resolve(updatedReta);
    } catch (error : any) {
        return Promise.reject(generateError(error));
    }
}

export async function getAllRetasByCategory (category : string) {
    try {
        const { retasWithCategory } : { retasWithCategory : Reta[] } = await axios.get(BASE_URL + `/${category}`);
        return Promise.resolve(retasWithCategory);
    } catch (error : any) {
        return Promise.reject(generateError(error));
    }
}