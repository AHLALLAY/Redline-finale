import Header from '../../components/Comptable/Header';
import Sidebar from '../../components/Comptable/SideBar';
import RecordTable from '../../components/Comptable/RecordTable';
import Footer from '../../components/Comptable/Footer';

function DashboardComptable() {


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6">
                    <div className="bg-white p-4 rounded shadow">
                        <RecordTable />
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}

export default DashboardComptable;
