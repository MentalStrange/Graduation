import { Box, Stack } from "@chakra-ui/react"
import DoctorPanelNavbar from "./DoctorPanelNavbar"
import DoctorPanelWorkingArea from "./DoctorPanelWorkingArea"

function DoctorPanel() {
  return (
    <>
      <Stack>
        <Box m={4}>
        <DoctorPanelNavbar/>
        </Box>
        <hr style={{"padding":0,"margin":0}}/>
        <DoctorPanelWorkingArea/>
      </Stack>
    </>
  )
}

export default DoctorPanel