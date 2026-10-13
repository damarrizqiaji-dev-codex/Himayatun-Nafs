import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickExit } from './components/QuickExit';
import { Home } from './pages/Home';
import { Lapor } from './pages/Lapor';
import { Lacak } from './pages/Lacak';
import { Tentang } from './pages/Tentang';
import { PanduanHub } from './pages/PanduanHub';
import { PetugasLogin } from './pages/PetugasLogin';
import { PetugasDashboard } from './pages/PetugasDashboard';
import { PetugasDetail } from './pages/PetugasDetail';
import { PengawasMonitoring } from './pages/PengawasMonitoring';

const MainAppContent: React.FC = () => {
  const { path } = useRouter();

  // Route matching
  const renderCurrentPage = () => {
    if (path === '/' || path === '') {
      return <Home />;
    }
    if (path === '/panduan' || path.startsWith('/panduan')) {
      return <PanduanHub />;
    }
    if (path === '/lapor') {
      return <Lapor />;
    }
    if (path === '/lacak') {
      return <Lacak />;
    }
    if (path === '/tentang') {
      return <Tentang />;
    }
    if (path === '/petugas/masuk') {
      return <PetugasLogin />;
    }
    if (path === '/petugas') {
      return <PetugasDashboard />;
    }
    if (path.startsWith('/petugas/laporan/')) {
      return <PetugasDetail />;
    }
    if (path === '/pengawas') {
      return <PengawasMonitoring />;
    }

    // Default fallback to Home
    return <Home />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#0b1c30]">
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        {renderCurrentPage()}
      </main>
      <Footer />
      <QuickExit />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <MainAppContent />
    </RouterProvider>
  );
}
