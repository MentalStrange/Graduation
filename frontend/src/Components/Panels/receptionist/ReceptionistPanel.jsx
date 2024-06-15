import { Box, Flex } from "@chakra-ui/react"
import ReceptionistWorkingArea from "./ReceptionistWorkingArea"
import ReceptionistNavbar from "./ReceptionistNavbar"
import AddNewDoctor from "./AddNewOne/AddNewDoctor"

function ReceptionistPanel() {
  return (
    <Flex direction="column" height="100vh">
      <Box m={4}>
        <ReceptionistNavbar/>
      </Box>
      <hr style={{ padding: 0, margin: 0 }} />
      <Box flex="1" overflow="hidden">
        {/* <ReceptionistWorkingArea/> */}
        <AddNewDoctor/>
      </Box>
    </Flex>
  )
}

export default ReceptionistPanel