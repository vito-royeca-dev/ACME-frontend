import { useEffect, useState } from "react";
import { User } from "../types/types";
import { USER_CREDIT_UPDATE, USER_LOCATION_UPDATE } from "../types/eventTyeps";
import socket from "../socket";

export const useUserData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [date, setDate] = useState<string>("");

  useEffect(() => {

  }, []);

  useEffect(() => {
    // Listen for real-time updates
    socket.on(USER_LOCATION_UPDATE, (updatedUser: {_id: string, location: {longitude: number, latitude: number}}) => {
      setUsers((prevUsers) => 
        prevUsers.map((user) => user._id === updatedUser._id ? {
          ...user,
          ...updatedUser.location
        } : user)
      );
    });

    socket.on(USER_CREDIT_UPDATE, (updatedUser: User) => {
      setUsers((prevUsers) => 
        prevUsers.map(user => user._id === updatedUser._id ? updatedUser : user)
      );
    });

    socket.on('user-distance-update', (updatedUser: User) => {
      setUsers((prevUsers) => 
        prevUsers.map(user => user._id === updatedUser._id ? updatedUser : user)
      );
    });

  });
}