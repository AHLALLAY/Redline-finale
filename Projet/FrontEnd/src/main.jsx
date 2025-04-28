import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import LoginStaff from './views/auth/LoginStaff.jsx'
import DashboardAdmin from './views/admin/DashboardAdmin.jsx'
import DashboardComptable from './views/comptable/DashboardComptable.jsx'
import DashboardEnseingnant from './views/enseingant/DashboardEnseingnant.jsx'

import ProtecteAdminDashboard from './components/Protectors/ProtecteAdminDashboard.jsx'
import ProtecteEnseignantDashboard from './components/Protectors/ProtecteEnseignantDashboard.jsx'
import ProtecteComptableDashboard from './components/Protectors/ProtecteComptableDashboard.jsx'
import Transaction from './views/comptable/Transaction.jsx'
import StaffListe from './views/admin/StaffListe.jsx'

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
        
        <Route path="/admin/staff" element={
            <ProtecteAdminDashboard>
              <StaffListe />
            </ProtecteAdminDashboard>
          }
        />

        <Route path="/enseignant/dashboard" element={
            <ProtecteEnseignantDashboard>
              <DashboardEnseingnant />
            </ProtecteEnseignantDashboard>
          }
        />
        <Route path="/comptable/dashboard" element={
            <ProtecteComptableDashboard>
              <DashboardComptable />
            </ProtecteComptableDashboard>
          }
        />

        <Route path="/comptable/transaction" element={ <Transaction /> }/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
