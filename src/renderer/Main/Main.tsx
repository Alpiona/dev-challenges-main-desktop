import { Box, ChakraProvider, HStack, VStack } from '@chakra-ui/react';
import SideNavbar from './components/SideNavbar';
import TopNavbar from './components/TopNavbar';

export default function Main() {
  return (
    <ChakraProvider>
      <Box bgColor="blackAlpha.900">
        <HStack width="100vw" height="-webkit-fit-content" gap={0}>
          <SideNavbar />
          <VStack
            verticalAlign="start"
            height="100vh"
            width="calc(100vw - 350px)"
          >
            <TopNavbar />
          </VStack>
        </HStack>
      </Box>
    </ChakraProvider>
  );
}
