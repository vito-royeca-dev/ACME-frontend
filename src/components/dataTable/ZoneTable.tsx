import React, { useEffect, useState } from 'react';

import { Zone } from '../../types/types';
import DataTable from './index';
import ZoneModal from '../modals/ZoneModal';
import { deleteZone, fetchZones } from '../../lib/apis';

const ZoneTable: React.FC = () => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getZones();
  }, []);

  const getZones = async () => {
    try {
      fetchZones(setZones);
    } catch (error) {
      console.error('Error fetching zones:', error);
    }
  };

  const handleEdit = (zone: Zone) => {
    setSelectedZone(zone);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteZone(id);
      getZones();
    } catch (error) {
      console.error('Error deleting zone:', error);
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
    getZones();
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Add Zone</button>
      <DataTable<Zone>
        data={zones}
        columns={[
          { key: 'centerLat', label: 'Center Latitude' },
          { key: 'centerLng', label: 'Center Longitude' },
          { key: 'radius', label: 'Radius' },
          { key: 'color', label: 'Color' },
          { key: 'message', label: 'Message' },
          { key: 'credits', label: 'Credits' },
          { key: 'visible', label: 'Visible' },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {isModalOpen && (
        <ZoneModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          zoneToEdit={selectedZone}
        />
      )}
    </div>
  );
};

export default ZoneTable;
