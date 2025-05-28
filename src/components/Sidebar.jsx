/* eslint-disable react-hooks/rules-of-hooks */
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

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  
  const sidebarBg = useColorModeValue(
    'linear-gradient(135deg, #F4E285 0%, #F4A261 100%)',  
    'linear-gradient(135deg, #1a0b3d 0%, #2d1b69 25%, #3730a3 50%, #1e3a8a 75%, #1e40af 100%)'
  );

  const textColor = useColorModeValue('gray.800', 'gray.100');
  const accentColor = useColorModeValue('#FFB347', '#a855f7');
  const highlightColor = useColorModeValue('#FFF3E0', '#4c1d95');
  
  const SidebarItem = ({ icon, label, isActive, onClick }) => (
    <Button
      leftIcon={<Icon as={icon} size={20} />}
      variant="ghost"
      color={textColor}
      bg={isActive ? 'whiteAlpha.300' : 'transparent'}
      _hover={{
        bg: useColorModeValue('whiteAlpha.200', 'whiteAlpha.150'),
        transform: 'translateX(8px) scale(1.02)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        shadow: useColorModeValue('lg', 'dark-lg'),
        backdropFilter: 'blur(12px)',
        borderLeft: useColorModeValue('none', '3px solid rgba(168, 85, 247, 0.6)'),
      }}
      _active={{
        bg: useColorModeValue('whiteAlpha.400', 'whiteAlpha.200'),
        transform: 'translateX(4px) scale(0.98)',
      }}
      justifyContent="flex-start"
      w="full"
      onClick={() => {
        onClick();
        if (isMobile) onClose();
      }}
      size="lg"
      borderRadius="16px"
      fontWeight={isActive ? 'semibold' : 'medium'}
      position="relative"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _before={isActive ? {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: '4px',
        height: '70%',
        bg: accentColor,
        borderRadius: '0 6px 6px 0',
        boxShadow: useColorModeValue('none', `0 0 12px ${accentColor}50`),
      } : {}}
      _after={isActive ? {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: '16px',
        padding: '1px',
        background: useColorModeValue('none', 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.3))'),
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'xor',
      } : {}}
    >
      {label}
    </Button>
  );

  const SidebarContent = () => (
    <Box
      w={isMobile ? "full" : "280px"}
      background={sidebarBg}
      shadow={useColorModeValue("2xl", "dark-lg")}
      p={6}
      position={isMobile ? "relative" : "fixed"}
      left={0}
      top={0}
      h="100vh"
      overflowY="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: useColorModeValue('rgba(255,255,255,0.1)', 'rgba(139, 92, 246, 0.1)'),
          borderRadius: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: useColorModeValue('rgba(255,255,255,0.3)', 'rgba(168, 85, 247, 0.4)'),
          borderRadius: '8px',
          '&:hover': {
            background: useColorModeValue('rgba(255,255,255,0.5)', 'rgba(168, 85, 247, 0.6)'),
          }
        },
      }}
    >
      <VStack spacing={8} align="stretch">
        {/* Logo Section */}
        <Flex align="center" justify="center" py={4}>
          <Flex align="center" gap={3}>
            <Box
              p={2}
              bg={useColorModeValue("whiteAlpha.300", "whiteAlpha.200")}
              borderRadius="16px"
              backdropFilter="blur(16px)"
              border="1px solid"
              borderColor={highlightColor}
              transition="all 0.3s ease"
              _hover={{
                transform: 'scale(1.05) rotate(2deg)',
                shadow: useColorModeValue('xl', 'dark-lg'),
                borderColor: accentColor,
              }}
            >
              <Image 
                src={logo} 
                alt="FluxCart Logo" 
                boxSize="100px"
                objectFit="contain"
                borderRadius="8px"
                filter={useColorModeValue(
                  "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                  "drop-shadow(0 4px 12px rgba(168, 85, 247, 0.3))"
                )}
              />
            </Box>
          </Flex>
        </Flex>

        {/* Divider */}
        <Box
          height="2px"
          bg={useColorModeValue("whiteAlpha.300", "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), transparent)")}
          mx={2}
          borderRadius="full"
        />

        {/* Navigation */}
        <VStack spacing={4} align="stretch">
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
            bg={useColorModeValue("whiteAlpha.200", "whiteAlpha.150")}
            borderRadius="20px"
            p={4}
            backdropFilter="blur(16px)"
            border="1px solid"
            borderColor={useColorModeValue("whiteAlpha.300", "whiteAlpha.200")}
            transition="all 0.3s ease"
            _hover={{
              transform: 'translateY(-2px)',
              shadow: useColorModeValue('lg', 'dark-lg'),
              bg: useColorModeValue("whiteAlpha.300", "whiteAlpha.200"),
              borderColor: useColorModeValue("whiteAlpha.400", accentColor),
            }}
          >
            <Flex align="center" gap={3}>
              <Avatar
                size="sm"
                bg={useColorModeValue("whiteAlpha.300", "purple.600")}
                icon={<Icon as={User} size={16} />}
                border="2px solid"
                borderColor={useColorModeValue("whiteAlpha.400", "purple.400")}
              />
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" fontWeight="semibold" color={textColor}>
                  Welcome back!
                </Text>
                <Text fontSize="xs" color={useColorModeValue("whiteAlpha.700", "whiteAlpha.600")}>
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
          bg={useColorModeValue("whiteAlpha.900", "blackAlpha.800")}
          backdropFilter="blur(16px)"
          borderRadius="16px"
          shadow="xl"
          border="1px solid"
          borderColor={useColorModeValue("whiteAlpha.400", "whiteAlpha.200")}
          _hover={{
            bg: useColorModeValue("whiteAlpha.800", "blackAlpha.700"),
            transform: 'scale(1.1) rotate(5deg)',
            borderColor: useColorModeValue("orange.300", "purple.400"),
          }}
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        />
        
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          size="sm"
        >
          <DrawerOverlay backdropFilter="blur(8px)" />
          <DrawerContent bg="transparent" shadow="none">
            <DrawerCloseButton
              color="white"
              size="lg"
              _hover={{ 
                bg: useColorModeValue('whiteAlpha.200', 'whiteAlpha.300'),
                transform: 'scale(1.1)',
              }}
              transition="all 0.2s ease"
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