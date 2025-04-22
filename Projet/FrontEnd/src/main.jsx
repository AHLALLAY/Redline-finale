import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import LoginStaff from './views/auth/LoginStaff.jsx'
import DashboardAdmin from './views/admin/DashboardAdmin.jsx'
import ProtecteAdminDashboard from './components/Protectors/ProtecteAdminDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login/staff" element={<LoginStaff />} />
        <Route path="/admin/dashboard" element={
            <ProtecteAdminDashboard>
              <DashboardAdmin />
            </ProtecteAdminDashboard>
          }
        />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
