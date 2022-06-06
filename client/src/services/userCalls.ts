import axios from "axios";
import generateError from "./generateError";
import { formattedDateRetas } from "./retaCalls";
import { getToken } from "./tokenUtilities";
const BASE_URL = process.env.REACT_APP_SERVER_URL + '/user';

export async function login (username: string, password: string) {
    try {
        const { data } : { data : LoginResponse } = await axios.post(BASE_URL + '/login', {username, password});
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.user._id);
        sessionStorage.setItem('userName', data.user.name);
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
        const { updatedUser } : { updatedUser : User } = await axios.put(BASE_URL, {updatedUser: updatedUserReq}, {
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
        const { data: {updatedReta, pushed} } : {data: {updatedReta : Reta, pushed : boolean}} = await axios.put(BASE_URL + '/toggle_attendance', {retaId}, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return Promise.resolve({success: true, reta: formattedDateReta(updatedReta), pushed});
    } catch (error : any) {
        if (error.response.data.code === 401) {
            return Promise.reject({code: error.response.data.code, msg: error.response.data.message})
        } else {
            return Promise.reject(generateError(error));
        }
    }
}

export async function getAllRetasForUserAsAdmin() {
    try {
        const {data} = await axios.get(BASE_URL + '/all_retas_as_admin', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return Promise.resolve({retasAsAdmin: formattedDateRetas(data)});
    } catch (error : any) {
        return Promise.reject(generateError(error));
    }
}

export async function getAllRetasForUserAsParticipant() {
    try {
        const {data } = await axios.get(BASE_URL + '/all_retas_as_participant', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return Promise.resolve({retasAsParticipant: formattedDateRetas(data)});
    } catch (error : any) {
        return Promise.reject(generateError(error));
    }
}

export async function isUserInReta(retaId:string) {
    try {
        const { data : {inReta}} : { data: {inReta: boolean}} = await axios.get(BASE_URL + '/is_user_in_reta/' + retaId, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return Promise.resolve(inReta);
    } catch (error) {
        return Promise.reject(generateError(error));
    }
    

}

export async function getLoggedInUser() {
    try {
        const {data} = await axios.get(BASE_URL + '/get_logged_in_user/', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(generateError(error));
    }
}

const formattedDateReta = (reta : Reta) => {
    reta.date = new Date(reta.date)
    reta.date.setDate(reta.date.getDate()+1);
    return reta;
};