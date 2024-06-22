/* eslint-disable react/prop-types */
import { Flex, Icon, Stack, Text, Box } from "@chakra-ui/react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { formatDate } from "../../../../Utils/formatDate";

const color=[
  "blue.100",
  "green.100",
  "red.100",
  "orange.100",
]
function RadiologyCenterAppointmentsWorkingArea({ data }) {
  const bgColor = color[Math.floor(Math.random() * color.length)]; // Randomly select background color
  return (
    <Box p={4} bg={bgColor} borderRadius="md" boxShadow="md">
      <Stack>
        <Text fontWeight="bold" m={0} textAlign={"center"}>{data?.patient}</Text>
        <hr style={{"padding":2,"margin":2}}/>
        <Flex align={"center"}>
          <Icon mr={1} as={CalendarMonthIcon} />
          <Text m={0}>{formatDate(data.date)}</Text>
        </Flex>
        <Flex align={"center"}>
          <Icon mr={1} as={AccessAlarmIcon} />
          <Text m={0}>{data.timeSlot}</Text>
        </Flex>
        <Flex align={"center"}>
          <Icon mr={1} as={LocationOnIcon} />
          <Text m={0}>{data.phone}</Text>
        </Flex>
      </Stack>
    </Box>
  );
}

export default RadiologyCenterAppointmentsWorkingArea;
