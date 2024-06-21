// DoctorPanel.jsx
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import { Box, Stack, Spinner } from "@chakra-ui/react";

// Lazy load the Navbar
const DoctorPanelNavbar = lazy(() => import("./DoctorPanelNavbar"));

function DoctorPanel() {
  return (
    <Suspense fallback={<Spinner size="xl" />}>
      <Stack>
        <Box m={4}>
          <DoctorPanelNavbar />
        </Box>
        <hr style={{ padding: 0, margin: 0 }} />
          <Outlet />
      </Stack>
    </Suspense>
  );
}

export default DoctorPanel;
