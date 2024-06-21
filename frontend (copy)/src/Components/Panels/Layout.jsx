import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PanelSidebar from './PanelSidebar';
import { useRole } from '../../Context/PanelSidebarContext';
import { Box, Flex } from '@chakra-ui/react';

const Layout = () => {
  const location = useLocation();
  const { setRole } = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (location.pathname.includes('/panel/doctor')) {
      setRole('doctor');
    } else if (location.pathname.includes('/panel/radiologist')) {
      setRole('radiologist');
    } else if (location.pathname.includes('/panel/patient')) {
      setRole('patient');
    } else if (location.pathname.includes('/panel/radiologyCenter')) {
      setRole('radiologyCenter');
    } else if (location.pathname.includes('/panel/receptionist')) {
      setRole('receptionist');
    }
  }, [location.pathname, setRole]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Flex className="app-container">
      <PanelSidebar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />
      <Box flex={1} transition="margin-left 0.3s ease">
        <main className="content-area">
          <Outlet />
        </main>
      </Box>
    </Flex>
  );
};

export default Layout;
