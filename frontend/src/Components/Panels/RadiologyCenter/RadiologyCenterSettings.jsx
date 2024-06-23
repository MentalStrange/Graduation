import { useState, useEffect } from 'react';
import {
  Box, FormControl, FormLabel, Input, Button, VStack, useToast, InputGroup, InputRightElement, Image, Icon, Spinner
} from '@chakra-ui/react';
import { MdAddAPhoto } from 'react-icons/md';
import api from '../../../Api/Api';
import { useRadiologyCenterDispatch, useRadiologyCenterState } from '../../../Context/RadiologyCenterContext/RadiologyCenterContext';
import coverImage from '../../../assets/Images/cover.png';
import { useImageUpload } from '../../../../Utils/useImageUpload';
import defaultImage from './../../../assets/Images/cover2.png'
function RadiologyCenterSettings() {
  const { radiologyCenter, loading } = useRadiologyCenterState();
  const dispatch = useRadiologyCenterDispatch();
  const [radiologyCenterData, setRadiologyCenterData] = useState({});
  const [image, setImage] = useState(null);
  const toast = useToast();
  console.log(radiologyCenter);
  useEffect(() => {
    if (radiologyCenter) {
      setRadiologyCenterData({
        ...radiologyCenter.data,
        firstName: radiologyCenter?.data?.data?.name.split(' ')[0] || '',
        lastName: radiologyCenter?.data?.data?.name.split(' ')[1] || '',
        email: radiologyCenter?.data?.data?.email || '',
        password: radiologyCenter?.data?.data?.password || '',
        phone: radiologyCenter?.data?.data?.phone || '',
        address: radiologyCenter?.data?.data?.address || '',
        startHour: radiologyCenter?.data?.data?.startHour || '',
        endHour: radiologyCenter?.data?.data?.endHour || '',
      });
      setImage(radiologyCenter?.data?.data?.image || defaultImage);
    }
  }, [radiologyCenter]);
  console.log(radiologyCenterData);
  const handleChange = (e) => {
    setRadiologyCenterData({
      ...radiologyCenterData,
      [e.target.name]: e.target.value,
    });
  };

  const { fileInputRef, handleImageChange, handleIconClick } = useImageUpload(setImage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...radiologyCenterData,
        name: `${radiologyCenterData.firstName} ${radiologyCenterData.lastName}`,
        image
      };
      await api.patch(`/radiologyCenter/${radiologyCenterData?.data?.id}`, updatedData);
      toast({
        title: "Settings updated.",
        description: "Radiology center settings have been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      dispatch({ type: 'SET_RADIOLOGY_CENTER', payload: { data: updatedData } });
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: "Unable to update settings.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={4} overflow={'auto'} h={'85vh'}>
      <Box position="relative" mb={16}>
        <Image
          src={coverImage}
          alt="Cover"
          width="100%"
          height="300px"
          objectFit="cover"
        />
        <Box position="absolute" top="220px" left="50%" transform="translateX(-50%)" mb={10}>
          <Image
            src={image || defaultImage }
            alt="Profile"
            boxSize="150px"
            borderRadius="full"
            border="4px solid white"
          />
          <Button position="absolute" bottom="-5px" right="-5px" cursor="pointer" onClick={handleIconClick} bg={'transparent'}>
          <Icon as={MdAddAPhoto} boxSize="1.9em" color="purple.500"  />
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            position="absolute"
            bottom={0}
            right={0}
            opacity={0}
            onChange={handleImageChange}
          />
        </Box>
      </Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              name="firstName"
              value={radiologyCenterData.firstName}
              onChange={handleChange}
              isRequired
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="lastName"
              value={radiologyCenterData.lastName}
              onChange={handleChange}
              isRequired
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={radiologyCenterData.email}
              onChange={handleChange}
              isRequired
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                type="password"
                value={radiologyCenterData.password}
                onChange={handleChange}
                isRequired
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm">
                  Show
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              value={radiologyCenterData.phone}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              value={radiologyCenterData.address}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Start Hour</FormLabel>
            <Input
              name="startHour"
              value={radiologyCenterData.startHour}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>End Hour</FormLabel>
            <Input
              name="endHour"
              value={radiologyCenterData.endHour}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="purple">
            Save Changes
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default RadiologyCenterSettings;
