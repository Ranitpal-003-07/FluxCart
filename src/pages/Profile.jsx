/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  IconButton,
  Input,
  useColorModeValue,
  useColorMode,
  Container,
  Flex,
  Button,
  useToast,
  Card,
  CardBody,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Spinner,
  Badge,
  Divider,
} from '@chakra-ui/react';
import {
  EditIcon,
  CheckIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  CalendarIcon,
  EmailIcon,
} from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext'; // Adjust import path as needed

const Profile = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser, updateUserProfile } = useAuth();
  
  // Profile data state
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatar: '',
    authProvider: '',
    createdAt: null,
    uid: '',
  });
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Edit states
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [tempAvatar, setTempAvatar] = useState('');

  // Theme colors
  const bgGradient = useColorModeValue(
    'linear(135deg, blue.50 0%, purple.50 25%, pink.50 50%, orange.50 75%, yellow.50 100%)',
    'linear(135deg, blue.900 0%, purple.900 25%, pink.900 50%, orange.900 75%, yellow.900 100%)'
  );
  
  const cardBg = useColorModeValue(
    'rgba(255, 255, 255, 0.8)',
    'rgba(26, 32, 44, 0.8)'
  );
  
  const borderColor = useColorModeValue(
    'rgba(255, 255, 255, 0.2)',
    'rgba(255, 255, 255, 0.1)'
  );
  
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  
  const glowColor = useColorModeValue(
    '0 0 20px rgba(99, 102, 241, 0.3)',
    '0 0 20px rgba(139, 92, 246, 0.4)'
  );

  // Format date helper
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    
    let date;
    if (timestamp.toDate) {
      // Firestore timestamp
      date = timestamp.toDate();
    } else if (timestamp.seconds) {
      // Firestore timestamp object
      date = new Date(timestamp.seconds * 1000);
    } else {
      // Regular date
      date = new Date(timestamp);
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Set profile from auth context and user data
  useEffect(() => {
    if (currentUser) {
      setProfile({
        name: currentUser.displayName || currentUser.name || 'Ranit Pal',
        email: currentUser.email || 'ranitpal699@gmail.com',
        avatar: currentUser.photoURL || 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        authProvider: currentUser.authProvider || 'google',
        createdAt: currentUser.createdAt || new Date('2025-05-28T13:37:22.000Z'),
        uid: currentUser.uid || '190uRP4LWHMgAaKDOZU28qnNmq23',
      });
      setLoading(false);
    }
  }, [currentUser]);

  const handleEdit = (field, value) => {
    setEditField(field);
    setTempValue(value);
  };

  const handleSave = async (field) => {
    if (!tempValue.trim()) return;
    
    setUpdating(true);
    try {
      let updateData = {};
      
      if (field === 'name') {
        updateData = { displayName: tempValue, name: tempValue };
      }
      // Note: Changing email requires re-authentication in Firebase
      // else if (field === 'email') {
      //   updateData = { email: tempValue };
      // }
      
      await updateUserProfile(updateData);
      
      setProfile(prev => ({ ...prev, [field]: tempValue }));
      
      toast({
        title: 'Profile Updated',
        description: `${field === 'name' ? 'Display name' : 'Email'} has been updated successfully.`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setEditField(null);
      setTempValue('');
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditField(null);
    setTempValue('');
  };

  const handleAvatarSave = async () => {
    if (!tempAvatar.trim()) return;
    
    setUpdating(true);
    try {
      await updateUserProfile({ photoURL: tempAvatar });
      
      setProfile(prev => ({ ...prev, avatar: tempAvatar }));
      
      toast({
        title: 'Profile Picture Updated',
        description: 'Your profile picture has been updated successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setTempAvatar('');
      onClose();
      setUpdating(false);
    }
  };

  const handleAvatarOpen = () => {
    setTempAvatar(profile.avatar);
    onOpen();
  };

  const getProviderColor = (provider) => {
    switch (provider.toLowerCase()) {
      case 'google':
        return 'red';
      case 'facebook':
        return 'blue';
      case 'twitter':
        return 'twitter';
      case 'github':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const EditableField = ({ field, value, placeholder }) => {
    const isEditing = editField === field;
    
    return (
      <HStack spacing={3} align="center" w="full">
        {isEditing ? (
          <>
            <Input
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              placeholder={placeholder}
              size="lg"
              bg={useColorModeValue('white', 'gray.700')}
              border="2px solid"
              borderColor="blue.400"
              focusBorderColor="purple.400"
              _focus={{ boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.6)' }}
              autoFocus
              flex={1}
              isDisabled={updating}
            />
            <HStack>
              <IconButton
                icon={updating ? <Spinner size="sm" /> : <CheckIcon />}
                size="md"
                colorScheme="green"
                onClick={() => handleSave(field)}
                aria-label="Save"
                isDisabled={updating}
              />
              <IconButton
                icon={<CloseIcon />}
                size="md"
                colorScheme="red"
                onClick={handleCancel}
                aria-label="Cancel"
                isDisabled={updating}
              />
            </HStack>
          </>
        ) : (
          <>
            <Text flex={1} color={textColor} fontSize="lg" fontWeight="medium">
              {value}
            </Text>
            <IconButton
              icon={<EditIcon />}
              size="md"
              variant="ghost"
              colorScheme="blue"
              onClick={() => handleEdit(field, value)}
              aria-label={`Edit ${field}`}
              opacity={0.7}
              _hover={{ opacity: 1, transform: 'scale(1.1)' }}
              transition="all 0.2s"
              isDisabled={updating || loading}
            />
          </>
        )}
      </HStack>
    );
  };

 

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      position="relative"
      overflow="hidden"
    >
      {/* Animated background elements */}
      <Box
        position="absolute"
        top="10%"
        left="10%"
        w="300px"
        h="300px"
        borderRadius="full"
        bg={useColorModeValue('rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)')}
        filter="blur(40px)"
        animation="float 6s ease-in-out infinite"
        css={{
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      />
      <Box
        position="absolute"
        bottom="10%"
        right="10%"
        w="200px"
        h="200px"
        borderRadius="full"
        bg={useColorModeValue('rgba(236, 72, 153, 0.1)', 'rgba(236, 72, 153, 0.1)')}
        filter="blur(40px)"
        animation="float 8s ease-in-out infinite reverse"
      />

      <Container maxW="4xl" py={12}>
        <Flex justify="flex-end" mb={8}>
          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="lg"
            color={textColor}
            _hover={{ 
              bg: useColorModeValue('whiteAlpha.200', 'whiteAlpha.200'),
              transform: 'scale(1.1)'
            }}
            transition="all 0.2s"
            aria-label="Toggle color mode"
          />
        </Flex>

        <Flex justify="center">
          <Card
            bg={cardBg}
            backdropFilter="blur(20px)"
            border="1px solid"
            borderColor={borderColor}
            boxShadow={glowColor}
            overflow="hidden"
            maxW="600px"
            w="full"
            transition="all 0.3s ease"
            _hover={{
              transform: 'translateY(-5px)',
              boxShadow: `${glowColor}, 0 12px 30px -8px rgba(0, 0, 0, 0.2)`,
            }}
          >
            <CardBody p={12}>
              <VStack spacing={10} align="center">
                {/* Profile Avatar Section */}
                <Box position="relative">
                  <Avatar
                    size="2xl"
                    src={profile.avatar}
                    name={profile.name}
                    border="4px solid"
                    borderColor="blue.400"
                    boxShadow="0 0 30px rgba(59, 130, 246, 0.6)"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'scale(1.05)',
                      boxShadow: "0 0 40px rgba(59, 130, 246, 0.8)"
                    }}
                    w="150px"
                    h="150px"
                  />
                  <IconButton
                    icon={<EditIcon />}
                    size="md"
                    borderRadius="full"
                    position="absolute"
                    bottom={2}
                    right={2}
                    colorScheme="blue"
                    onClick={handleAvatarOpen}
                    aria-label="Change avatar"
                    boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
                    _hover={{
                      transform: 'scale(1.1)',
                      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.4)"
                    }}
                    transition="all 0.2s"
                    isDisabled={updating}
                  />
                </Box>

                {/* Profile Information Section */}
                <VStack spacing={8} w="full" align="stretch">
                  <Heading size="lg" color={textColor} textAlign="center" mb={4}>
                    Profile Information
                  </Heading>

                  <Box w="full">
                    <Text fontSize="md" color={mutedColor} mb={3} fontWeight="semibold">
                      Full Name
                    </Text>
                    <EditableField
                      field="name"
                      value={profile.name}
                      placeholder="Enter your full name"
                    />
                  </Box>

                  <Box w="full">
                    <Text fontSize="md" color={mutedColor} mb={3} fontWeight="semibold">
                      Email Address
                    </Text>
                    <HStack spacing={3} align="center" w="full">
                      <EmailIcon color={mutedColor} />
                      <Text flex={1} color={textColor} fontSize="lg" fontWeight="medium">
                        {profile.email}
                      </Text>
                      <IconButton
                        icon={<EditIcon />}
                        size="md"
                        variant="ghost"
                        colorScheme="blue"
                        aria-label="Edit email"
                        opacity={0.7}
                        _hover={{ opacity: 1, transform: 'scale(1.1)' }}
                        transition="all 0.2s"
                        isDisabled={true}
                        title="Email change requires re-authentication"
                      />
                    </HStack>
                    <Text fontSize="sm" color="gray.500" mt={1}>
                      Changing email requires re-authentication
                    </Text>
                  </Box>

                  <Divider />

                  {/* Account Details Section */}
                  <VStack spacing={6} w="full" align="stretch">
                    <Heading size="md" color={textColor} textAlign="center">
                      Account Details
                    </Heading>

                    <Box w="full">
                      <Text fontSize="md" color={mutedColor} mb={3} fontWeight="semibold">
                        Authentication Provider
                      </Text>
                      <HStack spacing={3} align="center" w="full">
                        <Badge 
                          colorScheme={getProviderColor(profile.authProvider)} 
                          variant="solid" 
                          px={3} 
                          py={1} 
                          borderRadius="full"
                          textTransform="capitalize"
                          fontSize="sm"
                        >
                          {profile.authProvider}
                        </Badge>
                      </HStack>
                    </Box>

                    <Box w="full">
                      <Text fontSize="md" color={mutedColor} mb={3} fontWeight="semibold">
                        Account Created
                      </Text>
                      <HStack spacing={3} align="center" w="full">
                        <CalendarIcon color={mutedColor} />
                        <Text color={textColor} fontSize="lg" fontWeight="medium">
                          {formatDate(profile.createdAt)}
                        </Text>
                      </HStack>
                    </Box>

                    <Box w="full">
                      <Text fontSize="md" color={mutedColor} mb={3} fontWeight="semibold">
                        User ID
                      </Text>
                      <HStack spacing={3} align="center" w="full">
                        <Text 
                          color={textColor} 
                          fontSize="sm" 
                          fontFamily="mono" 
                          bg={useColorModeValue('gray.100', 'gray.700')}
                          px={3}
                          py={2}
                          borderRadius="md"
                          wordBreak="break-all"
                        >
                          {profile.uid}
                        </Text>
                      </HStack>
                    </Box>
                  </VStack>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </Flex>
      </Container>

      {/* Avatar Change Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent
          bg={cardBg}
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor={borderColor}
          boxShadow={glowColor}
        >
          <ModalHeader color={textColor} fontSize="xl">
            Change Profile Picture
          </ModalHeader>
          <ModalCloseButton color={textColor} />
          <ModalBody pb={8}>
            <VStack spacing={6}>
              <Avatar
                size="xl"
                src={tempAvatar}
                name={profile.name}
                border="3px solid"
                borderColor="blue.400"
                boxShadow="0 0 20px rgba(59, 130, 246, 0.5)"
              />
              
              <FormControl>
                <FormLabel color={textColor} fontSize="md" fontWeight="semibold">
                  Image URL
                </FormLabel>
                <Input
                  placeholder="Enter image URL"
                  value={tempAvatar}
                  onChange={(e) => setTempAvatar(e.target.value)}
                  bg={useColorModeValue('white', 'gray.700')}
                  border="2px solid"
                  borderColor="blue.400"
                  focusBorderColor="purple.400"
                  _focus={{ boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.6)' }}
                  size="lg"
                  isDisabled={updating}
                />
              </FormControl>
              
              <HStack spacing={4} w="full" justify="center">
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={handleAvatarSave}
                  _hover={{ transform: 'translateY(-2px)' }}
                  transition="all 0.2s"
                  isLoading={updating}
                  loadingText="Saving..."
                >
                  Save Changes
                </Button>
                <Button 
                  onClick={onClose} 
                  size="lg"
                  variant="ghost"
                  _hover={{ transform: 'translateY(-2px)' }}
                  transition="all 0.2s"
                  isDisabled={updating}
                >
                  Cancel
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Profile;