

export interface Tunnel {
    id: string;
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    color: string;
    opacity: number,
    message: string;
    visible: boolean;
    credits: number;
}
export interface User {
    _id: string,
    email: string,
    location: {
        longitude: number,
        latitude: number,
    },
    credit: number,
    distance: number | null,
}

export interface Zone {
    id: string;
    centerLat: number;
    centerLng: number;
    radius: string;
    color: string;
    message: string;
    visible: boolean;
    credits: number;
}

export interface LoginFormInputs {
    username: string;
    password: string;
}
