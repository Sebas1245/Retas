import axios from "axios";
import { getToken } from "./tokenUtilities";
import { User, LoginResponse, Reta } from "./types";
const BASE_URL = process.env.SERVER_URL + '/user';

export async function login(username: string, password: string) {
    try {
        const { data } : { data : LoginResponse } = await axios.post(BASE_URL + '/login', {username, password});
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.user._id);
        return Promise.resolve(data.success);
    } catch (error : any) {
        return Promise.reject(error.response.data.message);
    }
}

export async function signup (signupData : User) {
    try {
        const { data } : { data : LoginResponse } = await axios.post(BASE_URL + '/register', {signupData});
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.user._id);
        return Promise.resolve(data.success);
    } catch (error : any) {
        return Promise.reject(error.response.data.message);
    }
}

export async function toggleAttendance(retaId : string) {
    try {
        const { updatedReta } : { updatedReta : Reta } = await axios.put('/toggle_attendance', {retaId}, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return Promise.resolve({success: true, updatedReta});
    } catch (error : any) {
        if (error.response.data.code === 401) {
            return Promise.reject({code: error.response.data.code, msg: error.response.data.message})
        } else {
            return Promise.reject(error.response.data.message);
        }
    }
}

export async function getAllRetasForUser() {
    try {
        const { allRetas } : { allRetas : Reta[] } = await axios.get('/all_retas', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return Promise.resolve(allRetas);
    } catch (error : any) {
        return Promise.reject(error.response.data.message);
    }
}