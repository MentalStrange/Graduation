import {  useState } from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Heading, Alert, AlertIcon, Spinner } from '@chakra-ui/react';
import WorkingScan from './WorkingScan';
import FinishScan from './FinishScan';
import { decodeToken } from '../../../../../Utils/JWT_Decode';

function RadiologistScans() {
  const [tabIndex, setTabIndex] = useState(0);
  const token = localStorage.getItem('userToken');
  const radiologistId = decodeToken(token).id;
  const { data: scans, loading, error } = useFetch(`http://localhost:5001/api/v1/scan/radiologist/${radiologistId}`);

  if (loading) {
    return <Box p={4}><Spinner /></Box>;
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert status="error">
          <AlertIcon />
          {error.message}
        </Alert>
      </Box>
    );
  }

  if (!scans || !scans.data) {
    return (
      <Box p={4}>
        <Alert status="info">
          <AlertIcon />
          No scans available.
        </Alert>
      </Box>
    );
  }
  const workingScans = scans.data.filter(scan => scan.status === "notReported");
  const completedScans = scans.data.filter(scan => scan.status === "reported");

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Box p={4} overflow={'auto'} h={"85vh"}>
      <Heading as="h1" size="lg" mb={4}>Radiologist Scans</Heading>
      <Tabs index={tabIndex} onChange={handleTabsChange} variant="enclosed">
        <TabList>
          <Tab>Working Scans</Tab>
          <Tab>Finished Scans</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <WorkingScan scans={{ data: workingScans }} loading={loading} error={error} />
          </TabPanel>
          <TabPanel>
            <FinishScan scans={{ data: completedScans }} loading={loading} error={error} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default RadiologistScans;