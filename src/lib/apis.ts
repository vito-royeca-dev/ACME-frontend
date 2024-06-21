import { Dispatch, SetStateAction } from "react";
import Axios from "axios";

import { Tunnel, Zone, LoginFormInputs } from "../types/types";
import { BACKEND_URL, MAP_PK_TOKEN } from "../constants";

const instance = Axios.create({
    baseURL: BACKEND_URL,
})

// Function to get admin token
const getAdminToken = () => {
    // Logic to retrieve the admin token, e.g., from localStorage
    const adminToken = localStorage.getItem('token');
    return adminToken;
}

// Add a request interceptor to include the admin token in all requests
instance.interceptors.request.use(config => {
    const adminToken = getAdminToken();
    
    if (adminToken) {
        config.headers['authorization'] = adminToken;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use((res, err) => {
    if (err.response?.data?.message === "Unauthorized: Invalid token") {
        localStorage.removeItem('token');
    }
    return Promise.reject(err);
});

export const login = async (data: LoginFormInputs) => {
    return await instance.post('/api/admin/login', data);
}

export const fetchTunnels = async (callback: Dispatch<SetStateAction<Tunnel[]>>) => {
    try {
      const response = await instance.get('/api/tunnels');
      callback(ProcessedRecords<{ _id: string }, Tunnel>(response.data));
    } catch (error) {
      console.error('Error fetching tunnels:', error);
    }
};

export const putTunnel = async (data: Tunnel) => {
    return await instance.put(`/api/tunnels/${data.id}`, data);
}

export const postTunnel = async (data: Tunnel) => {
    return await instance.post('/api/tunnels', data);
}

export const deleteTunnel = async (id: string) => {
    await instance.delete(`/api/tunnels/${id}`);
}

export const fetchZones = async (callback: Dispatch<SetStateAction<Zone[]>>) => {
    try {
      const response = await instance.get('/api/zones');
      callback(ProcessedRecords<{ _id: string }, Zone>(response.data));
    } catch (error) {
      console.error('Error fetching zones:', error);
    }
};

export const putZone = async (data: Zone) => {
    return await instance.put(`/api/zones/${data.id}`, data);
}

export const postZone = async (data: Zone) => {
    return await instance.post('/api/zones', data);
        
}

export const deleteZone = async (id: string) => {
    return await instance.delete(`/api/zones/${id}`);
}

export const ProcessedRecords = <F extends Record<string, unknown>, T>(records: F[]): T[] => {
    return records.map((record) => {
        let resRecord: Partial<T> = {};
        Object.entries(record).forEach(([key, value]) => {
            if (key === "_id") {
                resRecord['id' as keyof T] = value as T[keyof T];
            } else {
                resRecord[key as keyof T] = value as T[keyof T];
            }
        });
        return resRecord as T;
    })
}

export const getRoute = async (startCoords: [number, number], endCoords: [number, number]) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${String(startCoords[0])},${String(startCoords[1])};${String(endCoords[0])},${String(endCoords[1])}?geometries=geojson&access_token=${MAP_PK_TOKEN}`;
  
    try {
      const response = await fetch(url);
      const json = await response.json();
  
      return json.routes[0]?.geometry?.coordinates;
    } catch (error) {
      console.log('Error fetching route:', error);
      return [];
    }
};

export const checkRoute = async (startCoords: [number, number], endCoords: [number, number]) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${String(startCoords[0])},${String(startCoords[1])};${String(endCoords[0])},${String(endCoords[1])}?geometries=geojson&access_token=${MAP_PK_TOKEN}`;
  
    try {
      const response = await fetch(url);
      const json = await response.json();
        console.log(JSON.stringify(json));
        
      return json.code === "Ok";
    } catch (error) {
      console.log('Error fetching route:', error);
      return [];
    }
};
  
export const fetchUsers = async (callback: Dispatch<SetStateAction<Tunnel[]>>) => {
    try {
      const response = await instance.get('/api/tunnels');
      callback(ProcessedRecords<{ _id: string }, Tunnel>(response.data));
    } catch (error) {
      console.error('Error fetching tunnels:', error);
    }
};