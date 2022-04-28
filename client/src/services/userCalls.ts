import axios from "axios";
import generateError from "./generateError";
import { getToken } from "./tokenUtilities";
const BASE_URL = process.env.SERVER_URL + '/user';

export async function login (username: string, password: string) {
    try {
        const { data } : { data : LoginResponse } = await axios.post(BASE_URL + '/login', {username, password});
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.user._id);
        return Promise.resolve(data.success);
    } catch (error : any) {
        return Promise.reject(generateError(error));
    }
}

export async function signup (
    username : string, 
    email : string, 
    password: string, 
    confirmPassword : string, 
    name : string, 
    phoneNumber : string ) {
        const signupData = {
            username, 
            email, 
            password, 
            confirmPassword, 
            name, 
            phoneNumber
        };
        try {
            const { data } : { data : LoginResponse } = await axios.post(BASE_URL + '/register', signupData);
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('userId', data.user._id);
            return Promise.resolve(data.success);
        } catch (error : any) {
            return Promise.reject(generateError(error));
        }
}

export async function updateUser (updatedUserReq: any) {
    try {
        const { updatedUser } : { updatedUser : User } = await axios.put(BASE_URL, updatedUserReq, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return Promise.resolve(updatedUser); 
    } catch (error : any) {
        return Promise.reject(generateError(error));
    }
}

export async function toggleAttendance (retaId : string) {
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
            return Promise.reject(generateError(error));
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
        return Promise.reject(generateError(error));
    }
}