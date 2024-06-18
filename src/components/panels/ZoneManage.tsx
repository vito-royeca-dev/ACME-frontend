import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Zone } from '../../types';
import ZoneModal from '../modals/ZoneModal';
import { deleteZone, fetchZones } from '../../lib/apis';

const ZoneDataTable: React.FC = () => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [editZone, setEditZone] = useState<Zone | null>(null);
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);

  useEffect(() => {
    getZones();
  }, []);

  const getZones = () => fetchZones(setZones);

  const handleAddZone = () => {
    setEditZone(null);
    setIsZoneModalOpen(true);
  };

  const handleEditZone = (zone: Zone) => {
    setEditZone(zone);
    setIsZoneModalOpen(true);
  };

  const handleDeleteZone = async (id: string) => {
    try {
      await deleteZone(id);
      getZones();
    } catch (error) {
      console.error('Error deleting zone:', error);
    }
  };

  const columns: TableColumn<Zone>[] = [
    { name: 'Center Latitude', selector: row => row.centerLat, sortable: true },
    { name: 'Center Longitude', selector: row => row.centerLng, sortable: true },
    { name: 'Radius', selector: row => row.radius, sortable: true },
    { name: 'Color', selector: row => row.color, sortable: true },
    { name: 'Message', selector: row => row.message, sortable: true },
    { name: 'Credits', selector: row => row.credits, sortable: true },
    {
      name: 'Actions',
      cell: (row: Zone) => (
        <div>
          <button onClick={() => handleEditZone(row)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
          <button onClick={() => handleDeleteZone(row.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Zone Data</h2>
      <button onClick={handleAddZone} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">Add Zone</button>
      <DataTable
        columns={columns}
        data={zones}
        pagination
        highlightOnHover
      />
      <ZoneModal isOpen={isZoneModalOpen} onClose={() => setIsZoneModalOpen(false)} onSave={getZones} zoneToEdit={editZone} />
    </div>
  );
};

export default ZoneDataTable;
