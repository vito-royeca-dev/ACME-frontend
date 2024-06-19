import { Route, NavLink, Routes } from 'react-router-dom';

import AddTunnel from '../components/panels/TunnelManage.tsx';
import AddZone from '../components/panels/ZoneManage.tsx';
import ShowUsers from '../components/panels/ShowUsers.tsx';
import MapPage from '../components/panels/MapBox.tsx';

const AdminDashboard = () => {
  return (
      <div className="flex flex-row bg-gray-100 h-screen">
        <aside className="w-2/12 bg-gray-800 text-white h-screen">
          <div className="p-4">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
          </div>
          <nav className="mt-4">
            <NavLink to="/admin" className="block px-4 py-2 hover:bg-gray-700">
              Show Users
            </NavLink>
            <NavLink to="/admin/tunnel" className="block px-4 py-2 hover:bg-gray-700">
              Tunnels
            </NavLink>
            <NavLink to="/admin/zone" className="block px-4 py-2 hover:bg-gray-700">
              Zones
            </NavLink>
            <NavLink to="/admin/map" className="block px-4 py-2 hover:bg-gray-700">
              MapBox
            </NavLink>
          </nav>
        </aside>
        <main className="w-10/12 p-6 h-full">
          <Routes>
            <Route path="/" element={<ShowUsers />} />
            <Route path="/tunnel" element={<AddTunnel />} />
            <Route path="/zone" element={<AddZone />} />
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </main>
      </div>
  );
};

export default AdminDashboard;