import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { User } from '../../types/dataTypes';
import { getUsersByDate } from '../../lib/apis';
import socket from '../../socket';
import { CREDIT_UPDATE, LOCATION_UPDATE } from '../../types/eventTypes';
import 'tailwindcss/tailwind.css'; // Ensure you have Tailwind CSS configured
import Th from '../dataTable/Th';
import Td from '../dataTable/Td';

const ShowUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Fetch users when the component mounts and whenever the selected date changes
  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    getUsersByDate(formattedDate, setUsers);
  }, [selectedDate]);

  const creditUpdateListener = (
    { _id, credits }: 
    { 
      _id: string, 
      credits: number 
    }
  ) => {
    console.log("update credit");

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.userId === _id ? { ...user, userCredits: credits } : user
      )
    );
  };
  
  const locationUpdateListener = (
    { userId, location }: 
    { userId: string, 
      location: { 
        longitude: number, 
        latitude: number 
      } 
    }
  ) => {
    console.log("update location");
    
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.userId === userId ? { ...user, userLocation: location } : user
      )
    );
  };

  useEffect(() => {
    socket.on(CREDIT_UPDATE, creditUpdateListener);
    socket.on(LOCATION_UPDATE, locationUpdateListener);

    return () => {
      socket.off(CREDIT_UPDATE, creditUpdateListener);
      socket.off(LOCATION_UPDATE, locationUpdateListener);
    };
  }, [users]);

  // Calculate total number of users
  const totalUsers = users.length;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Total Users: {totalUsers}</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date:
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            if (date) setSelectedDate(date);
          }}
          dateFormat="yyyy-MM-dd"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <Th text='Name'/>
              <Th text='Email'/>
              <Th text='Credits'/>
              <Th text='Distance'/>
              <Th text='Location'/>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.userId} className="transition-all hover:bg-gray-100">
                <Td text={user.userName}/>
                <Td text={user.userEmail}/>
                <Td text={user.userCredits}/>
                <Td text={user.totalDistance}/>
                <Td text={`LNG: ${user.userLocation.longitude.toFixed(2)} | LAT: ${user.userLocation.latitude.toFixed(2)}`}/>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowUsers;