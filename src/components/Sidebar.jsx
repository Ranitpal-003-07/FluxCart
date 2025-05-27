import {
  Box,
  Text,
  VStack,
  Icon,
  Button,
  useColorModeValue,
  Flex,
  Avatar,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { Home, User, HelpCircle, Menu } from 'lucide-react';
import { Image } from '@chakra-ui/image';
import logo from '../assets/main logo.png';
import Logo from './Logo';




const Sidebar = ({ activeTab, setActiveTab }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  
    const sidebarBg = useColorModeValue(
    'linear-gradient(135deg, #F4E285 0%, #F4A261 100%)',  
    'linear-gradient(135deg, #FFF9C4 0%, #FFD8A8 100%)'
    );

    const textColor = useColorModeValue('gray.800', 'gray.100');

    const accentColor = useColorModeValue('#FFB347', '#FF9F4A');
    const highlightColor = useColorModeValue('#FFF3E0', '#FFE0B2');
    

  
const SidebarItem = ({ icon, label, isActive, onClick }) => (
  <Button
    leftIcon={<Icon as={icon} size={20} />}
    variant="ghost"
    color={textColor}
    bg={isActive ? 'whiteAlpha.300' : 'transparent'}
    _hover={{
      bg: 'whiteAlpha.200',
      transform: 'translateX(4px)',
      transition: 'all 0.2s ease-in-out'
    }}
    _active={{
      bg: 'whiteAlpha.400'
    }}
    justifyContent="flex-start"
    w="full"
    onClick={() => {
      onClick();
      if (isMobile) onClose();
    }}
    size="lg"
    borderRadius="12px"
    fontWeight={isActive ? 'semibold' : 'medium'}
    position="relative"
    transition="all 0.2s ease-in-out"
    _before={isActive ? {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '4px',
      height: '60%',
      bg: accentColor, // Using the accent color
      borderRadius: '0 4px 4px 0'
    } : {}}
  >
    {label}
  </Button>
);

  const SidebarContent = () => (
    <Box
      w={isMobile ? "full" : "280px"}
      background={sidebarBg}
      shadow="2xl"
      p={6}
      position={isMobile ? "relative" : "fixed"}
      left={0}
      top={0}
      h="100vh"
      overflowY="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255,255,255,0.1)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '4px',
        },
      }}
    >
      <VStack spacing={8} align="stretch">
        {/* Logo Section */}
        <Flex align="center" justify="center" py={4}>
          <Flex align="center" gap={3}>
            <Box
            p={2}
            bg="whiteAlpha.300"
            borderRadius="12px"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor={highlightColor}
            >
            <Image 
                src={logo} 
                alt="FluxCart Logo" 
                boxSize="100px"
                objectFit="contain"
                borderRadius="5px"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
            />
            </Box>
          </Flex>
        </Flex>

        {/* Divider */}
        <Box
          height="1px"
          bg="whiteAlpha.300"
          mx={-2}
        />

        {/* Navigation */}
        <VStack spacing={3} align="stretch">
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color="whiteAlpha.700"
            textTransform="uppercase"
            letterSpacing="wide"
            px={4}
            mb={2}
          >
            Navigation
          </Text>
          
          <SidebarItem
            icon={Home}
            label="Dashboard"
            isActive={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <SidebarItem
            icon={User}
            label="Profile"
            isActive={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          />
          <SidebarItem
            icon={HelpCircle}
            label="How to Use"
            isActive={activeTab === 'howtouse'}
            onClick={() => setActiveTab('howtouse')}
          />
        </VStack>

        {/* Bottom Section */}
        <Box mt="auto" pt={6}>
          <Box
            bg="whiteAlpha.200"
            borderRadius="16px"
            p={4}
            backdropFilter="blur(10px)"
          >
            <Flex align="center" gap={3}>
              <Avatar
                size="sm"
                bg="whiteAlpha.300"
                icon={<Icon as={User} size={16} />}
              />
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                  Welcome back!
                </Text>
                <Text fontSize="xs" color="whiteAlpha.700">
                  Manage your store
                </Text>
              </VStack>
            </Flex>
          </Box>
        </Box>
      </VStack>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <IconButton
          icon={<Menu />}
          onClick={onOpen}
          variant="ghost"
          position="fixed"
          top={4}
          left={4}
          zIndex={1000}
          bg="whiteAlpha.900"
          backdropFilter="blur(10px)"
          borderRadius="12px"
          shadow="lg"
          _hover={{
            bg: 'whiteAlpha.800',
            transform: 'scale(1.05)'
          }}
          transition="all 0.2s ease-in-out"
        />
        
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          size="sm"
        >
          <DrawerOverlay backdropFilter="blur(4px)" />
          <DrawerContent bg="transparent" shadow="none">
            <DrawerCloseButton
              color="white"
              size="lg"
              _hover={{ bg: 'whiteAlpha.200' }}
            />
            <DrawerBody p={0}>
              <SidebarContent />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return <SidebarContent />;
};

export default Sidebar;