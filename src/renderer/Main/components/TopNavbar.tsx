import { HStack, Icon, Input, Spacer, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowRotateRight,
  FaUser,
  FaWindowMaximize,
  FaWindowMinimize,
  FaX,
} from 'react-icons/fa6';

export default function TopNavbar() {
  // const [username, setUsername] = useState<string>();
  const [urlValue, setUrlValue] = useState<string>();

  window.electron.ipcRenderer.on('main-view-url', () => {
    setUrlValue(window.electron.electronStore.get('main-view-url'));
  });

  return (
    <VStack width="inherit" height="100px" p={2}>
      <HStack textColor="white" width="inherit" gap={10} height="40px">
        <Text fontSize={30} flexGrow="1" pl={1}>
          Game Name
        </Text>
        <HStack alignItems="center" gap={3}>
          <Icon
            as={FaUser}
            boxSize={8}
            color="blue.300"
            backgroundColor="yellow.200"
          />
          <Text>{window.electron.electronStore.get('username')}</Text>
        </HStack>
        <HStack gap={5} pr={5} height="40px">
          <Icon
            as={FaWindowMinimize}
            boxSize={5}
            onClick={() => window.electron.ipcRenderer.sendMessage('minimize')}
          />
          <Icon
            as={FaWindowMaximize}
            boxSize={5}
            onClick={() => window.electron.ipcRenderer.sendMessage('maximize')}
          />
          <Icon
            as={FaX}
            boxSize={5}
            onClick={() => window.electron.ipcRenderer.sendMessage('close')}
          />
        </HStack>
      </HStack>
      <Spacer />
      <HStack textColor="white" width="inherit" px={3}>
        <HStack>
          <Icon
            as={FaArrowLeft}
            boxSize={5}
            onClick={() => window.electron.ipcRenderer.sendMessage('backward')}
          />
          <Icon
            as={FaArrowRight}
            boxSize={5}
            onClick={() => window.electron.ipcRenderer.sendMessage('forward')}
          />
          <Icon
            as={FaArrowRotateRight}
            boxSize={5}
            onClick={() => window.electron.ipcRenderer.sendMessage('refresh')}
          />
        </HStack>
        <Input size="sm" flexGrow="1" value={urlValue} disabled />
        <Icon as={FaArrowRotateRight} boxSize={5} />
      </HStack>
    </VStack>
  );
}
