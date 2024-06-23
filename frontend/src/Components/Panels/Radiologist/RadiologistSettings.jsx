import { useState, useEffect } from 'react';
import {
  Box, FormControl, FormLabel, Input, Button, Textarea, Image, VStack, Spinner, useToast, Icon, Select
} from '@chakra-ui/react';
import { decodeToken } from '../../../../Utils/JWT_Decode';
import api from '../../../Api/Api';
import { useRadiologistState } from '../../../Context/RadiologistContext/RadiologistContext';
import coverImage from '../../../assets/Images/cover.png';
import { MdAddAPhoto } from 'react-icons/md';
import { useImageUpload } from '../../../../Utils/useImageUpload';

function RadiologistSettings() {
  const [radiologistData, setRadiologistData] = useState({});
  const [image, setImage] = useState(null);
  const toast = useToast();

  const token = localStorage.getItem('userToken');
  const decoded = decodeToken(token);

  const { radiologist, loading } = useRadiologistState();

  useEffect(() => {
    if (radiologist) {
      setRadiologistData({
        ...radiologist.data.data,
        firstName: radiologist.data.data.name.split(' ')[0],
        lastName: radiologist.data.data.name.split(' ')[1] || '',
        gender: radiologist.data.data.gender || '',
        age: radiologist.data.data.age || '',
        specialization: radiologist.data.data.specialization || '',
        experience: radiologist.data.data.experience || '',
        startHour: radiologist.data.data.startHour || '',
        endHour: radiologist.data.data.endHour || ''
      });
      setImage(radiologist.data.data.image || 'default-image-url');
    }
  }, [radiologist]);

  const handleChange = (e) => {
    setRadiologistData({
      ...radiologistData,
      [e.target.name]: e.target.value,
    });
  };

  const { fileInputRef, handleImageChange, handleIconClick } = useImageUpload(setImage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...radiologistData,
        name: `${radiologistData.firstName} ${radiologistData.lastName}`,
        image
      };
      await api.patch(`/radiologist/${decoded.id}`, updatedData);
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
              value={radiologistData.firstName || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="lastName"
              value={radiologistData.lastName || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>National ID</FormLabel>
            <Input
              name="nationalId"
              value={radiologistData.nationalId || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              value={radiologistData.phone || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Select
              name="gender"
              value={radiologistData.gender || ''}
              onChange={(e) => setRadiologistData({ ...radiologistData, gender: e.target.value.toLowerCase() })}
              placeholder="Select gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Age</FormLabel>
            <Input
              name="age"
              type="number"
              value={radiologistData.age || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Specialization</FormLabel>
            <Input
              name="specialization"
              value={radiologistData.specialization || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Experience</FormLabel>
            <Textarea
              name="experience"
              value={radiologistData.experience || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Start Hour</FormLabel>
            <Input
              name="startHour"
              value={radiologistData.startHour || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>End Hour</FormLabel>
            <Input
              name="endHour"
              value={radiologistData.endHour || ''}
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

export default RadiologistSettings;
