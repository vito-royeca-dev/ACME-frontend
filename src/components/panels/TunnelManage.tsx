import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

import { Tunnel } from '../../types/types';
import TunnelModal from '../modals/TunnelModal';
import { deleteTunnel, fetchTunnels } from '../../lib/apis';
import { useAlert } from '../../context/AlertContext';

const TunnelDataTable: React.FC = () => {
  const [tunnels, setTunnels] = useState<Tunnel[]>([]);
  const [editTunnel, setEditTunnel] = useState<Tunnel | null>(null);
  const [isTunnelModalOpen, setIsTunnelModalOpen] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    getTunnels();
  }, []);

  const getTunnels = () => fetchTunnels(setTunnels);

  const handleAddTunnel = () => {
    setEditTunnel(null);
    setIsTunnelModalOpen(true);
  };

  const handleEditTunnel = (tunnel: Tunnel) => {
    setEditTunnel(tunnel);
    setIsTunnelModalOpen(true);
  };

  const handleDeleteTunnel = async (id: string) => {
    try {
      await deleteTunnel(id);
      await getTunnels();
      alert.showAlert("Successfully deleted!", "success");
    } catch (error) {
      console.error('Error deleting tunnel:', error);
    }
  };

  const columns: TableColumn<Tunnel>[] = [
    { name: 'Start Latitude', selector: row => row.startLat, sortable: true },
    { name: 'Start Longitude', selector: row => row.startLng, sortable: true },
    { name: 'End Latitude', selector: row => row.endLat, sortable: true },
    { name: 'End Longitude', selector: row => row.endLng, sortable: true },
    { name: 'Color', selector: row => row.color, sortable: true },
    { name: 'Message', selector: row => row.message, sortable: true },
    { name: 'Credits', selector: row => row.credits, sortable: true },
    {
      name: 'Actions',
      cell: (row: Tunnel) => (
        <div>
          <button onClick={() => handleEditTunnel(row)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
          <button onClick={() => handleDeleteTunnel(row.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tunnel Data</h2>
      <button onClick={handleAddTunnel} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">Add Tunnel</button>
      <DataTable
        columns={columns}
        data={tunnels}
        pagination
        highlightOnHover
      />
      <TunnelModal isOpen={isTunnelModalOpen} onClose={() => setIsTunnelModalOpen(false)} onSave={getTunnels} tunnelToEdit={editTunnel} />
    </div>
  );
};

export default TunnelDataTable;
