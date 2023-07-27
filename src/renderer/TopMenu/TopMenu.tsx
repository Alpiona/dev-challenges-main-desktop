import {
  Box,
  ChakraProvider,
  HStack,
  Icon,
  Input,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowRotateRight,
  FaUser,
  FaWindowMaximize,
  FaWindowMinimize,
  FaX,
} from 'react-icons/fa6';
import './TopMenu.css';

export default function TopMenu() {
  return (
    <ChakraProvider>
      <Box width="calc(100vw - 350px)" bgColor="blackAlpha.900" height="100px">
        <VStack width="inherit" p={1}>
          <HStack textColor="white" width="inherit" gap={10} height="40px">
            <Text fontSize={30}>Game Name</Text>
            <Spacer />
            <HStack alignItems="center" gap={3}>
              <Icon
                as={FaUser}
                boxSize={8}
                color="blue.300"
                backgroundColor="yellow.200"
              />
              <Text>username</Text>
            </HStack>
            <HStack gap={5} pr={5} height="40px">
              <Icon as={FaWindowMinimize} boxSize={5} />
              <Icon as={FaWindowMaximize} boxSize={5} />
              <Icon as={FaX} boxSize={5} />
            </HStack>
          </HStack>
          <Spacer />
          <HStack textColor="white" width="inherit" px={3}>
            <HStack>
              <Icon as={FaArrowLeft} boxSize={5} />
              <Icon as={FaArrowRight} boxSize={5} />
              <Icon as={FaArrowRotateRight} boxSize={5} />
            </HStack>
            <Input size="sm" flexGrow="1" />
            <Icon as={FaArrowRotateRight} boxSize={5} />
          </HStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}
