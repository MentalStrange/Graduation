import { useState, useEffect } from 'react';
import {
  Box, FormControl, FormLabel, Input, Button, Textarea, Image, VStack, Spinner, useToast, Icon, Select, InputGroup, InputRightElement
} from '@chakra-ui/react';
import { decodeToken } from '../../../../Utils/JWT_Decode';
import api from '../../../Api/Api';
import { useDoctorState } from '../../../Context/DoctorContext/DoctorContext';
import coverImage from '../../../assets/Images/cover.png'; // Add your cover image here
import { MdAddAPhoto } from 'react-icons/md';
import { useImageUpload } from '../../../../Utils/useImageUpload'; // Import the utility function

function DoctorSettings() {
  const [doctorData, setDoctorData] = useState({});
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const token = localStorage.getItem('userToken');
  const decoded = decodeToken(token);

  const { doctor, loading } = useDoctorState();

  useEffect(() => {
    if (doctor) {
      setDoctorData({
        ...doctor.data.data,
        firstName: doctor.data.data.name.split(' ')[0],
        lastName: doctor.data.data.name.split(' ')[1] || '',
        gender: doctor.data.data.gender || '',
        password: doctor.data.data.password || ''
      });
      setImage(doctor.data.data.image || 'default-image-url');
    }
  }, [doctor]);

  const handleChange = (e) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value,
    });
  };

  const { fileInputRef, handleImageChange, handleIconClick } = useImageUpload(setImage); // Use the utility function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...doctorData,
        name: `${doctorData.firstName} ${doctorData.lastName}`,
        image
      };
      await api.patch(`/doctor/${decoded.id}`, updatedData);
      toast({
        title: "Profile updated.",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: "Unable to update profile.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={4} overflow={'auto'} h={'85vh'}>
      <Box position="relative" mb={6}>
        <Image
          src={coverImage}
          alt="Cover"
          width="100%"
          height="300px"
          objectFit="cover"
        />
        <Box position="absolute" top="220px" left="50%" transform="translateX(-50%)">
          <Image
            src={image || 'default-image-url'}
            alt="Profile"
            boxSize="150px"
            borderRadius="full"
            border="4px solid white"
          />
          <Icon as={MdAddAPhoto} boxSize="1.5em" color="purple.500" position="absolute" bottom="5px" right="5px" cursor="pointer" onClick={handleIconClick} />
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
          <FormControl mt={12}>
            <FormLabel>First Name</FormLabel>
            <Input
              name="firstName"
              value={doctorData.firstName || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="lastName"
              value={doctorData.lastName || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>National ID</FormLabel>
            <Input
              name="nationalId"
              value={doctorData.nationalId || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              value={doctorData.phone || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Select
              name="gender"
              value={doctorData.gender || ''}
              onChange={(e) => setDoctorData({ ...doctorData, gender: e.target.value.toLowerCase() })}
              placeholder="Select gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={doctorData.password || ''}
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Specialization</FormLabel>
            <Input
              name="specialization"
              value={doctorData.specialization || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea
              name="bio"
              value={doctorData.bio || ''}
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

export default DoctorSettings;
