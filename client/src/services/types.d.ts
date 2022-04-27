export type User = {
    _id: string,
    username?: string,
    email?: string,
    password?: string,
    name?: string,
    phoneNumber?: string,
    tokens?: string[],
    confirmedRetas?: string[],
    createdAt: string,
    updatedAt: string,
    __v: number 
}

export type Reta = {
    name?: string,
    description?: string;
    date?: Date;
    hours?: number;
    minutes?: number;
    duration?: number;
    location?: string;
    is_private?: boolean;
    min_participants?: number;
    max_participants?: number;
    confirmed_users?: User[] | string[];
    admin?: User;
    is_active?: boolean; 
}

export type LoginResponse = {
    success: boolean,
    message: string, 
    user: User,
    token: string
}