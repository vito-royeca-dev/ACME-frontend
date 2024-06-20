

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
