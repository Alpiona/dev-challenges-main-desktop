import { Box, ChakraProvider, HStack, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Library from 'renderer/Library/Library';
import SideNavbar from './components/SideNavbar';
import TopNavbar from './components/TopNavbar';

export default function Main() {
  const [sideMenuSelected, setSideMenuSelected] = useState('explore');

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(
      'side-menu-navigation',
      sideMenuSelected
    );
  }, [sideMenuSelected]);

  return (
    <ChakraProvider>
      <Box bgColor="blackAlpha.900">
        <HStack width="100vw" height="-webkit-fit-content" gap={0}>
          <SideNavbar
            // selected={sideMenuSelected}
            handleChange={setSideMenuSelected}
          />
          <VStack
            verticalAlign="start"
            height="100vh"
            width="calc(100vw - 350px)"
          >
            <TopNavbar />
            {sideMenuSelected === 'library' && (
              <Library handleSideMenuChange={setSideMenuSelected} />
            )}
          </VStack>
        </HStack>
      </Box>
    </ChakraProvider>
  );
}
