import React, { useEffect, useState } from 'react';

import { Tunnel } from '../../types/types';
import DataTable from './index';
import TunnelModal from '../modals/TunnelModal';
import { deleteTunnel, fetchTunnels } from '../../lib/apis';

const TunnelTable: React.FC = () => {
  const [tunnels, setTunnels] = useState<Tunnel[]>([]);
  const [selectedTunnel, setSelectedTunnel] = useState<Tunnel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getTunnels();
  }, []);

  const getTunnels = async () => {
    try {
      fetchTunnels(setTunnels);
    } catch (error) {
      console.error('Error fetching tunnels:', error);
    }
  };

  const handleEdit = (tunnel: Tunnel) => {
    setSelectedTunnel(tunnel);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTunnel(id);
      getTunnels();
    } catch (error) {
      console.error('Error deleting tunnel:', error);
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
    getTunnels();
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Add Tunnel</button>
      <DataTable<Tunnel>
        data={tunnels}
        columns={[
          { key: 'startLat', label: 'Start Latitude' },
          { key: 'startLng', label: 'Start Longitude' },
          { key: 'endLat', label: 'End Latitude' },
          { key: 'endLng', label: 'End Longitude' },
          { key: 'color', label: 'Color' },
          { key: 'opacity', label: 'Opacity' },
          { key: 'message', label: 'Message' },
          { key: 'credits', label: 'Credits' },
          { key: 'visible', label: 'Visible' },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {isModalOpen && (
        <TunnelModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          tunnelToEdit={selectedTunnel}
        />
      )}
    </div>
  );
};

export default TunnelTable;