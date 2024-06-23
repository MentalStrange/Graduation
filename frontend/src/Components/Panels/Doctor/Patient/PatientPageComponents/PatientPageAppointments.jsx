/* eslint-disable react/prop-types */
import { Flex, Icon, Stack, Text, Box } from "@chakra-ui/react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { formatDate } from "../../../../../../Utils/formatDate";

const bgColors = [
  "purple.100",
  "orange.100",
  "green.100",
  "blue.100"
];

function PatientPageAppointments({ appointments }) {
  // Randomize the background color for each appointment
  const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];

  return (
    <Box p={4} bg={randomBgColor} borderRadius="md" boxShadow="md">
      <Stack>
        <Text fontWeight="bold" m={0} textAlign={"center"}>{appointments.user}</Text>
        <hr style={{ padding: 2, margin: 2 }} />
        <Flex align={"center"}>
          <Icon mr={1} as={CalendarMonthIcon} />
          <Text m={0}>{appointments.timeSlot}</Text>
        </Flex>
        <Flex align={"center"}>
          <Icon mr={1} as={AccessAlarmIcon} />
          <Text m={0}>{formatDate(appointments.date)}</Text>
        </Flex>
        <Flex align={"center"}>
          <Icon mr={1} as={LocationOnIcon} />
          <Text m={0}>{appointments.phone}</Text>
        </Flex>
        <Flex align={"center"}>
          <Icon mr={1} as={LocationOnIcon} />
          <Text m={0}>{appointments.status}</Text>
        </Flex>
      </Stack>
    </Box>
  );
}

export default PatientPageAppointments;
