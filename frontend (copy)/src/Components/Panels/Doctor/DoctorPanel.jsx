import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import { Box, Stack, Spinner } from "@chakra-ui/react";
import DoctorPanelWorkingArea from "./DoctorPanelWorkingArea";
import DoctorAppointmentsProvider from "../../../Context/DoctorContext/DoctorAppointmentsContext";
import { DoctorPatientProvider } from "../../../Context/DoctorContext/DoctorPatientsContext";
import { DoctorReportsProvider } from "../../../Context/DoctorContext/DoctorReportsContext";
import { DoctorPrescriptionsProvider } from "../../../Context/DoctorContext/DoctorPrescriptionsContext";
import { DoctorScansProvider } from "../../../Context/DoctorContext/DoctorScansContext";
import { DoctorContext, DoctorProvider } from "../../../Context/DoctorContext/DoctorContext";
import { AuthProvider } from "../../../Context/AuthenticationContext";

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
        <DoctorAppointmentsProvider>
          <DoctorPatientProvider>
            <DoctorReportsProvider>
              <DoctorPrescriptionsProvider>
                <DoctorScansProvider>
                  <DoctorAppointmentsProvider>
                    <DoctorProvider>
                        <DoctorPanelWorkingArea />
                    </DoctorProvider>
                  </DoctorAppointmentsProvider>
                </DoctorScansProvider>
              </DoctorPrescriptionsProvider>
            </DoctorReportsProvider>
          </DoctorPatientProvider>
        </DoctorAppointmentsProvider>
        <Outlet />
      </Stack>
    </Suspense>
  );
}

export default DoctorPanel;
