import { data } from "react-router-dom";
import axiousInstance from "./axiousInstance";

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    name: string,
    email: string,
    password: string,
}

export const login = async (data: LoginDto) => {
    const response = await axiousInstance.post('auth/login', data);
    return response.data;
};

export const register = async (data: RegisterDto) => {
    const response = await axiousInstance.post('/auth/register', data)
    return response.data;
};
