import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Stack } from "@chakra-ui/react";
import DoctorPanelNavbar from "./DoctorPanelNavbar";

function DoctorPanel() {
  return (
    <>
      <Stack>
        <Box m={4}>
          <DoctorPanelNavbar />
        </Box>
        <hr style={{ padding: 0, margin: 0 }} />
        <Outlet />
      </Stack>
    </>
  );
}

export default DoctorPanel;