import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import LoginStaff from './views/auth/LoginStaff.jsx'
import LoginStudent from './views/auth/LoginStudent.jsx'
import DashboardAdmin from './views/admin/DashboardAdmin.jsx'
import DashboardComptable from './views/comptable/DashboardComptable.jsx'
import DashboardEnseingnant from './views/enseingant/DashboardEnseingnant.jsx'

import ProtecteAdminDashboard from './components/Protectors/ProtecteAdminDashboard.jsx'
import ProtecteEnseignantDashboard from './components/Protectors/ProtecteEnseignantDashboard.jsx'
import ProtecteComptableDashboard from './components/Protectors/ProtecteComptableDashboard.jsx'
import Transaction from './views/comptable/Transaction.jsx'
import StaffListe from './views/admin/StaffListe.jsx'
import StudentListe from './views/admin/StudentListe.jsx'
import Register from './views/auth/register.jsx'
import StudentDashboard from './views/Student/Student_dashboard.jsx'
import StudentDetails from './views/admin/StudentDetails.jsx'
import Finance from './views/admin/Finance.jsx'
import NotFound from './components/404/NotFound.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/404" element={<NotFound />}/>
        <Route path="/login/staff" element={<LoginStaff />} />
        <Route path="/login/student" element={<LoginStudent />} />
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
        <Route path="/admin/students" element={
          <ProtecteAdminDashboard>
            <StudentListe />
          </ProtecteAdminDashboard>
        }
        />
        <Route path="/admin/finance" element={
          <ProtecteAdminDashboard>
            <Finance />
          </ProtecteAdminDashboard>
        }
        />
        <Route path="/admin/students/:id" element={
          <ProtecteAdminDashboard>
            <StudentDetails />
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

        <Route path="/register" element={<Register />} />
        <Route path="/comptable/transaction" element={<Transaction />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
)
