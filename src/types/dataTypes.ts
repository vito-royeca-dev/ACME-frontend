

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
    radius: number;
    color: string;
    message: string;
    visible: boolean;
    credits: number;
}

export interface Message {
    id: string;
    title: string;
    body: string;
    credits: number;
}

export interface LoginFormInputs {
    username: string;
    password: string;
}


export interface User {
    userId: string;
    userName: string;
    userEmail: string;
    userCredits: number;
    totalDistance: number;
    userLocation: {
        longitude: number,
        latitude: number
    }
}