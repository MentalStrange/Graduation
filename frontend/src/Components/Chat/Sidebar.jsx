/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Box, Heading, Input } from '@chakra-ui/react';
import api from '../../Api/Api';
import { decodeToken } from '../../../Utils/JWT_Decode';
import ChatMessageList from './ChatMessageList';

const Sidebar = ({ onContactClick }) => {
  const [contacts, setContacts] = useState([]);
  const token = localStorage.getItem('userToken');
  const userRole = decodeToken(token).role;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        let response;
        if (userRole === 'patient') {
          response = await api.get('/doctor');
        } else if (userRole === 'doctor') {
          response = await api.get('/patient');
        }
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, [userRole]);

  return (
    <Box className="sidebar-container" p={0} border={0} >
      <Heading as="h1" size="lg" ml={2}>Messages</Heading>
      <Box display="flex" alignItems="center">
        <Input placeholder="Search" mx={2} mb={4} />
      </Box>
      <ChatMessageList contacts={contacts} onContactClick={onContactClick} />
    </Box>
  );
};

export default Sidebar;
